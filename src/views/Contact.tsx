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
    <CMSPage title={get(cmsStore, 'contact.title')} twoColumn={true} breadcrumb="Contact">
      <div className="flex-col flex-col--7 flex-col--tablet--8">
        <ReactMarkdown source={get(cmsStore, 'contact.content')} />
      </div>
      <div className="flex-col flex-col--3 flex-col--mobile--12 flex-col--tablet--8 flex-col--tablet-large--4">
        <div className="cms--contact-card">
          <h2>Contact</h2>
          <div className="cms--contact-card--row">
            <h3>
              <FontAwesomeIcon icon="phone" /> Telephone
            </h3>
            <p>{get(cmsStore, 'global.contact_phone')}</p>
          </div>
          <div className="cms--contact-card--row">
            <h3>
              <FontAwesomeIcon icon="envelope" /> Email
            </h3>
            <a
              className="cms--contact-card--email"
              href={`mailto:${get(cmsStore, 'global.contact_email')}`}
            >
              {get(cmsStore, 'global.contact_email')}
            </a>
          </div>
          <div className="flex-col flex-col--12 cms--contact-card--socials service__contact-card--row">
            <a
              href={`https://facebook.com/${get(cmsStore, 'global.facebook_handle')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hounslow Connect Facbook"
            >
              <FontAwesomeIcon icon={['fab', 'facebook-f']} className="service__social-icon" />
            </a>
            <a
              href={`https://twitter.com/${get(cmsStore, 'global.twitter_handle')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hounslow Connect Twitter"
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
