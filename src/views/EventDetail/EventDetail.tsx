import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import get from 'lodash/get';
import { Link as RouterLink} from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

import { IService } from '../../types/types';

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
  }, [eventStore, match])

  const { event, organisation } = eventStore;

  if (!event) return null

  const getImg = (event: IEvent) => {
    if (event) {
      return `${apiBase}/services/${event.id}/logo.png?`;
    } else {
      return `${apiBase}/organisations/${get(event, 'organisation.id')}/logo.png?v=${get(
        event,
        'organisation.id'
      )}`;
    }
  }; 

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
          { text: event.title,  url: '' },
        ]}
      />

      <div className='service__header'>
        <div className="flex-container">
          <div className="service__header__wrapper event__header__wrapper">
            <div className="service__header__logo">
              <img src={getImg(event)} alt={`${event.title} logo`} />
            </div>
            <div className="flex-col flex-col--tablet--9">
              <h1 className='h1'>{get(event, 'title')}</h1>
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
                      black
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
        <div className="panel-box__white--large flex-col flex-col--12">
          <div className="event-summary-card__pills"> 
            <h3 className="h3 event-summary-card__tag event-summary-card__tag--date-time">
              {moment(event.start_date).format('dddd MMMM Do')} - {event.start_time}
            </h3>
            <div className="event-summary-card__tag event-summary-card__tag--cost">
              {event.is_free ? 'Free' : ' Costs'}
            </div>
            <div className="event-summary-card__tag event-summary-card__tag--virtual">
              {event.is_virtual ? 'Online' : 'In person'}
            </div>
          </div>
          <p className='p--xlarge'>{event.intro}</p>
        </div>
      </div>
        <div className="flex-container flex-container--justify">
          <div className="flex-col flex-col--12">
            <div className="flex-container">
              <h2 className='h2'>Event description</h2>
            </div>
          </div>
          <div className="flex-col flex-col--8 flex-col--mobile--12 flex-col--tablet--12 service__left-column">
            <div className="flex-container">
              <div className="panel-box__white">
                <p>{event.description}</p>
              </div>
          
              <h2 className="h2">How can I contact this event organiser?</h2>
              <div className="flex-container flex-container--no-padding contact">
                <div className='flex-col flex-col--6'>
                  {event.organiser_name && (
                    <p className='p--large'> 
                      Contact <a href={event.organiser_url as string}>{event.organiser_name}</a> for more information</p>
                  )}
                  <div className="cms--contact-card--row">
                    <h3>
                      <FontAwesomeIcon icon="globe" /> Website
                    </h3>
                    <p>{event.organiser_url || 'n/a'}</p>
                  </div>
                </div>
                <div className='flex-col flex-col--5'>
                  <div className="cms--contact-card--row">
                    <h3>
                      <FontAwesomeIcon icon="phone" /> Telephone
                    </h3>
                    <p>{event.organiser_phone || 'n/a'}</p>
                  </div>
                  <div className="cms--contact-card--row">
                    <h3>
                      <FontAwesomeIcon icon="envelope" /> Email
                    </h3>
                    <p>{event.organiser_email || 'n/a'}</p>
                  </div>
                </div>
              </div>

              {event.location && (
              <>
                <h2 className="h2">Where and when is this event?</h2>
                <div className="panel-box__white  flex-col flex-col--12">
                  <h3 className="event-summary-card__tag">
                  </h3>
                  <div className="flex-container flex-container--no-padding">
                    <div className='p--xlarge'>{moment(event.start_date).format('dddd MMMM Do')} - {event.start_time}</div>
                    <div className="flex-col flex-col--5">
                      <div className='p--xlarge'>
                        {event.location.address_line_1}{' '}
                        {event.location.address_line_2}{' '}
                        {event.location.city}{' '}
                        {event.location.county}
                      </div>
                      <Link
                        icon="map"
                        text="View on Google Maps"
                        size="medium"
                        href={`https://www.google.com/maps/search/?api=1&query=${event.location.lat},${event.location.lon}`}
                        iconPosition="right"
                        target="_blank"
                        rel="noopener nofollow"
                        className="location__google-maps--link"
                      />
                      <Link
                        icon="map-signs"
                        text="Get directions on Google Maps"
                        size="medium"
                        href={`https://www.google.com/maps?daddr=${event.location.lat},${event.location.lon}`}
                        target="_blank"
                        rel="noopener nofollow"
                        iconPosition="right"
                        className="location__google-maps--link"
                      />
                      <ul>
                        {['ear-listen', 'wheelchair'].map((accessibilityItem: string) => (
                          // @ts-ignore
                          <li><FontAwesomeIcon icon={'wheelchair'}> {accessibilityItem}</FontAwesomeIcon></li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex-col flex-col--5">
                      <div className="service__section service__map">
                        <MapCard locations={[event]} />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            </div>
          </div>

          <div className="flex-col flex-col--4 flex-col--mobile--12">
            <CostCard is_free={event.is_free} fees_url={event.fees_url} />
            <h2 className="h2">Filter your results</h2>
            <div className="panel-box__white">
              <p>You can get more personalised results by providing some extra information</p>
              <button className="button button__alt--small flex--align--start">Register on EventBrite</button>
            </div>
            <h2 className="h2">Add to your calendar?</h2>

            <div className="panel-box__white">
              <p>Download this event to your personal calender </p>
              <button className="button button__alt--small flex--align--start">Download</button>
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
