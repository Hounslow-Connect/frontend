import React, { createRef, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router';

import Search from '../../components/Search';
import EventFeed from '../../components/EventFeed';

import './Home.scss';

import SearchStore from '../../stores/searchStore';
import CMSStore from '../../stores/CMSStore';
import EventStore from '../../stores/eventStore';

import BannerSlider from '../../components/BannerSlider';
import Personas from '../../components/Personas';
import { IEvent } from '../../components/EventSummary/IEvent';
interface IProps {
  cmsStore: CMSStore;
  eventStore: EventStore;
}

const Home: React.FunctionComponent<IProps> = ({ cmsStore, eventStore }) => {
  const eventSectionRef = createRef<HTMLDivElement | null>();
  const serviceSectionRef = createRef<HTMLDivElement | null>();
  const history = useHistory();

  useEffect(() => {
    eventStore.fetchEventsHomePage();
  }, [eventStore]);

  const scrollToEvents = () => {
    if (!eventSectionRef.current) {
      return;
    }

    eventSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    if (!serviceSectionRef.current) {
      return;
    }
    serviceSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const goToEventsPage = useCallback(() => history.push('/events'), [history]);

  if (!cmsStore) {
    return null;
  }

  return (
    <main className="home">
      <Helmet>
        <title>Home | Hounslow Connect</title>
      </Helmet>
      {cmsStore.home && cmsStore.home.banners && (
        <BannerSlider
          header_content={cmsStore.banner}
          banners={cmsStore.home.banners}
          cta={{
            handleEventsNavigation:
              eventStore.eventsHomePage.length === 0 ? goToEventsPage : scrollToEvents,
            scrollToServices,
          }}
        />
      )}
      <Search ref={serviceSectionRef} />
      <EventFeed
        // @ts-ignore
        list={eventStore.eventsHomePage as IEvent[]}
        ref={eventSectionRef}
        scrollToEvents={scrollToEvents}
      />
      <Personas personas={SearchStore.personas} />
    </main>
  );
};

export default inject('cmsStore', 'eventStore')(observer(Home));
