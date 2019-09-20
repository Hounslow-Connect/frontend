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
import ReactPlayer from 'react-player';

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

interface RouteParams {
  service: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  serviceStore: ServiceStore;
}

const getSocialUrl = (socialObj: any) => socialObj.url;

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

                <div className="flex-col flex-col--mobile--12 criteria_card service__info__cost">
                  <div className="flex-container flex-container--align-center flex-container--mobile-no-padding">
                    <div className="flex-col flex-col--mobile--4 criteria_card-img">
                      <FontAwesomeIcon icon="pound-sign" className="service__info__cost--icon" />

                      <p className="criteria_card-title">{service.is_free ? 'Free' : 'Cost'}</p>
                    </div>
                    <div className="flex-col flex-col--mobile--8">
                      <p>
                        {service.fees_text
                          ? service.fees_text
                          : `This ${service.type} costs no money`}
                      </p>
                      <p>
                        {service.fees_url && <a href={service.fees_url}>Further Pricing Details</a>}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-container flex-container--align-center service__media">
                <div className="flex-col flex-col--mobile--12">
                  <h3 className="">{`What is this ${get(service, 'type')}?`}</h3>
                </div>
                {!!service.gallery_items.length && <div className="service__section">IMAGES</div>}
                <div className="flex-container flex-container--mobile-no-padding ">
                  <div className="flex-col flex-col--mobile--12 service__section">
                    {service.video_embed && (
                      <ReactPlayer
                        url={service.video_embed}
                        width={'90vw'}
                        style={{ borderRadius: '19px' }}
                        light={true}
                      />
                    )}
                  </div>
                </div>
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
                <div className="flex-container flex-container--align-center flex-container--justify flex-container--mobile-no-padding service__referral">
                  <Button text="Make a connection" icon="arrow-right" />
                  <p className="service__refer-disclaimer">
                    <FontAwesomeIcon icon="info-circle" /> It can take up to 2 weeks to recieve a
                    reply
                  </p>
                </div>
              )}

              <Accordian
                title={`How can I contact this ${service.type}?`}
                className="service__accordian"
              >
                <div className="service__accordian-inner flex-container flex-container--align-center flex-container--mobile-no-padding">
                  <div className="flex-col service__accordian--no-overflow">
                    <h4>
                      <FontAwesomeIcon icon="globe" /> Website
                    </h4>
                    <a href={service.url}>{service.url}</a>
                  </div>
                  <div className="flex-col">
                    <h4>
                      <FontAwesomeIcon icon="phone" /> Telephone
                    </h4>
                    <p>{service.contact_phone}</p>
                  </div>
                  <div className="flex-col">
                    <h4>
                      <FontAwesomeIcon icon="envelope" /> Email
                    </h4>
                    <a href={`mailto:${service.contact_email}`}>{service.contact_email}</a>
                  </div>
                  <div className="flex-col service__social-icon-container">
                    {find(service.social_medias, { type: 'facebook' }) && (
                      <a href={getSocialUrl(find(service.social_medias, { type: 'facebook' }))}>
                        <FontAwesomeIcon
                          icon={['fab', 'facebook-f']}
                          className="service__social-icon"
                        />
                      </a>
                    )}
                    {find(service.social_medias, { type: 'twitter' }) && (
                      <a href={getSocialUrl(find(service.social_medias, { type: 'twitter' }))}>
                        <FontAwesomeIcon
                          icon={['fab', 'twitter']}
                          className="service__social-icon"
                        />
                      </a>
                    )}
                    {find(service.social_medias, { type: 'intstagram' }) && (
                      <a href={getSocialUrl(find(service.social_medias, { type: 'intstagram' }))}>
                        <FontAwesomeIcon
                          icon={['fab', 'instagram']}
                          className="service__social-icon"
                        />
                      </a>
                    )}
                    {find(service.social_medias, { type: 'instagram' }) && (
                      <a href={getSocialUrl(find(service.social_medias, { type: 'instagram' }))}>
                        <FontAwesomeIcon
                          icon={['fab', 'youtube']}
                          className="service__social-icon"
                        />
                      </a>
                    )}
                  </div>
                </div>
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

              <Accordian title="Where can I access it?" className="service__accordian">
                {locations.map((location: IServiceLocation) => (
                  <LocationCard
                    location={location}
                    key={location.id}
                    className="service__accordian-inner"
                  />
                ))}
              </Accordian>

              <Accordian title="Good to know" className="service__accordian">
                <div className="service__accordian-inner">
                  {service.useful_infos.map((info: any) => (
                    <div key={info.title}>
                      <p>{info.title}</p>
                      <p>{info.description}</p>
                    </div>
                  ))}
                </div>
              </Accordian>

              <Accordian title={`Who runs this ${service.type}?`} className="service__accordian">
                <div className="service__accordian-inner">
                  <div>
                    {get(service, 'organisation.name')}
                    {get(service, 'organisation.has_logo') && (
                      <img
                        src={`${apiBase}/organisations/${service.organisation_id}/logo.png?v=${service.updated_at}`}
                        alt={`${get(service, 'organisation.name')} Logo`}
                      />
                    )}
                  </div>
                </div>
              </Accordian>

              <div className="flex-container service__button-container">
                <Button text="Print" icon="print" alt={true} />
                <Button
                  text={serviceStore.favourite ? 'In your favourites' : 'Add to favourites'}
                  icon="star"
                  alt={true}
                  onClick={() => serviceStore.addToFavourites()}
                  disabled={serviceStore.favourite}
                />
              </div>
            </div>
          </section>

          {/* <section className="flex-col flex-col--4  flex-col--mobile--12">
            <div className="body--l service__info__cost service__section">
              <div className="body--l service__info__cost--left">
                <FontAwesomeIcon icon="pound-sign" className="service__info__cost--icon" />
                <p className="service__info__cost--sub-heading">Cost</p>
              </div>
              <div className="service__info__cost--right">
                <p className="service__info__cost--header">{service.is_free ? 'Free' : 'Cost'}</p>
                <p>
                  {service.fees_text ? service.fees_text : `This ${service.type} costs no money`}
                </p>
                {service.fees_url && <a href={service.fees_url}>Further Pricing Details</a>}
              </div>
            </div>
            <div className="service__section">
              {service.video_embed && (
                <ReactPlayer
                  url={service.video_embed}
                  width={'100%'}
                  style={{ borderRadius: '19px' }}
                  light={true}
                />
              )}
            </div>

            <div className="service__section">
              <Button text="Print" icon="print" alt={true} />
              <Button
                text={serviceStore.favourite ? 'In your favourites' : 'Add to favourites'}
                icon="star"
                alt={true}
                onClick={() => serviceStore.addToFavourites()}
                disabled={serviceStore.favourite}
              />
            </div>

            <div className="service__section">
              Share page to social media
              {/* TODO */}
          {/* </div> */}
          {/* </section>  */}
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
