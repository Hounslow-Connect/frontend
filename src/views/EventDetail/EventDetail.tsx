import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import get from 'lodash/get';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InductionLoop from '../../assets/images/icons/accessibility/induction-loop.svg';
import WheelChair from '../../assets/images/icons/accessibility/wheelchair-accessible.svg';
import FallbackLogo from '../../assets/images/logo-fallback.png';

import Breadcrumb from '../../components/Breadcrumb';
import EventStore from '../../stores/eventStore';
import { apiBase } from '../../config/api';
import { IEvent } from '../../components/EventSummary/IEvent';
import LinkButton from '../../components/LinkButton';
import Link from '../../components/Link';
import ShareCard from '../../views/Service/ShareCard';
import CostCard from '../../views/Service/CostCard';
import MapCard from '../../views/Service/MapCard';
import Accordian from '../../components/Accordian';

import './EventDetail.scss';

interface RouteParams {
  service: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  eventStore: EventStore;
  match: any;
}

const EventDetail: React.FC<IProps> = ({ eventStore, match }) => {
  useEffect(() => {
    eventStore.fetchEvent(match.params.uuid);
  }, [eventStore, match]);

  const { event, organisation } = eventStore;

  if (!event) {
    return null;
  }

  const getImg = (eventInner: IEvent) => {
    if (eventInner) {
      return `${apiBase}/services/${eventInner.id}/logo.png?`;
    } else {
      return `${apiBase}/organisations/${get(eventInner, 'organisation.id')}/logo.png?v=${get(
        eventInner,
        'organisation.id'
      )}`;
    }
  };

  const hasBookingFields =
    event.booking_cta && event.booking_summary && event.booking_title && event.booking_url;

  return (
    <section className="event-detail">
      <Helmet>
        {get(event, 'title') && <title>{`${get(event, 'title')} | Hounslow Connect`}</title>}
        {!get(event, 'title') && <title>Event | Hounslow Connect</title>}

        {get(event, 'intro') && <meta name="description" content={get(event, 'intro')} />}

        {get(event, 'title') && <meta property="og:title" content={`${get(event, 'title')}`} />}
        {get(event, 'slug') && (
          <meta
            property="og:url"
            content={`${process.env.REACT_APP_FRONTEND_URL}/${get(event, 'slug')}`}
          />
        )}
        {getImg(event) && <meta property="og:image" content={getImg(event)} />}
        <meta property="og:type" content="website" />
      </Helmet>

      <Breadcrumb
        crumbs={[
          { text: 'Home', url: '/' },
          { text: 'Events', url: '/' },
          { text: event.title, url: '' },
        ]}
      />

      <div className="service__header">
        <div className="flex-container">
          <div className="service__header__wrapper event__header__wrapper">
            <div className="service__header__logo">
              <img src={getImg(event)} alt={`${event.title} logo`} />
            </div>
            <div className="flex-col flex-col--tablet--9">
              <h1 className="h1">{get(event, 'title')}</h1>
              {organisation && organisation.slug && (
                <p className="service__header__desc">
                  This service is run by the organisation{' '}
                  <RouterLink to={`/organisations/${organisation.slug}`} aria-label="Home Link">
                    {organisation.name}
                  </RouterLink>
                  . View their organisation details and other listed services.
                </p>
              )}
              <div className="flex-container flex-container--no-padding flex-container--left">
                {organisation && organisation.slug && (
                  <div className="flex-col--mobile--12">
                    <LinkButton
                      alt={false}
                      black={true}
                      text="View organisation"
                      to={`/organisations/${organisation.slug}`}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="date-range-icon-wrapper ">
              <FontAwesomeIcon icon="calendar-days" size="3x" />
            </div>
          </div>
        </div>
      </div>

      <section className="main">
        <div className="flex-container">
          <div className="mobile-show service__section">
            <CostCard is_free={event.is_free} fees_url={event.fees_url} />
          </div>
          <div className="flex-col flex-col--12">
            <div className="panel-box__white--large margin-bottom">
              <div className="event-summary-card__pills flex--justify-space">
                <h3 className="h3 event-summary-card__tag event-summary-card__tag--date-time">
                  {moment(event.start_date).format('dddd MMMM Do')} - {event.start_time}
                </h3>
                <div className="flex--align--start">
                  <div className="event-summary-card__tag event-summary-card__tag--cost">
                    {event.is_free ? 'Free' : ' Costs'}
                  </div>
                  <div className="event-summary-card__tag event-summary-card__tag--virtual">
                    {event.is_virtual ? 'Online' : 'In person'}
                  </div>
                </div>
              </div>
              <p className="p--xlarge">{event.intro}</p>
            </div>
          </div>
        </div>
        <div className="flex-container flex-container--justify">
          <div className="flex-col flex-col--12 mobile-hide">
            <h2 className="h2 margin-bottom">Event description</h2>
          </div>
          <div className="flex-col flex-col--8 flex-col--mobile--12 flex-col--tablet--12 service__left-column">
            <Accordian title="Event description" className="service__accordian mobile-show">
              <p className="p--large">{event.description}</p>
            </Accordian>

            <Accordian
              title="How can I contact this event organiser?"
              className="service__accordian mobile-show"
            >
              <div className="flex-container">
                <div className="flex-col flex-col--6 ">
                  {event.organiser_name && (
                    <p className="p--large">
                      Contact <a href={event.organiser_url as string}>{event.organiser_name}</a> for
                      more information
                    </p>
                  )}
                  <div className="cms--contact-card--row service__accordian--no-overflow">
                    <h3>
                      <FontAwesomeIcon icon="globe" /> Website
                    </h3>
                    <p>{event.organiser_url || 'n/a'}</p>
                  </div>
                </div>
                <div className="flex-col flex-col--5">
                  <div className="cms--contact-card--row service__accordian--no-overflow">
                    <h3>
                      <FontAwesomeIcon icon="phone" /> Telephone
                    </h3>
                    <p>{event.organiser_phone || 'n/a'}</p>
                  </div>
                  <div className="cms--contact-card--row service__accordian--no-overflow">
                    <h3>
                      <FontAwesomeIcon icon="envelope" /> Email
                    </h3>
                    <p>{event.organiser_email || 'n/a'}</p>
                  </div>
                </div>
              </div>
            </Accordian>

            {event.location && (
              <>
                <Accordian
                  title="Where and when is this event?"
                  className="service__accordian mobile-show"
                >
                  <div className="flex-col flex-col--12">
                    <h3 className="h3">
                      {moment(event.start_date).format('dddd MMMM Do')} - {event.start_time}
                    </h3>
                    <div className="flex-col flex-col--5">
                      <div className="address">
                        <p>{event.location.address_line_1} </p>
                        <p>{event.location.address_line_2} </p>
                        <p>{event.location.city} </p>
                        <p>{event.location.postcode}</p>
                      </div>
                      <div className="google-links">
                        <Link
                          text="View on Google Maps"
                          size="medium"
                          href={`https://www.google.com/maps/search/?api=1&query=${event.location.lat},${event.location.lon}`}
                          iconPosition="right"
                          target="_blank"
                          rel="noopener nofollow"
                          className="location__google-maps--link"
                        />
                        <Link
                          text="Get directions on Google Maps"
                          size="medium"
                          href={`https://www.google.com/maps?daddr=${event.location.lat},${event.location.lon}`}
                          target="_blank"
                          rel="noopener nofollow"
                          iconPosition="right"
                          className="location__google-maps--link"
                        />
                      </div>
                    </div>
                    <div className="flex-col flex-col--5">
                      <div className="service__map">
                        <MapCard locations={[event]} />
                      </div>
                    </div>
                    <div className="disability-services">
                      {
                        <div className="service">
                          <img
                            className="icon"
                            src={InductionLoop}
                            alt="Wheelchair accessible logo"
                          />
                          Wheelchair accessible
                        </div>
                      }
                      {
                        <div className="service">
                          <img className="icon" src={WheelChair} alt="Induction loop logo" />
                          Induction loop
                        </div>
                      }
                      {
                        <div className="service">
                          <img className="icon" src={FallbackLogo} alt=" Accessible toilet logo" />
                          Accessible toilet
                        </div>
                      }
                    </div>
                  </div>
                </Accordian>

                <div className="panel-box__white mobile-hide margin-bottom">
                  <p className="p--large">{event.description}</p>
                </div>

                <h2 className="h2 mobile-hide margin-bottom">
                  How can I contact this event organiser?
                </h2>
                <div className="flex-container flex-container--no-padding contact mobile-hide margin-bottom">
                  <div className="flex-col flex-col--6">
                    {event.organiser_name && (
                      <p className="p--large">
                        Contact <a href={event.organiser_url as string}>{event.organiser_name}</a>{' '}
                        for more information
                      </p>
                    )}
                    <div className="cms--contact-card--row service__accordian--no-overflow">
                      <h3>
                        <FontAwesomeIcon icon="globe" /> Website
                      </h3>
                      <p>{event.organiser_url || 'n/a'}</p>
                    </div>
                  </div>
                  <div className="flex-col flex-col--5">
                    <div className="cms--contact-card--row service__accordian--no-overflow">
                      <h3>
                        <FontAwesomeIcon icon="phone" /> Telephone
                      </h3>
                      <p>{event.organiser_phone || 'n/a'}</p>
                    </div>
                    <div className="cms--contact-card--row service__accordian--no-overflow">
                      <h3>
                        <FontAwesomeIcon icon="envelope" /> Email
                      </h3>
                      <p>{event.organiser_email || 'n/a'}</p>
                    </div>
                  </div>
                </div>

                <div className="mobile-hide">
                  <h2 className="h2 margin-bottom">Where and when is this event?</h2>
                  <div className="panel-box__white flex-col flex-col--12">
                    <div className="flex-container flex-container--no-padding">
                      <h3 className="h3">
                        {moment(event.start_date).format('dddd MMMM Do')} - {event.start_time}
                      </h3>
                      <div className="flex-col flex-col--5">
                        <div className="address">
                          <p>{event.location.address_line_1} </p>
                          <p>{event.location.address_line_2} </p>
                          <p>{event.location.city} </p>
                          <p>{event.location.postcode}</p>
                        </div>
                        <div className="google-links">
                          <Link
                            text="View on Google Maps"
                            size="medium"
                            href={`https://www.google.com/maps/search/?api=1&query=${event.location.lat},${event.location.lon}`}
                            iconPosition="right"
                            target="_blank"
                            rel="noopener nofollow"
                            className="location__google-maps--link"
                          />
                          <Link
                            text="Get directions on Google Maps"
                            size="medium"
                            href={`https://www.google.com/maps?daddr=${event.location.lat},${event.location.lon}`}
                            target="_blank"
                            rel="noopener nofollow"
                            iconPosition="right"
                            className="location__google-maps--link"
                          />
                        </div>
                      </div>
                      <div className="flex-col flex-col--5">
                        <div className="service__map">
                          <MapCard locations={[event]} />
                        </div>
                      </div>
                    </div>
                    <div className="disability-services">
                      {event.location.has_wheelchair_access && (
                        <div className="service">
                          <img
                            className="icon"
                            src={InductionLoop}
                            alt="Wheelchair accessible logo"
                          />
                          Wheelchair accessible
                        </div>
                      )}
                      {event.location.has_induction_loop && (
                        <div className="service">
                          <img className="icon" src={WheelChair} alt="Induction loop logo" />
                          Induction loop
                        </div>
                      )}
                      {event.location.has_accessible_toilet && (
                        <div className="service">
                          <img className="icon" src={FallbackLogo} alt=" Accessible toilet logo" />
                          Accessible toilet
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex-col flex-col--4 flex-col--tablet--12">
            <div className="mobile-hide margin-bottom">
              <CostCard is_free={event.is_free} fees_url={event.fees_url} />
            </div>
            {hasBookingFields && (
              <Accordian
                title={event.booking_title as string}
                className="service__accordian margin-bottom mobile-show"
              >
                <p className="p--large">{event.booking_summary}</p>
                <a href={event.booking_url} className="button button__alt--small">
                  {event.booking_cta}
                </a>
              </Accordian>
            )}

            <h2 className="h2 margin-bottom">Add to your calendar?</h2>

            <div className="panel-box__white margin-bottom">
              <p className="p--large">Download this event to your personal calender </p>
              <button className="button button__alt--small">Download</button>
            </div>
            <ShareCard />
            <div className=" flex-col flex-col--12 flex-container flex-container--justify ">
              <p>
                Page last updated{' '}
                <strong>{moment(event!.updated_at).format('Do MMMM YYYY')}</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default inject('eventStore')(observer(EventDetail));
