import React, {useState} from 'react';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import EventSummary from '../EventSummary';
import { IEvent } from '../EventSummary/IEvent';

import './EventFeed.scss';


const EventFeed: React.FC<{ list: IEvent[] }> = ({ list }) => {
  const [activeCarouselItem, setActiveCarouselItem] = useState<number>(1);

  if (!list) {
    return null;
  }

  return (
    <section className="event-feed" id='find-local-events'>
      <div className='personas__intro'>
        <h2 className="search__heading">Community events happening this week...</h2>
        <div className="banner__carousel">
          <div className="event-feed__grid">
            {list.map((event: IEvent, i: number) => (
              <EventSummary
                event={event}
                key={i}
              />
            ))}
          </div>
          {list.length && list.length > 1 && (
            <div className="arrows">
              <button
                className="arrow arrow-left"
                disabled={activeCarouselItem <= 1 ? true : false}
                onClick={() => {
                  setActiveCarouselItem(activeCarouselItem - 1);
                }}
              >
                <FontAwesomeIcon icon="chevron-left" />
                <span className="sr-only">Previous slide</span>
              </button>
              <button
                className="arrow arrow-right"
                disabled={activeCarouselItem >= list.length ? true : false}
                onClick={() => {
                  setActiveCarouselItem(activeCarouselItem + 1);
                }}
              >
                <FontAwesomeIcon icon="chevron-right" />
                <span className="sr-only">Next slide</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default observer(EventFeed);

