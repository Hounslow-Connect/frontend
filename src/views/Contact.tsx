import React from 'react';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';
import ReactMarkdown from 'react-markdown';

import CMSStore from '../stores/CMSStore';
import CMSPage from '../components/CMSPageLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps {
  cmsStore: CMSStore;
}

const Contact: React.FunctionComponent<IProps> = ({ cmsStore }) => {
  if (!cmsStore) {
    return null;
  }

  return (
    <CMSPage title={get(cmsStore, 'contact.title')} twoColumn={true}>
      <div className="flex-col flex-col--7 cms__content">
        <ReactMarkdown source={get(cmsStore, 'contact.content')} />
      </div>
      <div className="flex-col flex-col--3 flex-col--mobile--5 flex-col--tablet-large--4">
        <div className="cms--contact-card">
          <h3>Contact</h3>
          <div className="service__contact-card--row">
            <FontAwesomeIcon icon="phone" /> Telephone
            <p>{get(cmsStore, 'global.contact_phone')}</p>
          </div>
          <div className="service__contact-card--row">
            <FontAwesomeIcon icon="envelope" /> Email
            <a
              className="cms--contact-card--email"
              href={`mailto:${get(cmsStore, 'global.contact_email')}`}
            >
              {get(cmsStore, 'global.contact_email')}
            </a>
          </div>
          <div className="flex-col flex-col--12 service__social-icon-container">
            <a
              href={`https://facebook.com/${get(cmsStore, 'global.facebook_handle')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={['fab', 'facebook-f']} className="service__social-icon" />
            </a>
            <a
              href={`https://twitter.com/${get(cmsStore, 'global.twitter_handle')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={['fab', 'twitter']} className="service__social-icon" />
            </a>
          </div>
        </div>
      </div>
    </CMSPage>
  );
};

export default inject('cmsStore')(observer(Contact));
