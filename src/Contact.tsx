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

const Contact: React.FunctionComponent<IProps> = ({ cmsStore }) => {
  if (!cmsStore) {
    return null;
  }

  return (
    <CMSPage title={get(cmsStore, 'contact.title')}>
      <ReactMarkdown source={get(cmsStore, 'contact.content')} />
    </CMSPage>
  );
};

export default inject('cmsStore')(observer(Contact));
