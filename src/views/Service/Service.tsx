import React, { Component, Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import get from 'lodash/get';
import map from 'lodash/map';
import find from 'lodash/find';
import take from 'lodash/take';
import ReactSVG from 'react-svg';
import ReactMarkdown from 'react-markdown';

import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPlayer from 'react-player';

import { apiBase } from '../../config/api';

import './Service.scss';

import { ILocation, IService } from '../../types/types';
import ServiceStore from '../../stores/serviceStore';
import Button from '../../components/Button';
import Link from '../../components/Link';

import AgeGroup from '../../assets/images/icons/who-is-this-for/age-group.svg';
import Disability from '../../assets/images/icons/who-is-this-for/disability.svg';
import Employment from '../../assets/images/icons/who-is-this-for/employment.svg';
import Gender from '../../assets/images/icons/who-is-this-for/gender.svg';
import Housing from '../../assets/images/icons/who-is-this-for/housing.svg';
import Income from '../../assets/images/icons/who-is-this-for/income.svg';
import Language from '../../assets/images/icons/who-is-this-for/language.svg';
import Other from '../../assets/images/icons/who-is-this-for/other.svg';

import WheelchairAccessible from '../../assets/images/icons/accessibility/wheelchair-accessible.svg';
import InductionLoop from '../../assets/images/icons/accessibility/induction-loop.svg';
interface RouteParams {
  service: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  serviceStore: ServiceStore;
}

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
          <h1>{get(service, 'name')}</h1>
          <p className="service__header__last-updated">
            Page last updated <span>{format(new Date(service!.updated_at), 'do LLLL yyyy')}</span>
            <Button text="Give feedback" icon="comment" alt={true} size="small" />
          </p>
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
        <section className="service__info">
          <section className="service__info--left">
            <h2>Who is it for?</h2>
            <div className="service__section">
              {get(service, 'criteria.age_group') && (
                <div>
                  <div>
                    <ReactSVG src={AgeGroup} />
                    <p>Age Group</p>
                  </div>
                  <div>
                    <p>{get(service, 'criteria.age_group')}</p>
                  </div>
                </div>
              )}

              {get(service, 'criteria.disability') && (
                <div>
                  <div>
                    <ReactSVG src={Disability} />
                    <p>Disability</p>
                  </div>
                  <div>
                    <p>{get(service, 'criteria.disability')}</p>
                  </div>
                </div>
              )}

              {get(service, 'criteria.employment') && (
                <div>
                  <div>
                    <ReactSVG src={Employment} />
                    <p>Employment Status</p>
                  </div>
                  <div>
                    <p>{get(service, 'criteria.employment')}</p>
                  </div>
                </div>
              )}

              {get(service, 'criteria.gender') && (
                <div>
                  <div>
                    <ReactSVG src={Gender} />
                    <p>Gender</p>
                  </div>
                  <div>
                    <p>{get(service, 'criteria.gender')}</p>
                  </div>
                </div>
              )}

              {get(service, 'criteria.housing') && (
                <div>
                  <div>
                    <ReactSVG src={Housing} />
                    <p>Housing</p>
                  </div>
                  <div>
                    <p>{get(service, 'criteria.housing')}</p>
                  </div>
                </div>
              )}

              {get(service, 'criteria.income') && (
                <div>
                  <div>
                    <ReactSVG src={Income} />
                    <p>Income</p>
                  </div>
                  <div>
                    <p>{get(service, 'criteria.income')}</p>
                  </div>
                </div>
              )}

              {get(service, 'criteria.language') && (
                <div>
                  <div>
                    <ReactSVG src={Language} />
                    <p>Language</p>
                  </div>
                  <div>
                    <p>{get(service, 'criteria.language')}</p>
                  </div>
                </div>
              )}

              {get(service, 'criteria.other') && (
                <div>
                  <div>
                    <ReactSVG src={Other} />
                    <p>Other</p>
                  </div>
                  <div>
                    <p>{get(service, 'criteria.other')}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="service__section">IMAGES</div>

            <div className="service__section">
              <ReactMarkdown source={service.intro} />

              <h3>What do we offer?</h3>
              <div>
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
              <ReactMarkdown source={service.description} />
            </div>
            {service.testimonial && (
              <div className="service__section">
                <p>{get(service, 'testimonial')}</p>
              </div>
            )}

            <h2>Where can I access it?</h2>
            <div className="service__location">
              {locations.map((location: ILocation) => (
                <div key={location.id}>
                  {location.has_image && (
                    <img
                      src={`${apiBase}/service-locations/${location.id}/image.png`}
                      alt={`${get(location, 'location.address_line_1')}`}
                    />
                  )}
                  <p> {get(location, 'location.address_line_1')}</p>
                  <p>{`${get(location, 'location.address_line_2')}, ${get(
                    location,
                    'location.postcode'
                  )}`}</p>
                  {get(location, 'location.has_wheelchair_access') && (
                    <ReactSVG src={WheelchairAccessible} />
                  )}
                  {get(location, 'location.has_induction_loop') && <ReactSVG src={InductionLoop} />}

                  {/* OPENING TIMES */}

                  <Link
                    icon="map"
                    text="View on Google Maps"
                    size="medium"
                    href=""
                    iconPosition="right"
                  />
                  <Link
                    icon="map-signs"
                    text="View on Google Maps"
                    size="medium"
                    href=""
                    iconPosition="right"
                  />
                </div>
              ))}
            </div>

            <div className="service__section">
              <h2>Good to know</h2>
              {service.useful_infos.map((info: any) => (
                <div key={info.title}>
                  <p>{info.title}</p>
                  <p>{info.description}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="service__info--right">
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
              <h2>{`How can I contact this ${service.type}?`}</h2>

              {service.type !== 'none' && (
                <div className="service__section">
                  <Button text="Make a connection" icon="arrow-right" />
                </div>
              )}

              <div className="service__section">
                <div>
                  <p>
                    <FontAwesomeIcon icon="globe" /> Website
                  </p>
                  <p>{service.url}</p>
                </div>
                <div>
                  <p>
                    <FontAwesomeIcon icon="phone" /> Telephone
                  </p>
                  <p>{service.contact_phone}</p>
                </div>
                <div>
                  <p>
                    <FontAwesomeIcon icon="envelope" /> Telephone
                  </p>
                  <p>{service.contact_email}</p>
                </div>
                <div>
                  {find(service.social_medias, { type: 'facebook' }) && (
                    <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                  )}
                  {find(service.social_medias, { type: 'twitter' }) && (
                    <FontAwesomeIcon icon={['fab', 'twitter']} />
                  )}
                  {find(service.social_medias, { type: 'intstagram' }) && (
                    <FontAwesomeIcon icon={['fab', 'instagram']} />
                  )}
                  {find(service.social_medias, { type: 'instagram' }) && (
                    <FontAwesomeIcon icon={['fab', 'youtube']} />
                  )}
                </div>
              </div>
            </div>

            <div className="service__section">
              <h2>{`Who runs this ${service.type}`}</h2>
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
            </div>
          </section>
        </section>
        {relatedServices && (
          <section>
            <h2>Related Services</h2>
            {take(relatedServices, 3).map((service: IService) => (
              <p>{service.name}</p>
            ))}
          </section>
        )}
      </main>
    );
  }
}

export default inject('serviceStore')(observer(Service));
