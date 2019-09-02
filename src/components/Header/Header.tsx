import React from 'react';
import ReactSVG from 'react-svg';
import Logo from '../../assets/logo/logo.svg';
import Button from '../Button';
import './Header.scss';

const Header: React.FunctionComponent = () => (
  <header>
    <nav className="header__button-nav">
      <Button text="Translate" header={true} icon="language" />
      <Button text="Give Feedback" header={true} icon="comment" />
      <Button text="Favourites" header={true} icon="star" />
    </nav>
    <ReactSVG src={Logo} />
  </header>
);

export default Header;
