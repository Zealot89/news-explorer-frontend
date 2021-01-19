import React from "react";
import Navigation from "../Navigation/Navigation";
import logo from "../../images/NewsExplorerBlack.png";
import { useLocation } from "react-router-dom";
function SavedNewsHeader({
  loggedIn,
  openPopup,
  openNav,
  isOpen,
  username,
  savedArticles,
  signOut,
}) {
  const { pathname } = useLocation();

  const tagsListToShow = () => {
    let showingTagsObj = {};
    const tagsNum = JSON.parse(localStorage.getItem("keywords")).reduce(
      (acc, n) => ((acc[n] = (acc[n] || 0) + 1), acc),
      {}
    );
    const sortedTagsList = Object.keys(tagsNum).sort(
      (a, b) => tagsNum[b] - tagsNum[a]
    );
    const result =
      sortedTagsList.length <= 3
        ? (showingTagsObj = {
            showingTags: sortedTagsList.join(", "),
            numOfAnotherTags: 0,
          })
        : {
            showingTags: sortedTagsList.slice(0, 2).join(", "),
            numOfAnotherTags: sortedTagsList.length - 2,
          };

    return result;
  };

  const tags = tagsListToShow();

  const colorClass = `${
    pathname === "/saved-news" ? "navigation__burger_black" : ""
  }`;

  return (
    <>
      <header className="savedNewsHeader">
        <img className="header__logo" src={logo} alt="" />
        <Navigation
          openPopup={openPopup}
          isOpen={isOpen}
          loggedIn={loggedIn}
          signOut={signOut}
        />
        <button
          className={
            isOpen
              ? `navigation__burger ${colorClass} navigation__burger_transform`
              : `navigation__burger ${colorClass}`
          }
          onClick={openNav}
        ></button>
      </header>
      <div className="savedNewsHeader__container">
        <p className="savedNewsHeader__text">Сохранённые статьи</p>
        <h2 className="savedNewsHeader__title">
          {username}, у вас {savedArticles.length} сохранённых статей
        </h2>
        <p className="savedNewsHeader__subtitle">
          По ключевым словам: {tags.showingTags}{" "}
          {tags.numOfAnotherTags
            ? "и " + tags.numOfAnotherTags + "-м другим"
            : "."}
        </p>
      </div>
    </>
  );
}
export default SavedNewsHeader;
