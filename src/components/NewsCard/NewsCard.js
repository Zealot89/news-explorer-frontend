import React from "react";
import {  useLocation } from 'react-router-dom';
function NewsCard() {
    const { pathname } = useLocation();

    const invisibleClass = `${
      pathname === '/saved-news'
        ? ''
        : 'newsCardList__invisible'
    }`;
    const trashClass = `${
        pathname === '/saved-news'
          ? 'newsCard__button_trash'
          : ''
      }`;
  return (
    <li className="newsCard elements__element_add">
      <p className={`newsCard__tag ${invisibleClass}`}>Тайга</p>
        <div className="newsCard__button-container">
        <p className="newsCard__button-message">Войдите, чтобы сохранять статьи</p>
      <button className={`newsCard__button ${trashClass}`} type="button"></button>
      </div>
      <img
        className="newsCard__image"
        src="https://i.pinimg.com/736x/1e/d5/e8/1ed5e8cbb27247a4fc0ed376c965c109.jpg"
        alt="иллюстрация"
        
      />
      <div className="newsCard__text-container">
        <p className="newsCard__date">2 августа, 2019</p>
        <h2 className="newsCard__title elements__title_add">
          Национальное достояние – парки
        </h2>
        <p className="newsCard__subtitle">
          В 2016 году Америка отмечала важный юбилей: сто лет назад здесь начала
          складываться система национальных парков – охраняемых территорий, где
          и сегодня каждый может приобщиться к природе.
        </p>
        <p className="newsCard__source">Лента.ру</p>
      </div>
    </li>
  ); 
}
export default NewsCard;
