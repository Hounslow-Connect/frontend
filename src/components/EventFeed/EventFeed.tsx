import React, {useState, RefObject} from 'react';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import EventSummary from '../EventSummary';
import { IEvent } from '../EventSummary/IEvent';
import { chunkifyArray } from './utils';

import './EventFeed.scss';

const noOfEventsPerSlide = 4;

// @ts-ignore
const EventFeed = React.forwardRef(({ list }, ref) => {
  const [activeCarouselItem, setActiveCarouselItem] = useState<number>(1);

  if (list.length === 0) {
    return null;
  }

  const currentSlide = chunkifyArray(list, noOfEventsPerSlide);

  return (
    <section className="event-feed" ref={ref as any}>
      <div className='event-feed__intro'>
        <h2 className="search__heading">Community events happening this week...</h2>
        <div className="banner__carousel">
          {currentSlide.map((slider: IEvent[], i: number) => (
            <div className="event-feed__grid" key={i}>
              {slider.map((event: IEvent, j: number) => {
                return (
                  <div key={j} className={'slide' + (activeCarouselItem === i + 1 ? ' slide--active' : '')}>
                    <EventSummary event={event} />
                  </div>
                )
              })}
            </div>    
          ))}
          {currentSlide.length && currentSlide.length > 1 && (
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
                disabled={activeCarouselItem >= currentSlide.length ? true : false}
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
})

export default observer(EventFeed);

