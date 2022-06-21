import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IEvent } from './IEvent';

import './EventSummary.scss';

const EventSummary: React.FC<{event: IEvent}> = ({ event }) => {
  if (!event) {
    return null;
  }

  return (
    <div key={event.id} className='event-summary-card'>
      <div className='event-summary-card__inner'>
        <div className='search-result-card__title'>
          <h3 className='event-summary-card__h3'>{event.title}</h3>
          <div className='event-summary-card__pills'>
            <div className='event-summary-card__tag event-summary-card__tag--cost'>
              {event.is_free ? 'Free' : ' Costs'}
            </div>
            <div className='event-summary-card__tag event-summary-card__tag--virtual'>
              {event.is_virtual ? 'Virtual' : 'In person'}
            </div>
          </div>
          <h4 className='event-summary-card__h4'>
            {moment(event.start_date).format('dddd MMMM Do')} - {event.start_time}</h4>
        </div>
        <div className="search-result-card__logo">
          <img src='' alt='' />
        </div>
        <p className='event-summary-card__p'>{event.intro}</p>
        <div className='event-summary-card__view-more'>
          <Link to={`/events/${event.id}`}>
            <span>View more</span>
            <FontAwesomeIcon icon="arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export type { IEvent };

export default EventSummary;

