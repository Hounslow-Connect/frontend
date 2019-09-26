import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import { observer, inject } from 'mobx-react';
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
  render() {
    const { windowSizeStore, uiStore } = this.props;

    // injected stores must be typed as optional, but will always be there if injected. Allows workound for destructuring values from store
    if (!windowSizeStore || !uiStore) {
      return null;
    }

    const { isMobile } = windowSizeStore;
    const { burgerMenuOpen, toggleBurgerMenu, toggleFeedbackModal } = uiStore;

    return (
      <header
        className={cx('header', {
          active: burgerMenuOpen,
        })}
      >
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
        <div className="flex-container flex-container--align-center flex-container--justify header__container">
          <div
            className={cx('flex-col flex-col--6 flex-col--tablet-large--12 header__brand', {
              'header__brand--active': burgerMenuOpen,
            })}
          >
            <figure className="logo">
              <RouterLink to="/" aria-label="Home Link">
                <ReactSVG src={isMobile ? MobileLogo : Logo} />
              </RouterLink>
            </figure>

            <button
              name="nav-trigger"
              className="nav-trigger tablet--large-show"
              onClick={() => toggleBurgerMenu()}
            >
              <label htmlFor="nav-trigger"></label>
              <i className="bars fa fa-bars" aria-hidden title="Menu Trigger"></i>
              <span className="sr-only">Menu Trigger</span>
            </button>
          </div>

          <div
            className={cx('flex-container header__content', {
              'header__content--active': burgerMenuOpen,
            })}
          >
            <div
              className="flex-col flex-col--12 flex-col--tablet-large--12 header__navigation tablet--large-hide"
              role="navigation"
            >
              <nav className="nav nav--primary" role="menubar" aria-label="Primary Navigation">
                <RouterLink
                  exact={true}
                  to="/"
                  className="link link__inline link--large link__header"
                  activeClassName={cx({ 'nav--active': !isMobile })}
                  onClick={() => toggleBurgerMenu()}
                >
                  Home
                </RouterLink>
                <RouterLink
                  to="/about"
                  exact={true}
                  className="link link__inline link--large link__header"
                  activeClassName={cx({ 'nav--active': !isMobile })}
                  onClick={() => toggleBurgerMenu()}
                >
                  About
                </RouterLink>
                <RouterLink
                  to="/contact"
                  className="link link__inline link--large link__header"
                  activeClassName={cx({ 'nav--active': !isMobile })}
                  onClick={() => toggleBurgerMenu()}
                >
                  Contact
                </RouterLink>
                <RouterLink
                  to="/get-involved"
                  className="link link__inline link--large link__header"
                  activeClassName={cx({ 'nav--active': !isMobile })}
                  onClick={() => toggleBurgerMenu()}
                >
                  Get Involved
                </RouterLink>

                <div className="mobile-show tablet-show tablet--large-show">
                  <div id="google_translate_element" />

                  <Button
                    text="Give feedback"
                    size="small"
                    burgerMenu={true}
                    icon="comment"
                    onClick={() => {
                      toggleBurgerMenu();
                      toggleFeedbackModal();
                    }}
                  />
                  <RouterLink to="/favourites">
                    <Button text="View favourites" size="small" burgerMenu={true} icon="star" />
                  </RouterLink>
                </div>
              </nav>
            </div>
          </div>
          {burgerMenuOpen && (
            <div className="header__footer">
              <Footer mobileMenu={true} />
            </div>
          )}
        </div>
      </header>
    );
  }
}

export default Header;
