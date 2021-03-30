import React, { Component } from 'react';
// import ReactSVG from 'react-svg';
import { observer, inject } from 'mobx-react';
import cx from 'classnames';
import { NavLink as RouterLink, withRouter, RouteComponentProps } from 'react-router-dom';

import './Header.scss';

import Logo from '../../assets/logo/logo.svg';

import Button from '../Button';
import WindowSizeStore from '../../stores/windowSizeStore';
import UIStore from '../../stores/uiStore';
import Footer from '../Footer/Footer';

interface IProps extends RouteComponentProps {
  windowSizeStore?: WindowSizeStore;
  uiStore?: UIStore;
}

@inject('windowSizeStore', 'uiStore')
@observer
class Header extends Component<IProps> {
  render() {
    const { windowSizeStore, uiStore, location } = this.props;

    // injected stores must be typed as optional, but will always be there if injected. Allows workound for destructuring values from store
    if (!windowSizeStore || !uiStore) {
      return null;
    }

    const { isMobile } = windowSizeStore;
    const { burgerMenuOpen, toggleBurgerMenu, toggleFeedbackModal, keywordEditOpen } = uiStore;

    return (
      <header
        className={cx('header', {
          active: burgerMenuOpen,
          'header--grey': location.pathname.includes('/referral'),
        })}
      >
        <div
          className={cx('flex-col--12', {
            'mobile-hide tablet--large-hide medium-hide': burgerMenuOpen || keywordEditOpen,
          })}
        >
          <div
            className={cx('header--top-row header__actions', {
              'header--top-row--iceberg':
                location.pathname === '/' || location.pathname.includes('/favourites'),
            })}
          >
            <div className="flex-container flex-container--no-wrap flex-container--right">
              <div className="flex-col header--top-row--button-box">
                <div id="google_translate_element" />
              </div>
              <div className="flex-col mobile-hide tablet--large-hide medium-hide">
                <Button
                  text="Give Feedback"
                  header={true}
                  icon="comment"
                  onClick={() => uiStore.toggleFeedbackModal()}
                />
              </div>
              <div className="flex-col header--top-row--favourite header--top-row--button-box">
                <RouterLink to="/favourites">
                  <Button text="Favourites" header={true} icon="star" />
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-container flex-container--align-center flex-container--justify header__container">
          <div
            className={cx('flex-col flex-col--6 flex-col--tablet-large--12 header__brand', {
              'header__brand--active': burgerMenuOpen,
              'header__brand--sticky': uiStore.keywordEditOpen,
            })}
          >
            <figure className="logo">
              <RouterLink to="/" aria-label="Home Link">
                <img src={Logo} alt="Hounslow Connect" />
              </RouterLink>
            </figure>

            <button
              name="nav-trigger"
              className={cx('nav-trigger tablet--large-show medium-show', {
                active: burgerMenuOpen,
              })}
              onClick={() => toggleBurgerMenu()}
            >
              <span className="nav-trigger--button" />
              <i className="bars fa fa-bars" aria-hidden={true} title="Menu Trigger" />
              <span className="sr-only">Menu Trigger</span>
            </button>
          </div>

          <div className="flex-col flex-col--6 flex-col--tablet-large--12 flex-col--tablet--12 flex-col--medium--6">
            <div
              className={cx('flex-container header__content', {
                'header__content--active': burgerMenuOpen,
              })}
            >
              <div
                className="flex-col flex-col--12 flex-col--tablet-large--12 header__navigation tablet--large-hide medium-hide"
                role="navigation"
              >
                <nav className="nav nav--primary" role="navigation" aria-label="Primary Navigation">
                  <RouterLink
                    exact={true}
                    to="/"
                    className="link link__inline link--large link__header"
                    activeClassName={cx({ 'link__header--active': !isMobile })}
                    onClick={() => {
                      if (burgerMenuOpen) {
                        toggleBurgerMenu();
                      }
                    }}
                  >
                    Home
                  </RouterLink>
                  <RouterLink
                    to="/about"
                    exact={true}
                    className="link link__inline link--large link__header"
                    activeClassName={cx({ 'link__header--active': !isMobile })}
                    onClick={() => {
                      if (burgerMenuOpen) {
                        toggleBurgerMenu();
                      }
                    }}
                  >
                    About
                  </RouterLink>
                  <RouterLink
                    to="/contact"
                    className="link link__inline link--large link__header"
                    activeClassName={cx({ 'link__header--active': !isMobile })}
                    onClick={() => {
                      if (burgerMenuOpen) {
                        toggleBurgerMenu();
                      }
                    }}
                  >
                    Contact
                  </RouterLink>
                  <RouterLink
                    to="/get-involved"
                    className="link link__inline link--large link__header"
                    activeClassName={cx({ 'link__header--active': !isMobile })}
                    onClick={() => {
                      if (burgerMenuOpen) {
                        toggleBurgerMenu();
                      }
                    }}
                  >
                    Get Involved
                  </RouterLink>

                  <div className="mobile-show tablet-show tablet--large-show medium-show">
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

export default withRouter(Header);
