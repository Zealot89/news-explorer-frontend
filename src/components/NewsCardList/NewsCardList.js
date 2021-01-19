import React from "react";
import NewsCard from "../NewsCard/NewsCard.js";
import { useLocation } from "react-router-dom";

function NewsCardList({
  articles,
  handleShowMore,
  isShowMoreBtn,
  AddAndRemove,
  loggedIn,
  savedArticles,
  openPopup,
}) {
  const { pathname } = useLocation();

  const invisibleClass = `${
    pathname === "/saved-news" ? "newsCardList__invisible" : ""
  }`;
  const showMoreInvisibleClass = `${
    isShowMoreBtn === false ? "newsCardList__invisible" : ""
  }`;

  return (
    <section className="newsCardList">
      <h2 className={`newsCardList__title ${invisibleClass}`}>
        Результаты поиска
      </h2>
      {pathname === "/" && (
        <ul className="newsCardList__list">
          {articles.map(({ ...props }, index) => (
            <NewsCard
              {...props}
              key={index.toString()}
              AddAndRemove={AddAndRemove}
              loggedIn={loggedIn}
              savedArticles={savedArticles}
              openPopup={openPopup}
            />
          ))}
        </ul>
      )}
      {pathname === "/saved-news" && (
        <ul className="newsCardList__list">
          {articles.map(({ ...props }, index) => (
            <NewsCard
              {...props}
              key={index.toString()}
              AddAndRemove={AddAndRemove}
              loggedIn={loggedIn}
              title={props.title}
              description={props.description}
              url={props.link}
              urlToImage={props.image}
              publishedAt={props.date}
              source={props.souce}
              keyword={props.keyword}
            />
          ))}
        </ul>
      )}
      <button
        className={`newsCardList__button ${invisibleClass} ${showMoreInvisibleClass}`}
        onClick={handleShowMore}
      >
        Показать еще{" "}
      </button>
    </section>
  );
}
export default NewsCardList;
