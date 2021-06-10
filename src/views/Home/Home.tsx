import React from 'react';
import { inject, observer } from 'mobx-react';
import Search from '../../components/Search';

import './Home.scss';

import SearchStore from '../../stores/searchStore';
import CMSStore from '../../stores/CMSStore';

import BannerSlider from '../../components/BannerSlider';
import Personas from '../../components/Personas';

interface IProps {
  cmsStore: CMSStore;
}

const Home: React.FunctionComponent<IProps> = ({ cmsStore }) => {
  if (!cmsStore) {
    return null;
  }
  
  return (
    <main className="home">
      {cmsStore.home && cmsStore.home.banners && <BannerSlider header_content={cmsStore.banner} banners={cmsStore.home.banners} />}
      <Search />
      <Personas personas={SearchStore.personas} />
    </main>
  )
};

export default inject('cmsStore')(observer(Home));
