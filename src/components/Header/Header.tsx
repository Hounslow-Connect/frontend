import React, { Component, Fragment } from 'react';
import ReactSVG from 'react-svg';
import { observer, inject } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';

import './Header.scss';

import CranberryTreeSmall from '../../assets/images/trees/cranberry-small.svg';
import PeurtoTreeSmall from '../../assets/images/trees/peurto-small.svg';
import Logo from '../../assets/logo/logo.svg';
import MobileLogo from '../../assets/logo/logo-mobile.svg';

import Link from '../Link';
import Button from '../Button';
import BurgerMenu from '../BurgerMenu';
import WindowSizeStore from '../../stores/windowSizeStore';
import UIStore from '../../stores/uiStore';

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
    const { burgerMenuOpen, toggleBurgerMenu } = uiStore;

    return (
      <header
        className={cx('header', {
          'header--sticky': burgerMenuOpen && isMobile,
        })}
      >
        <Fragment>
          <div className={cx(isMobile ? 'flex' : 'column')}>
            {!isMobile && (
              <div className="header__top-bar">
                <Button text="Translate" header={true} icon="language" />
                <Button text="Give Feedback" header={true} icon="comment" />
                <Button text="Favourites" header={true} icon="star" />
              </div>
            )}
            <div className="header__inner-container">
              <ReactSVG
                src={isMobile ? MobileLogo : Logo}
                className={cx('header__logo', {
                  'header__logo--expanded': isMobile && burgerMenuOpen,
                })}
              />
              {!isMobile && (
                <nav className="header__desktop-nav">
                  <Link text="Home" href="#" size="large" header={true} />
                  <Link text="About" href="#" size="large" header={true} />
                  <Link text="Contact Us" href="#" size="large" header={true} />
                  <Link text="Get Involved" href="#" size="large" header={true} />
                </nav>
              )}
              {isMobile && !burgerMenuOpen && (
                <button
                  className="header__mobile-menu-open"
                  aria-label="Open menu"
                  onClick={() => toggleBurgerMenu()}
                >
                  <span>Menu</span>
                  <FontAwesomeIcon icon="bars" aria-hidden={true} title="Menu Trigger" />
                  <span className="sr-only">Menu Trigger</span>
                </button>
              )}
            </div>
          </div>

          {isMobile && burgerMenuOpen && (
            <div className="header__mobile-menu-close flex">
              <button aria-label="Close menu" onClick={() => toggleBurgerMenu()}>
                Close
                <FontAwesomeIcon icon="times" aria-hidden={true} title="Menu Close" />
              </button>
            </div>
          )}
          {isMobile && burgerMenuOpen && (
            <div className="flex header__tree">
              <ReactSVG src={CranberryTreeSmall} />
              <ReactSVG src={PeurtoTreeSmall} />
            </div>
          )}
        </Fragment>
        {burgerMenuOpen && <BurgerMenu />}
      </header>
    );
  }
}

export default Header;
