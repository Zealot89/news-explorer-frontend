//import Logo from '../images/logo.svg';
import React from "react";
import "./App.css";
import Header from "../Header/Header.js";
import SearchForm from "../SearchForm/SearchForm.js";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.js";
import SavedNews from "../SavedNews/SavedNews.js";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import PopupRegister from "../PopupRegister/PopupRegister";
import CurrentUserContext from "../../context/CurrentUserContext.js";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
//import SearchForm from './SearchForm.js'

function App() {
  //
  const [isPopupWithForm, setIsPopupWithForm] = React.useState(false);
  const [isPopupRegister, setIsPopupRegister] = React.useState(false);
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  //
  function handleNavOpen(){
    setIsNavOpen(!isNavOpen);
  }
  function handleNavClosed(){
    setIsNavOpen(false);
  }
  function handleAddPlaceClick() {
    closeAllPopups();
    handleNavClosed();
    setIsPopupWithForm(true);

  }

  function closeAllPopups() {
    setIsPopupWithForm(false);
    setIsPopupRegister(false);
  }

  function OpenRegPopup(){
    closeAllPopups();
    setIsPopupRegister(true);
  }
  React.useEffect(() => {
    function handleEsc(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isPopupWithForm, isPopupRegister]);

  React.useEffect(() => {
    function handleOverlayClick(evt) {
      if (evt.target.classList.contains("popup")) {
        closeAllPopups();
      }
    }

    document.addEventListener("click", handleOverlayClick);

    return () => {
      document.removeEventListener("click", handleOverlayClick);
    };
  }, [isPopupWithForm, isPopupRegister]);

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header openPopup={handleAddPlaceClick} openNav={handleNavOpen} isOpen={isNavOpen} />
          <Main />
        </Route>
        <Route path="/saved-news">
          <SavedNewsHeader openPopup={handleAddPlaceClick} openNav={handleNavOpen} isOpen={isNavOpen} />
          <SavedNews/>
        </Route>
      </Switch>
      <Footer />

      <PopupRegister  onClick={handleAddPlaceClick} isOpen={isPopupRegister} onClose={closeAllPopups} />


  <PopupWithForm
        close={closeAllPopups}
        isOpen={isPopupWithForm}
        onClick={OpenRegPopup}
        name="delete"
        title="Вход"
        btnText="Войти"
        linkText="Зарегистрироваться"
      />

      
    </div>
  );
}

export default App;
