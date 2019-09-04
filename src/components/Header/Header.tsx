import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';

import './Header.scss';

import CranberryTreeSmall from '../../assets/images/trees/cranberry-small.svg';
import PeurtoTreeSmall from '../../assets/images/trees/peurto-small.svg';
import Logo from '../../assets/logo/logo.svg';
import MobileLogo from '../../assets/logo/logo-mobile.svg';

import Link from '../Link';
import Button from '../Button';

@inject('windowSizeStore')
@observer
class Header extends Component<any, any, any> {
  constructor(props: any) {
    super(props);
    this.state = { isOpen: false };
  }

  toggleMenu() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const { windowSizeStore } = this.props;
    const { isMobile } = windowSizeStore;
    return (
      <div>
        <header className="header">
          <div className=" flex">
            <ReactSVG
              src={isMobile ? MobileLogo : Logo}
              className={cx('header__logo', {
                'header__logo--expanded': isMobile && this.state.isOpen,
              })}
            />
            {isMobile && !this.state.isOpen && (
              <button
                className="header__mobile-menu-open"
                aria-label="Open menu"
                onClick={() => this.toggleMenu()}
              >
                <span>Menu</span>
                <FontAwesomeIcon icon="bars" aria-hidden={true} title="Menu Trigger" />
                <span className="sr-only">Menu Trigger</span>
              </button>
            )}
          </div>

          {isMobile && this.state.isOpen && (
            <div className="header__mobile-menu-close flex">
              <button aria-label="Close menu" onClick={() => this.toggleMenu()}>
                Close
                <FontAwesomeIcon icon="times" aria-hidden={true} title="Menu Close" />
              </button>
            </div>
          )}
          {isMobile && this.state.isOpen && (
            <div className="flex header__tree">
              <ReactSVG src={CranberryTreeSmall} />
              <ReactSVG src={PeurtoTreeSmall} />
            </div>
          )}
        </header>

        {this.state.isOpen && <Burger />}
      </div>
    );
  }
}

const Burger = () => (
  <div className="header_mobile--active">
    <Link text="Home" href="#" size="large" />
    <Link text="About" href="#" size="large" />
    <Link text="Contact Us" href="#" size="large" />
    <Link text="Get Involved" href="#" size="large" />
    <Button text="Translate" size="small" burgerMenu={true} icon="language" />
    <Button text="Give feedback" size="small" burgerMenu={true} icon="comment" />
    <Button text="View favourites" size="small" burgerMenu={true} icon="star" />
  </div>
);

export default Header;
