import React from 'react';
import {Helmet} from "react-helmet";
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';
import ReactMarkdown from 'react-markdown';

import CMSStore from '../stores/CMSStore';
import CMSPage from '../components/CMSPageLayout';

interface IProps {
  cmsStore: CMSStore;
}

const Privacy: React.FunctionComponent<IProps> = ({ cmsStore }) => {
  if (!cmsStore) {
    return null;
  }

  return (
    <CMSPage title={get(cmsStore, 'privacy_policy.title')} breadcrumb="Privacy Policy">
      <Helmet>
        <title>Privacy | One Hounslow Connect</title>
      </Helmet>

      <ReactMarkdown source={get(cmsStore, 'privacy_policy.content')} />
    </CMSPage>
  );
};

export default inject('cmsStore')(observer(Privacy));
