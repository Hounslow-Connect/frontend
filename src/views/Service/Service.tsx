import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import get from 'lodash/get';
import map from 'lodash/map';
import find from 'lodash/find';
import take from 'lodash/take';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { apiBase } from '../../config/api';

import './Service.scss';

import { IService, IServiceLocation } from '../../types/types';
import ServiceStore from '../../stores/serviceStore';
import Button from '../../components/Button';

import AgeGroup from '../../assets/images/icons/who-is-this-for/age-group.svg';
import Disability from '../../assets/images/icons/who-is-this-for/disability.svg';
import Employment from '../../assets/images/icons/who-is-this-for/employment.svg';
import Gender from '../../assets/images/icons/who-is-this-for/gender.svg';
import Housing from '../../assets/images/icons/who-is-this-for/housing.svg';
import Income from '../../assets/images/icons/who-is-this-for/income.svg';
import Language from '../../assets/images/icons/who-is-this-for/language.svg';
import Other from '../../assets/images/icons/who-is-this-for/other.svg';

import CriteriaCard from './CriteriaCard';
import Accordian from '../../components/Accordian';
import RelatedServicesCard from './RelatedServicesCard';
import LocationCard from './LocationCard';
import uniqueId from 'lodash/uniqueId';
import CostCard from './CostCard';
import VideoCard from './VideoCard';
import ContactCard from './ContactCard';
import OrganisationCard from './OrganisationCard';
import ButtonCard from './ButtonCard';
import ShareCard from './ShareCard';
import ReferralCard from './ReferralCard';

interface RouteParams {
  service: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  serviceStore: ServiceStore;
}

const iconMap = [
  { 'Getting here': 'map-signs' },
  { 'Signing up': 'marker' },
  { 'Meeting up': 'handshake' },
  { 'What to wear': 'shirt' },
  { 'What to bring': 'shopping-bag' },
  { 'How to get here': 'map-signs' },
  { Parking: 'car' },
  { 'Keeping updated': 'calander-alt' },
  { 'Additional information': 'info-circle' },
];

class Service extends Component<IProps> {
  componentDidMount() {
    const { serviceStore, match } = this.props;

    serviceStore.fetchService(match.params.service);
  }

  render() {
    const { serviceStore } = this.props;
    const { service, locations, relatedServices } = serviceStore;

    if (!service) {
      return <div>Service not found</div>;
    }

    return (
      <main>
        <div className={`service__header service__header--${get(service, 'type')}`}>
          <div className="flex-col flex-col--mobile--9">
            <h1>{get(service, 'name')}</h1>
            <p className="service__header__last-updated">
              Page last updated <span>{moment(service!.updated_at).format('Do MMMM YYYY')}</span>
              <Button text="Give feedback" icon="comment" alt={true} size="small" />
            </p>
          </div>
          <div className="flex-col flex-col--mobile--3">
            <div className="service__header__logo">
              <img
                src={`${apiBase}/organisations/${get(service, 'organisation.id')}/logo.png?v=${get(
                  service,
                  'organisation.id'
                )}`}
                alt={`${service.name} logo`}
              />
            </div>
          </div>
        </div>
        <section className="flex-container service__info">
          <section className="flex-col flex-col--8 flex-col--mobile--12">
            <div className="flex-container flex-container--align-center flex-container--mobile-no-padding">
              <div className="flex-col flex-col--mobile--12 service__criteria">
                <h2>Who is it for?</h2>
              </div>
              <div className="service__section">
                {get(service, 'criteria.age_group') && (
                  <CriteriaCard
                    svg={AgeGroup}
                    title="Age Group"
                    info={get(service, 'criteria.age_group')}
                  />
                )}

                {get(service, 'criteria.disability') && (
                  <CriteriaCard
                    svg={Disability}
                    title="Disability"
                    info={get(service, 'criteria.disability')}
                  />
                )}

                {get(service, 'criteria.employment') && (
                  <CriteriaCard
                    svg={Employment}
                    title="Employment Status"
                    info={get(service, 'criteria.employment')}
                  />
                )}

                {get(service, 'criteria.gender') && (
                  <CriteriaCard
                    svg={Gender}
                    title="Gender"
                    info={get(service, 'criteria.gender')}
                  />
                )}

                {get(service, 'criteria.housing') && (
                  <CriteriaCard
                    svg={Housing}
                    title="Housing"
                    info={get(service, 'criteria.housing')}
                  />
                )}

                {get(service, 'criteria.income') && (
                  <CriteriaCard
                    svg={Income}
                    title="Income"
                    info={get(service, 'criteria.income')}
                  />
                )}

                {get(service, 'criteria.language') && (
                  <CriteriaCard
                    svg={Language}
                    title="Language"
                    info={get(service, 'criteria.language')}
                  />
                )}

                {get(service, 'criteria.other') && (
                  <CriteriaCard svg={Other} title="Other" info={get(service, 'criteria.other')} />
                )}

                <div className="flex-col flex-col--mobile--12 mobile-show criteria_card service__info__cost">
                  <CostCard service={service} />
                </div>
              </div>

              <div className="flex-container flex-container--align-center service__media">
                <div className="flex-col flex-col--mobile--12">
                  <h3 className="">{`What is this ${get(service, 'type')}?`}</h3>
                </div>
                {!!service.gallery_items.length && <div className="service__section">IMAGES</div>}
                {service.video_embed && (
                  <div className="flex-container flex-container--mobile-no-padding mobile-show">
                    <VideoCard video={service.video_embed} width="90vw" />
                  </div>
                )}
              </div>

              <div className="flex-container flex-container--align-center">
                <div className="flex-col flex-col--mobile--12 service__section">
                  <ReactMarkdown source={service.intro} className="service__markdown" />
                </div>
                <div className="flex-col flex-col--mobile--12">
                  <h4>What do we offer?</h4>
                </div>

                <div className="flex-col flex-col--mobile--12">
                  {map(service.offerings, (offering: any, i) => (
                    <Fragment key={offering.offering}>
                      <span>{offering.offering}</span>
                      {i < service.offerings.length - 1 ? (
                        <FontAwesomeIcon
                          icon="circle"
                          style={{ fontSize: 8, verticalAlign: 'middle', margin: '0 4px' }}
                        />
                      ) : null}
                    </Fragment>
                  ))}
                </div>
                <div className="flex-col flex-col--mobile--12 service__section">
                  <ReactMarkdown source={service.description} className="service__markdown" />
                </div>
              </div>

              {service.referral_method !== 'none' && (
                <div className="mobile-show">
                  <ReferralCard />
                </div>
              )}

              <Accordian
                title={`How can I contact this ${service.type}?`}
                className="service__accordian mobile-show"
              >
                <ContactCard service={service} accordian={true} />
              </Accordian>

              {service.testimonial && (
                <Accordian title="What people say" className="service__accordian">
                  <div className="service__accordian-inner">
                    <div className="service__testimonial">
                      <p>{get(service, 'testimonial')}</p>
                    </div>
                  </div>
                </Accordian>
              )}

              {!!locations.length && (
                <Accordian title="Where can I access it?" className="service__accordian">
                  {locations.map((location: IServiceLocation) => (
                    <LocationCard
                      location={location}
                      key={location.id}
                      className="service__accordian-inner"
                    />
                  ))}
                </Accordian>
              )}

              {!!service.useful_infos.length && (
                <Accordian title="Good to know" className="service__accordian">
                  {service.useful_infos.map((info: { title: string; description: string }) => {
                    const iconObj = find(iconMap, info.title);
                    const icon = get(iconObj, `${info.title}`);

                    return (
                      <div
                        key={uniqueId()}
                        className="flex-container flex-container--mobile-no-padding flex-container--align-center service__useful-info service__accordian-inner"
                      >
                        <div className="flex-col flex-col--mobile--1">
                          <FontAwesomeIcon icon={icon} />
                        </div>
                        <div className="flex-col flex-col--mobile--11">
                          <h4>{info.title}</h4>
                        </div>
                        <div className="flex-col flex-col--mobile--12">
                          <p>{info.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </Accordian>
              )}

              <Accordian title={`Who runs this ${service.type}?`} className="service__accordian">
                <div className="service__accordian-inner">
                  <OrganisationCard service={service} />
                </div>
              </Accordian>

              <ButtonCard serviceStore={serviceStore} />
            </div>
          </section>
          <section className="flex-col flex-col--4 mobile-hide">
            <div className="flex-container service__right-column">
              <div className="flex-col flex-col--10 criteria_card service__info__cost service__section">
                <CostCard service={service} />
              </div>
              {service.video_embed && (
                <div className="flex-container flex-container--mobile-no-padding mobile-hide service__video">
                  <VideoCard video={service.video_embed} width="100%" />
                </div>
              )}
              <div className="flex-col flex-col--12">
                <h2>{`How can I contact this ${service.type}?`}</h2>
                {service.referral_method !== 'none' && (
                  <div className="service__section service__referral--desktop">
                    <ReferralCard />
                  </div>
                )}
                <div className="service__section">
                  <ContactCard service={service} />
                </div>
              </div>
              <div className="flex-col flex-col--12">
                <h2>{`Who runs this ${service.type}?`}</h2>
                <div className="service__section">
                  <OrganisationCard service={service} sidebar={true} />
                </div>
              </div>
              <div className="flex-col flex-col--12">
                <ButtonCard serviceStore={serviceStore} />
              </div>

              <div className="flex-col flex-col--12">
                <ShareCard />
              </div>
            </div>
          </section>
        </section>
        {relatedServices && (
          <section className="service__related-services">
            <div className="flex-container">
              <div className="flex-col flex-col--mobile--12">
                <h4>Related Services</h4>
              </div>
              <div className="flex-col flex-col--mobile--12">
                {take(relatedServices, 3).map((service: IService) => (
                  <RelatedServicesCard service={service} key={service.id} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    );
  }
}

export default inject('serviceStore')(observer(Service));
