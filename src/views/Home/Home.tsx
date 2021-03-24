import React from 'react';
import { inject, observer } from 'mobx-react';
import Search from '../../components/Search';

import SearchStore from '../../stores/searchStore';
import CMSStore from '../../stores/CMSStore';

import Banner from '../../components/Banner';
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
      {cmsStore.hasBanner && cmsStore.banner && <Banner banner={cmsStore.banner} />}
      <Search />
      <Personas personas={SearchStore.personas} />
    </main>
  )
};

export default inject('cmsStore')(observer(Home));
