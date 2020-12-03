import React from "react";
import Navigation from "../Navigation/Navigation";
import logo from "../../images/NewsExplorerBlack.png"
import {  useLocation } from 'react-router-dom';
function SavedNewsHeader({openPopup, openNav, isOpen}) {
    const { pathname } = useLocation();
    const colorClass = `${
        pathname === '/saved-news'
          ? 'navigation__burger_black'
          : ''
      }`;
  return (
      <>
    <header className="savedNewsHeader">
    <img className="header__logo" src={logo} alt="" />
    <Navigation openPopup={openPopup}  isOpen={isOpen}/>
    <button className={isOpen ? `navigation__burger ${colorClass} navigation__burger_transform` : `navigation__burger ${colorClass}`} onClick={openNav}></button>
</header>
<div className="savedNewsHeader__container">
    <p className="savedNewsHeader__text">Сохранённые статьи</p>
    <h2 className="savedNewsHeader__title">Грета, у вас 5 сохранённых статей</h2>
    <p className="savedNewsHeader__subtitle">По ключевым словам: Природа, Тайга и 2-м другим</p>
</div>
</>
  );
}
export default SavedNewsHeader;