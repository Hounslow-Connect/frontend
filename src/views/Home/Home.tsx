import React from 'react';
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
  if (!cmsStore) {
    return null;
  }

  return (
    <main className="home">
      <Helmet>
        <title>Home | Hounslow Connect</title>
      </Helmet>
      {cmsStore.home && cmsStore.home.banners && (
        <BannerSlider header_content={cmsStore.banner} banners={cmsStore.home.banners} />
      )}
      <Search />
      <EventFeed list={EventStore.eventFeed} />
      <Personas personas={SearchStore.personas} />
    </main>
  );
};

export default inject('cmsStore')(observer(Home));
