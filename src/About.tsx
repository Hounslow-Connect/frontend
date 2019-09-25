import React from 'react';
import CMSPage from './components/CMSPageLayout';
import { inject, observer } from 'mobx-react';
import CMSStore from './stores/CMSStore';
import get from 'lodash/get';
import ReactMarkdown from 'react-markdown';
import ReactPlayer from 'react-player';

interface IProps {
  cmsStore: CMSStore;
}

const About: React.FunctionComponent<IProps> = ({ cmsStore }) => {
  if (!cmsStore) {
    return null;
  }

  return (
    <CMSPage title={get(cmsStore, 'about.title')}>
      <ReactMarkdown source={get(cmsStore, 'about.content')} />
      <ReactPlayer
        url={get(cmsStore, 'about.video_url')}
        style={{ borderRadius: '19px' }}
        width={'90%'}
        light={true}
      />
    </CMSPage>
  );
};

export default inject('cmsStore')(observer(About));
