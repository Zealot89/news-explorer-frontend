import React from "react";
import logo from "../../images/NewsExplorer.svg";
import Navigation from "../Navigation/Navigation";

function Header({
  openPopup,
  openNav,
  isOpen,
  onSearchArticles,
  loggedIn,
  signOut,
}) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип" />
      <Navigation
        openPopup={openPopup}
        isOpen={isOpen}
        onClick={onSearchArticles}
        loggedIn={loggedIn}
        signOut={signOut}
      />
      <button
        className={
          isOpen
            ? `navigation__burger navigation__burger_transform`
            : `navigation__burger`
        }
        onClick={openNav}
      ></button>
    </header>
  );
}
export default Header;
