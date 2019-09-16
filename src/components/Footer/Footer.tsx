import React from 'react';
import cx from 'classnames';

import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button';

interface IProps {
  mobileMenu?: boolean;
}

const Footer: React.FunctionComponent<IProps> = ({ mobileMenu }) => (
  <footer
    className={cx('footer', {
      'footer-mobile-menu': mobileMenu,
    })}
  >
    <div className="flex-container">
      <div className="flex-col flex-col--6 flex-col--tablet--12 mobile-hide footer-section disclaimer">
        <h4>Disclaimer</h4>
        <p className="body--xs">
          Connected Kingston makes every effort to provide up-to-date and accurate information on
          this website. The listing of a service with an online referral option in no way should be
          viewed as an endorsement or recommendation by Connected Kingston (please see section 3 of
          Connected Kingston
        </p>
      </div>
      <div className="flex-col flex-col--6 flex-col--tablet--12 mobile-hide footer-section">
        <div className="flex-container flex-container--no-padding">
          <div className="flex-col flex-col--6">
            <h4>Get in touch with Connected Kingston</h4>
            <nav className="footer__social-links" role="menubar" aria-label="Social Media Links">
              <FontAwesomeIcon icon={['fab', 'facebook-f']} className="footer__social-icons" />
              <FontAwesomeIcon icon={['fab', 'twitter']} className="footer__social-icons" />
              <FontAwesomeIcon icon={['fab', 'instagram']} className="footer__social-icons" />
            </nav>
          </div>
          <div className="flex-col flex-col--6 text-right text-left--mobile footer-section footer-section--button">
            <Button text="Members Area" size="small" alt={true} />
          </div>
        </div>
        <div className="flex-container flex-container--no-padding">
          <div className="flex-col flex-col--6 flex-col--mobile--6">
            <p className="body--xs footer-contact-links">Contact us</p>
            <p className="body--xs footer-contact-links">Give feedback</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
