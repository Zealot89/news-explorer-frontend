import React from "react";
import { useLocation } from "react-router-dom";
function NewsCard({
  text,
  title,
  description,
  url,
  urlToImage,
  publishedAt,
  source,
  savedArticles,
  keyword,
  loggedIn,
  AddAndRemove,
  openPopup,
}) {
  const { pathname } = useLocation();

  const noted =
    pathname === "/" &&
    loggedIn &&
    savedArticles.some(
      (item) => item.title === title && item.date === publishedAt
    );

  const [authWarningTip, setAuthWarningTip] = React.useState(false);
  const article = {
    title: title,
    description: description,
    url: url,
    urlToImage: urlToImage,
    publishedAt: publishedAt,
    source: source,
    keyword: keyword,
    text: text,
  };

  const handleAddAndRemove = () => {
    AddAndRemove(article);
  };
  //
  const handleOnMouse = () => {
    setAuthWarningTip(!authWarningTip);
  };
  const notedClass = `${
    pathname === "/" && loggedIn && noted ? "newsCard__button_noted" : " "
  }`;

  const invisibleClass = `${
    pathname === "/saved-news" ? "" : "newsCardList__invisible"
  }`;
  const trashClass = `${
    pathname === "/saved-news" ? "newsCard__button_trash" : ""
  }`;
  return (
    <li className="newsCard elements__element_add">
      <p className={`newsCard__tag ${invisibleClass}`}>{keyword}</p>
      <div className="newsCard__button-container">
        <p
          className={`newsCard__button-message ${
            authWarningTip && "newsCard__button-message_visible"
          }`}
        >
          Войдите, чтобы сохранять статьи
        </p>
        <button
          className={`newsCard__button ${trashClass} ${notedClass}`}
          type="button"
          onClick={() => {
            if (loggedIn) {
              handleAddAndRemove();
            } else {
              openPopup();
            }
          }}
          onMouseEnter={() => {
            !loggedIn && handleOnMouse();
          }}
          onMouseLeave={() => {
            !loggedIn && handleOnMouse();
          }}
        ></button>
      </div>
      <img className="newsCard__image" src={urlToImage} alt="иллюстрация" />
      <div className="newsCard__text-container">
        <p className="newsCard__date">
          {new Date(publishedAt).toLocaleString("ru", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <h2 className="newsCard__title elements__title_add">{title}</h2>
        <p className="newsCard__subtitle">
          {pathname === "/" ? description : text}
        </p>
        <p className="newsCard__source">
          {pathname === "/" ? source.name : source}
        </p>
      </div>
    </li>
  );
}
export default NewsCard;
