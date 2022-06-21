import React, {createRef, useCallback} from 'react';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';
import Search from '../../components/Search';
import EventFeed from '../../components/EventFeed';

import './Home.scss';

import SearchStore from '../../stores/searchStore';
import CMSStore from '../../stores/CMSStore';
import EventStore from '../../stores/eventStore';

import BannerSlider from '../../components/BannerSlider';
import Personas from '../../components/Personas';

interface IProps {
  cmsStore: CMSStore;
  eventStore: any;
}

const Home: React.FunctionComponent<IProps> = ({ cmsStore }) => {
  const eventSectionRef = createRef<HTMLDivElement>();
  const serviceSectionRef = createRef<HTMLDivElement>();

  const scrollToEvents = () => {
    if (!eventSectionRef.current) return;
    eventSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    if (!serviceSectionRef.current) return;
    serviceSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

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
            scrollToEvents,
            scrollToServices,
          }} 
        />
      )}
       {/* @ts-ignore */}
      <Search ref={serviceSectionRef} />
      {/* @ts-ignore */}
      <EventFeed list={EventStore.eventFeed} ref={eventSectionRef} />
      <Personas personas={SearchStore.personas} />
    </main>
  );
};

export default inject('cmsStore')(observer(Home));
