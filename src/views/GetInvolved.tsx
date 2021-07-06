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

const GetInvolved: React.FunctionComponent<IProps> = ({ cmsStore }) => {
  if (!cmsStore) {
    return null;
  }

  return (
    <CMSPage title={get(cmsStore, 'get_involved.title')} breadcrumb="Get Involved">
      <Helmet>
        <title>Get Involved | Hounslow Connect</title>
      </Helmet>

      <ReactMarkdown source={get(cmsStore, 'get_involved.content')} />
    </CMSPage>
  );
};

export default inject('cmsStore')(observer(GetInvolved));
