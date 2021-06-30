import React from 'react';
import {Helmet} from "react-helmet";
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';
import ReactMarkdown from 'react-markdown';

import CMSPage from '../components/CMSPageLayout';
import CMSStore from '../stores/CMSStore';

interface IProps {
  cmsStore: CMSStore;
}

const Terms: React.FunctionComponent<IProps> = ({ cmsStore }) => {
  if (!cmsStore) {
    return null;
  }

  return (
    <CMSPage title={get(cmsStore, 'terms_and_conditions.title')} breadcrumb="Terms & Conditions">
      <Helmet>
        <title>Terms and Conditions | Hounslow Connect</title>
      </Helmet>

      <ReactMarkdown source={get(cmsStore, 'terms_and_conditions.content')} />
    </CMSPage>
  );
};

export default inject('cmsStore')(observer(Terms));
