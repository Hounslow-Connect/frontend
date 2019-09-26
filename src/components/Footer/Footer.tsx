import React from 'react';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import get from 'lodash/get';

import './Footer.scss';
import Button from '../Button';
import CMSStore from '../../stores/CMSStore';

interface IProps {
  mobileMenu?: boolean;
  cmsStore?: CMSStore;
}

const Footer: React.FunctionComponent<IProps> = ({ mobileMenu, cmsStore }) => (
  <footer
    className={cx('footer', {
      'footer-mobile-menu': mobileMenu,
    })}
  >
    <div className="flex-container">
      <div className="flex-col flex-col--6 flex-col--tablet--12 mobile-hide footer-section disclaimer">
        <h4>{get(cmsStore, 'global.footer_title')}</h4>
        <ReactMarkdown className="body--xs" source={get(cmsStore, 'global.footer_content')} />
      </div>
      <div className="flex-col flex-col--6 flex-col--tablet--12 mobile-hide footer-section">
        <div className="flex-container flex-container--no-padding">
          <div className="flex-col flex-col--6">
            <h4>Get in touch with Connected Kingston</h4>
            <nav className="footer__social-links" role="menubar" aria-label="Social Media Links">
              <a
                href={`https://facebook.com/${get(cmsStore, 'global.facebook_handle')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={['fab', 'facebook-f']} className="footer__social-icons" />
              </a>
              <a
                href={`https://twitter.com/${get(cmsStore, 'global.twitter_handle')}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={['fab', 'twitter']} className="footer__social-icons" />
              </a>
            </nav>
          </div>
          <div className="flex-col flex-col--6 text-right text-left--mobile footer-section footer-section--button">
            <a href="https://admin.connectedkingston.uk" target="_blank" rel="noopener noreferrer">
              <Button text="Members Area" size="small" alt={true} />
            </a>
          </div>
        </div>
        <div className="flex-container flex-container--no-padding">
          <div className="flex-col flex-col--6 flex-col--mobile--6">
            <Link to={'/contact'} className="body--xs footer-contact-links">
              Contact us
            </Link>
            <p className="body--xs footer-contact-links">Give feedback</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default inject('cmsStore')(observer(Footer));
