import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import logo from '../../images/prosept-logo.svg';

import DropdownMenu from '../DropdownMenu/DropdownMenu';

function Header() {

  return (
    <header className="header">
      <div className="header__container">
        <Link className="header__link" to='/'>
          <img className="header__logo" src={logo} alt='Изображение логотипа' />
        </Link>
        <DropdownMenu />
      </div>
    </header>
  )
};

export default Header;
