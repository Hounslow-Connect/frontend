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
import WindowSizeStore from '../../stores/windowSizeStore';
import UIStore from '../../stores/uiStore';

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
        <div className="flex-col--12 mobile-hide">
          <Button text="Translate" header={true} icon="language" />
          <Button text="Give Feedback" header={true} icon="comment" />
          <Button text="Favourites" header={true} icon="star" />
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
              <a href="/" aria-label="Home Link">
                <ReactSVG src={isMobile ? MobileLogo : Logo} />
              </a>
            </figure>
            <button
              type="button"
              name="nav-trigger"
              className="nav-trigger tablet--large-show"
              role="button"
            >
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
              <Link text="Home" href="#" size="large" header={true} inline={true} />
              <Link text="About" href="#" size="large" header={true} inline={true} />
              <Link text="Contact Us" href="#" size="large" header={true} inline={true} />
              <Link text="Get Involved" href="#" size="large" header={true} inline={true} />

              {isMobile && (
                <Fragment>
                  <Button text="Translate" size="small" burgerMenu={true} icon="language" />
                  <Button text="Give feedback" size="small" burgerMenu={true} icon="comment" />
                  <Button text="View favourites" size="small" burgerMenu={true} icon="star" />
                </Fragment>
              )}
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
