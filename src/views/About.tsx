import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';
import ReactMarkdown from 'react-markdown';
import ReactPlayer from 'react-player/lazy'

import CMSStore from '../stores/CMSStore';
import CMSPage from '../components/CMSPageLayout';

interface IProps {
  cmsStore: CMSStore;
}

const About: React.FunctionComponent<IProps> = ({ cmsStore }) => {
  const [videoPlaying, setVideoPlaying] = useState<boolean>(true)

  if (!cmsStore) {
    return null;
  }

  return (
    <CMSPage title={get(cmsStore, 'about.title')} breadcrumb="About">
      <Helmet>
        <title>About | Hounslow Connect</title>
      </Helmet>
      <ReactMarkdown source={get(cmsStore, 'about.content')} />
      {get(cmsStore, 'about.video_url') && (
        <ReactPlayer
          url={get(cmsStore, 'about.video_url')}
          style={{ borderRadius: '19px', margin: 'auto', marginTop: '24px' }}
          width={'90%'}
          controls
          light={true}
          onClickPreview={() => setVideoPlaying(true)}
          playing={videoPlaying}
        />
      )}
    </CMSPage>
  );
};

export default inject('cmsStore')(observer(About));
