import React, { Component, Fragment } from 'react';
import ReactSVG from 'react-svg';
import { observer, inject } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import { NavLink as RouterLink } from 'react-router-dom';

import './Header.scss';

import Logo from '../../assets/logo/logo.svg';
import MobileLogo from '../../assets/logo/logo-mobile.svg';

import Button from '../Button';
import WindowSizeStore from '../../stores/windowSizeStore';
import UIStore from '../../stores/uiStore';
import Footer from '../Footer/Footer';

interface IProps {
  windowSizeStore?: WindowSizeStore;
  uiStore?: UIStore;
}

@inject('windowSizeStore', 'uiStore')
@observer
class Header extends Component<IProps> {
  componentDidMount() {
    const navContainer = document.querySelector('.header');
    const navTrigger = document.querySelector('.nav-trigger');

    if (navTrigger && navContainer) {
      return navTrigger.addEventListener('click', evt => {
        navTrigger.classList.toggle('active');
        navContainer.classList.toggle('active');
      });
    }
  }

  render() {
    const { windowSizeStore, uiStore } = this.props;

    // injected stores must be typed as optional, but will always be there if injected. Allows workound for destructuring values from store
    if (!windowSizeStore || !uiStore) {
      return null;
    }

    const { isMobile } = windowSizeStore;

    return (
      <header className="header">
        <div className="flex-col--12 mobile-hide tablet--large-hide">
          <div id="google_translate_element" />
          <Button
            text="Give Feedback"
            header={true}
            icon="comment"
            onClick={() => uiStore.toggleFeedbackModal()}
          />
          <RouterLink to="/favourites">
            <Button text="Favourites" header={true} icon="star" />
          </RouterLink>
        </div>

        <div
          className={cx(
            {
              'flex-container flex-container--align-center flex-container--justify': isMobile,
            },
            { navigation: !isMobile }
          )}
        >
          <div className="flex-col flex-col--6 flex-col--tablet-large--12 header__brand">
            <figure className="logo">
              <RouterLink to="/" aria-label="Home Link">
                <ReactSVG src={isMobile ? MobileLogo : Logo} />
              </RouterLink>
            </figure>
            <button type="button" name="nav-trigger" className="nav-trigger tablet--large-show">
              <label htmlFor="nav-trigger">Menu</label>
              <FontAwesomeIcon icon="bars" aria-hidden={true} title="Menu Trigger" />
              <span className="sr-only">Menu Trigger</span>
            </button>
          </div>
          <div
            className="flex-col flex-col--6 flex-col--tablet-large--12 header__navigation tablet--large-hide"
            role="navigation"
          >
            <nav className="nav nav--primary" role="menubar" aria-label="Primary Navigation">
              <RouterLink
                exact={true}
                to="/"
                className="link link__inline link--large link__header"
                activeClassName={cx({ 'nav--active': !isMobile })}
              >
                Home
              </RouterLink>
              <RouterLink
                to="/about"
                exact={true}
                className="link link__inline link--large link__header"
                activeClassName={cx({ 'nav--active': !isMobile })}
              >
                About
              </RouterLink>
              <RouterLink
                to="/contact"
                className="link link__inline link--large link__header"
                activeClassName={cx({ 'nav--active': !isMobile })}
              >
                Contact
              </RouterLink>
              <RouterLink
                to="/get-involved"
                className="link link__inline link--large link__header"
                activeClassName={cx({ 'nav--active': !isMobile })}
              >
                Get Involved
              </RouterLink>

              {isMobile && (
                <Fragment>
                  <Button text="Translate" size="small" burgerMenu={true} icon="language" />
                  <Button text="Give feedback" size="small" burgerMenu={true} icon="comment" />
                  <RouterLink to="/favourites">
                    <Button text="View favourites" size="small" burgerMenu={true} icon="star" />
                  </RouterLink>
                </Fragment>
              )}
            </nav>
            <div className="tablet--large-hide mobile-show">
              <Footer mobileMenu={true} />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
