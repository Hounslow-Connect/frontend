import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import get from 'lodash/get';
import { Link } from 'react-router-dom';

import Breadcrumb from '../../components/Breadcrumb';
import EventStore from '../../stores/eventStore';
import { apiBase } from '../../config/api';
import { IEvent } from '../../components/EventSummary/IEvent';
import LinkButton from '../../components/LinkButton';
import CostCard from '../../views/Service/CostCard';
import VideoCard from '../../views/Service/VideoCard';
import MapCard from '../../views/Service/MapCard';
import ContactCard from '../../views/Service/ContactCard';
import ReferralCard from '../../views/Service/ReferralCard';
import ShareCard from '../../views/Service/ShareCard';



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
    <section className="results">
      <Helmet>
        {get(event, 'name') && <title>{`${get(event, 'name')} | Hounslow Connect`}</title>}
        {!get(event, 'name') && <title>Event | Hounslow Connect</title>}

        {get(event, 'intro') && <meta name="description" content={get(event, 'intro')} />}

        {get(event, 'name') && <meta property="og:title" content={`${get(event, 'name')}`} />}
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

      <div className={`service__header service__header--${get(event, 'type')}`}>
        <div className="flex-container">
          <div className="service__header__wrapper">
            <div className="service__header__logo">
              <img src={getImg(event)} alt={`${event.title} logo`} />
            </div>
            <div className="flex-col flex-col--tablet--9">
              {/* if service do <span className="organisation__header__sub">Service</span> */}
              
              {/* else if event */}
              <h1>{get(event, 'title')}</h1>
              {organisation && organisation.slug && (
                <p className="service__header__desc">
                  This service is run by the organisation{' '}
                  <Link to={`/organisations/${organisation.slug}`} aria-label="Home Link">
                    {organisation.name}
                  </Link>
                  . View their organisation details and other listed services.
                </p>
              )}
              <div className="flex-container flex-container--no-padding flex-container--left">
                {organisation && organisation.slug && (
                  <div className="flex-col--mobile--12">
                    <LinkButton
                      alt={false}
                      accent={true}
                      text="View organisation"
                      to={`/organisations/${organisation.slug}`}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="service__info">
        <div className="flex-container flex-container--justify">
          <div className="flex-col flex-col--8 flex-col--mobile--12 flex-col--tablet--12 service__left-column">
            <div className="flex-container flex-container--align-center flex-container--no-padding service__section service__section--no-padding">
              <div className="flex-col flex-col--12 flex-col--mobile--12 service__criteria">
                <h2 className="service__heading">Who is it for?</h2>
              </div>
              <div className="flex-col flex-col--4 flex-col--tablet--12  ">
                <div className="flex-container service__right-column mobile-hide">
                  <div className="tablet-hide flex-col flex-col--12 service__info__cost service__section">
                    {/* <CostCard service={event} /> */}
                  </div>
                  {event.location && (
                    <div className="flex-col flex-col--12">
                      {/* <h2 className="service__heading">{`Where is this ${event.type}?`}</h2> */}
                      <div className="service__section service__map">
                        {/* <MapCard iconType={get(event, 'type')} locations={event} /> */}
                      </div>
                    </div>
                  )}
                  <div className="flex-col flex-col--12">
                    {/* <h2 className="service__heading">{`How can I contact this ${event.type}?`}</h2> */}
                    <div className="service__section">
                      {/* <ContactCard organisation={organisation} service={event} /> */}
                    </div>
                  </div>
                </div>
                <div className="flex-container service__right-column">
                  <div className="flex-col flex-col--12">
                    <ShareCard />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default inject('eventStore')(observer(EventDetail));
