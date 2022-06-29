import React, { useState, LegacyRef, useEffect } from 'react';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LinkButton from '../LinkButton';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import EventSummary from '../EventSummary';
import { IEvent } from '../EventSummary/IEvent';
import { chunkifyArray } from './utils';

import './EventFeed.scss';

// Setting for customiseations for events feed slider
// TODO - make slider its own component and/or hook
const noOfEventsPerDesktopSlide = 4;
const noOfEventsPerMobileSlide = 1;
const sliderBreakpoint = '768px';

const EventFeed: React.FC<{
  list: IEvent[];
  innerRef: LegacyRef<HTMLElement> | undefined;
  scrollToEvents: () => void;
}> = ({ list, innerRef, scrollToEvents }) => {
  const [activeCarouselItem, setActiveCarouselItem] = useState<number>(1);
  const { isMobile } = useMediaQuery(`(max-width: 768px${sliderBreakpoint})`);

  useEffect(() => {
    scrollToEvents();
  }, [scrollToEvents, activeCarouselItem]);

  if (!list || list.length === 0) {
    return null;
  }

  const setChunk = isMobile.matches ? noOfEventsPerMobileSlide : noOfEventsPerDesktopSlide;
  const currentSlide = chunkifyArray(list, setChunk);

  return (
    <section className="event-feed" ref={innerRef}>
      <div className="event-feed__intro">
        <h2 className="search__heading">Community events happening this week...</h2>
        <div className="banner__carousel">
          {currentSlide.map((slider: IEvent[], i: number) => (
            <div className="event-feed__grid" key={i}>
              {slider.map((event: IEvent, j: number) => {
                return (
                  <div
                    key={j}
                    className={'slide' + (activeCarouselItem === i + 1 ? ' slide--active' : '')}
                  >
                    <EventSummary event={event} />
                  </div>
                );
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
        <div className="flex-container flex-container--justify">
          <LinkButton to="/events" text="Search for more events" />
        </div>
      </div>
    </section>
  );
};

const EventFeedObservered = observer(EventFeed);

export default React.forwardRef((props, ref) => (
  // @ts-ignore
  <EventFeedObservered innerRef={ref as LegacyRef<HTMLElement> | undefined} {...props} />
));
