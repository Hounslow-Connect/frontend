import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Breadcrumb from '../../components/Breadcrumb';
import EventSummary from '../../components/EventSummary/EventSummary';
import EventStore from '../../stores/eventStore';

import './Events.scss';

interface IProps {
  eventStore: EventStore;
}

const Events: React.FunctionComponent<IProps> = ({ eventStore }) => {
  const [activeCarouselItem, setActiveCarouselItem] = useState(1);

  useEffect(() => {
    eventStore.fetchAllEvents();
  }, [eventStore]);

  if (!eventStore || !eventStore.eventList) {
    return null;
  }

  const { total, eventList, numberOfPages } = eventStore;

  const getPages = Array.from(Array(numberOfPages), (_, i) => i + 1);

  return (
    <section className="results">
      <Helmet>
        <meta property="og:type" content="website" />
      </Helmet>

      <Breadcrumb
        crumbs={[
          { text: 'Home', url: '/' },
          { text: 'Events', url: '/' },
        ]}
      />
      <div className="flex-container">
        <h1 className="results__heading">Events In Hounslow</h1>
        <h4 className="results__heading">
          The borough has a wide range of community events, many of which are free. Search below to
          explore all
        </h4>
      </div>
      <div className="results__info">
        <div className="flex-container">
          <div className="results__info__wrapper">
            <div className="results__count">
              <p>Your search: {total} results found</p>
            </div>
          </div>
        </div>
      </div>

      <div className="events__list">
        <div className="results__container">
          {eventList.map(event => (
            <EventSummary key={event.id} event={event} />
          ))}
        </div>
      </div>

      {numberOfPages && numberOfPages > 1 && (
        <div className="flex-container">
          <div className="pagination">
            <button
              className="arrow arrow--left"
              disabled={activeCarouselItem <= 1 ? true : false}
              onClick={() => {
                setActiveCarouselItem(activeCarouselItem - 1);
                eventStore.fetchAllEvents(activeCarouselItem - 1);
              }}
            >
              <FontAwesomeIcon icon="chevron-left" />
              <span>Previous page</span>
            </button>
            <div className="pagination__pages">
              {getPages.map(page => (
                <div key={page} onClick={() => eventStore.fetchAllEvents(page)}>
                  {page}
                </div>
              ))}
            </div>
            <button
              className="arrow arrow--right"
              disabled={activeCarouselItem >= numberOfPages ? true : false}
              onClick={() => {
                setActiveCarouselItem(activeCarouselItem + 1);
                eventStore.fetchAllEvents(activeCarouselItem + 1);
              }}
            >
              <FontAwesomeIcon icon="chevron-right" />
              <span>Next page</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default inject('eventStore')(observer(Events));
