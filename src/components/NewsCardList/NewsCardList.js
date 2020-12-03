import React from "react";
import NewsCard from "../NewsCard/NewsCard.js";
import {  useLocation } from 'react-router-dom';


function NewsCardList() {
    const { pathname } = useLocation();

  const invisibleClass = `${
    pathname === '/saved-news'
      ? 'newsCardList__invisible'
      : ''
  }`;

return(
    <section className="newsCardList">
    <h2 className={`newsCardList__title ${invisibleClass}`}>Результаты поиска</h2>
    <ul className="newsCardList__list">
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
    </ul>
    <button className={`newsCardList__button ${invisibleClass}`}>Показать еще  </button>
</section>
)

}
export default NewsCardList;