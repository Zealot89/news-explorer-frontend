import React from "react";
import { Link, useLocation } from 'react-router-dom';
function Navigation({openPopup,isOpen}) {
  const { pathname } = useLocation();

  const colorClass = `${
    pathname === '/saved-news'
      ? 'navigation__button_black'
      : 'navigation__button_white'
  }`;
  const colorBorderClass = `${
    pathname === '/saved-news'
      ? 'navigation__border_black-border'
      : ''
  }`;
  const afterColorClass = `${
    pathname === '/saved-news'
      ? 'header__nav-element_black'
      : ''
  }`;
  const afterMainInvisibleClass = `${
    pathname === '/saved-news'
      ? 'header__nav-element_invisible'
      : ''
  }`;
  const afterArticlesInvisibleClass = `${
    pathname === '/saved-news'
      ? ''
      : 'header__nav-element_invisible'
  }`;
  const backClass = `${
    pathname === '/saved-news'
      ? 'navigation_white'
      : ''
  }`;
  return (
    <nav className={ isOpen ? `navigation navigation__visible ${backClass}` : `navigation `}>
      <ul className="header__nav">
        <li><Link className={`header__nav-element ${colorClass} ${afterColorClass} ${afterMainInvisibleClass}`} to="/">Главная</Link></li>
        <li><Link className={`header__nav-element ${colorClass} ${afterColorClass} ${afterArticlesInvisibleClass}`} to="/saved-news">Сохраненные статьи</Link></li>
      </ul>
      <button className={`header__button ${colorClass} ${colorBorderClass}`} onClick={openPopup} >
        Авторизоваться
      </button>
      
    </nav>
  );
}
export default Navigation;
