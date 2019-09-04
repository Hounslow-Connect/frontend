import React from 'react';
import Link from '../Link';
import Button from '../Button';

import './BurgerMenu.scss';

const BurgerMenu = () => (
  <nav className="header_burger-menu">
    <Link text="Home" href="#" size="large" />
    <Link text="About" href="#" size="large" />
    <Link text="Contact Us" href="#" size="large" />
    <Link text="Get Involved" href="#" size="large" />
    <Button text="Translate" size="small" burgerMenu={true} icon="language" />
    <Button text="Give feedback" size="small" burgerMenu={true} icon="comment" />
    <Button text="View favourites" size="small" burgerMenu={true} icon="star" />
  </nav>
);

export default BurgerMenu;
