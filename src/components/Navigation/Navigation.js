import React from "react";
import { Link, useLocation } from "react-router-dom";
import logoutWhite from "../../images/LogoutWhite.png";
import logoutBlack from "../../images/logoutBlack.png";
import CurrentUserContext from "../../context/CurrentUserContext";
function Navigation({ openPopup, isOpen, loggedIn, signOut }) {
  const { pathname } = useLocation();
  const currentUser = React.useContext(CurrentUserContext);
  const LogoutImage = `${
    pathname === "/saved-news" ? logoutBlack : logoutWhite
  }`;

  const colorClass = `${
    pathname === "/saved-news"
      ? "navigation__button_black"
      : "navigation__button_white"
  }`;

  const colorBorderClass = `${
    pathname === "/saved-news" ? "navigation__border_black-border" : ""
  }`;
  const afterColorClass = `${
    pathname === "/saved-news" ? "header__nav-element_black" : ""
  }`;
  const afterMainInvisibleClass = `${
    pathname === "/saved-news" ? "header__nav-element_invisible" : ""
  }`;
  const afterArticlesInvisibleClass = `${
    pathname === "/saved-news" ? "" : "header__nav-element_invisible"
  }`;
  const backClass = `${pathname === "/saved-news" ? "navigation_white" : ""}`;
  return (
    <nav
      className={
        isOpen ? `navigation navigation__visible ${backClass}` : `navigation `
      }
    >
      <ul className="header__nav">
        <li>
          <Link
            className={`header__nav-element ${colorClass} ${afterColorClass} ${afterMainInvisibleClass}`}
            to="/"
          >
            Главная
          </Link>
        </li>
        {loggedIn ? (
          <li>
            <Link
              className={`header__nav-element ${colorClass} ${afterColorClass} ${afterArticlesInvisibleClass}`}
              to="/saved-news"
            >
              Сохраненные статьи
            </Link>
          </li>
        ) : (
          <></>
        )}
      </ul>
      <button
        className={`header__button ${colorClass} ${colorBorderClass}`}
        onClick={loggedIn ? signOut : openPopup}
      >
        {loggedIn ? currentUser : "Авторизоваться"}
        {loggedIn ? (
          <img className="header__button_image" src={LogoutImage} alt=""></img>
        ) : (
          <></>
        )}
      </button>
    </nav>
  );
}
export default Navigation;
