//import Logo from '../images/logo.svg';
import React from "react";
import "./App.css";
import Header from "../Header/Header.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.js";
import SavedNews from "../SavedNews/SavedNews.js";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import InfoToolTip from "../InfoToolTip/InfiToolTip";
import PopupLogin from "../PopupLogin/PopupLogin";
import PopupRegister from "../PopupRegister/PopupRegister";
import CurrentUserContext from "../../context/CurrentUserContext.js";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import MainApi from "../../utils/MainApi/MainApi";
import newsApi from "../../utils/NewsApi/NewsApi";

function App() {
  //
  const [currentUser, setCurrentUser] = React.useState("");
  const [isPopupLogin, setIsPopupLogin] = React.useState(false);
  const [isPopupRegister, setIsPopupRegister] = React.useState(false);
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);
  const [InfoTooltipData, setInfoTooltipData] = React.useState({});
  const [articles, setArticles] = React.useState([]);

  const [keyword, setKeyword] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [isReqErr, setIsReqErr] = React.useState(false);
  const [isShowMoreBtn, setIsShowMoreBtn] = React.useState(true);
  const [articlesRenderCount, setArticlesRenderCount] = React.useState(3);
  const [savedArticles, setSavedArticles] = React.useState([]);

  const history = useHistory();
  const location = useLocation();
  const localArticles = JSON.parse(localStorage.getItem("articles"));

  function handleArticlesSearch(keyword) {
    setIsLoading(true);
    setIsLoaded(false);
    setIsNotFound(false);
    setIsReqErr(false);
    setIsShowMoreBtn(true);
    setArticlesRenderCount(3);

    newsApi
      .get(keyword)
      .then((res) => {
        const articlesWithKeyword = res.articles.map((item) => ({
          ...item,
          keyword,
        }));
        if (res.articles.length === 0) {
          setIsNotFound(true);
        } else {
          setIsLoaded(true);
        }
        if (res.articles.length > 0 && res.articles.length <= 3) {
          setIsShowMoreBtn(false);
        }
        setArticles(articlesWithKeyword.slice(0, 3));
        setKeyword(keywordEdit(keyword));
        localStorage.setItem("articles", JSON.stringify(articlesWithKeyword));
        localStorage.setItem("keywords", JSON.stringify(keywordEdit(keyword)));
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  //
  function handleShowMore() {
    setArticlesRenderCount(articlesRenderCount + 3);
    setArticles(localArticles.slice(0, articlesRenderCount));
    if (localArticles.length <= articlesRenderCount) {
      setIsShowMoreBtn(false);
    }
  }

  //
  function handleNavOpen() {
    setIsNavOpen(!isNavOpen);
  }
  function handleNavClosed() {
    setIsNavOpen(false);
  }

  function openTooltip() {
    setIsInfoTooltip(true);
  }
  function handleAddPlaceClick() {
    closeAllPopups();
    handleNavClosed();
    setIsPopupLogin(true);
  }

  function closeAllPopups() {
    setIsPopupLogin(false);
    setIsPopupRegister(false);
    setIsInfoTooltip(false);
  }

  function OpenRegPopup() {
    closeAllPopups();
    setIsPopupRegister(true);
  }

  //функция регистрации
  function handleReg(email, name, password) {
    MainApi.registration(email, name, password)
      .then(() => {
        setInfoTooltipData({
          text: "Вы успешно зарегистрировались!",
          title: "",
        });
        history.push("/");
      })
      .catch(() => {
        setInfoTooltipData({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          title: "",
        });
      });
    closeAllPopups();
    openTooltip();
  }

  //функция логирования
  function handleLogin(email, password) {
    MainApi.authorization(email, password)
      .then((data) => {
        if (data.token) {
          MainApi.getUser(data.token)
            .then((res) => {
              setCurrentUser(res.name);
              setLoggedIn(true);
            })
            .catch((err) => {
              console.log(err);
            });

          setInfoTooltipData({
            text: "Вы вошли",
            title: "",
          });
          closeAllPopups();
          openTooltip();
          history.push("/");
        } else {
          setInfoTooltipData({
            text: "Что-то пошло не так! Попробуйте ещё раз.",
            title: "Войти",
          });
        }
      })
      .catch((err) => {
        setInfoTooltipData({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          title: "Войти",
        });
        openTooltip();
      });
  }

  function signOut() {
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem("token");
    history.push("/");
  }

  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      MainApi.getUser(token).then((res) => {
        if (res) {
          setCurrentUser(res.name);
          setLoggedIn(true);

          history.push("/");
        } else {
          console.log(res);
          setInfoTooltipData({
            message: "Что-то пошло не так! Попробуйте ещё раз.",
            title: "Молодцом!",
          });
          openTooltip();
        }
      });
    }
  }

  //Загрузка последних найденных новостей при загрузке страницы
  React.useEffect(() => {
    if (JSON.parse(localStorage.getItem("articles"))) {
      setIsLoaded(true);
      setArticles(JSON.parse(localStorage.getItem("articles")).slice(0, 3));

      setKeyword(JSON.parse(localStorage.getItem("keywords")));
    } else localStorage.removeItem("articles");
  }, []);

  React.useEffect(() => {
    checkToken();
  }, []);

  //Авторизация при загрузке страницы
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      MainApi.getUser(token)
        .then((res) => {
          if (!res) {
            return Promise.reject("Unauthorized");
          } else {
            setLoggedIn(true);
            setCurrentUser(res.name.toString());

            location.pathname === "/saved-news"
              ? history.push("/saved-news")
              : history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
          location.pathname === "/saved-news" &&
            openTooltip() &&
            history.push("/");
        });
    }
  }, []);

  //Сохранение и удаление карточки
  const articleAddAndRemove = (article) => {
    const token = localStorage.getItem("token");
    const artReq = {
      keyword: article.keyword,
      title: article.title,
      text: article.description,
      date: article.publishedAt,
      source: article.source,
      link: article.url,
      image: article.urlToImage,
    };

    const addedArticle = savedArticles.find(
      (item) => item.date === artReq.date && item.link === artReq.link
    );

    if (!addedArticle) {
      MainApi.createArticle(artReq, token)
        .then((res) => {
          setSavedArticles([...savedArticles, res]);
          console.log(res);
        })
        .catch((err) => console.log(err));
    } else {
      console.log(addedArticle._id);
      MainApi.deleteArticle(addedArticle._id, token)
        .then(() =>
          setSavedArticles(
            savedArticles.filter(
              (articles) => articles._id !== addedArticle._id
            )
          )
        )
        .catch((err) => console.log(err));
    }
  };

  //Приведение к общему виду темы поиска для отображения в тегах
  const keywordEdit = (word) => {
    let newWord = "";
    for (let i = 0; i < word.length; i++) {
      newWord += !i || word[i - 1] === " " ? word[i].toUpperCase() : word[i];
    }
    return newWord.replace(/ /gi, "");
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    MainApi.getArticles(token)
      .then((articles) => {
        setSavedArticles(articles.articles);
      })

      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен:", err);
      });
  }, []);

  //Запись тегов в локальное хранилище
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    loggedIn &&
      MainApi.getArticles(token).then((res) => {
        if (res) {
          const savedKeywords = savedArticles.map((item) =>
            keywordEdit(item.keyword)
          );
          localStorage.setItem("keywords", JSON.stringify(savedKeywords));
        }
      });
  }, [savedArticles]);

  //функция закрытия попапа кликом на оверлей
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
  }, [isPopupLogin, isPopupRegister]);

  //функция закрытия попапа клавишей Esc
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
  }, [isPopupLogin, isPopupRegister]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Header
              openPopup={handleAddPlaceClick}
              openNav={handleNavOpen}
              isOpen={isNavOpen}
              loggedIn={loggedIn}
              signOut={signOut}
            />
            <Main
              loggedIn={loggedIn}
              AddAndRemove={articleAddAndRemove}
              isLoading={isLoading}
              isLoaded={isLoaded}
              isNotFound={isNotFound}
              isReqErr={isReqErr}
              isShowMoreBtn={isShowMoreBtn}
              onSearchArticles={handleArticlesSearch}
              articles={articles}
              handleShowMore={handleShowMore}
              savedArticles={savedArticles}
              openPopup={handleAddPlaceClick}
            />
          </Route>

          <ProtectedRoute
            path="/saved-news"
            firstComponent={SavedNewsHeader}
            secondComponent={SavedNews}
            loggedIn={loggedIn}
            username={currentUser}
            savedArticles={savedArticles}
            openPopup={handleAddPlaceClick}
            openNav={handleNavOpen}
            isOpen={isNavOpen}
            articles={savedArticles}
            AddAndRemove={articleAddAndRemove}
            signOut={signOut}
          />
        </Switch>
        <Footer />

        <PopupRegister
          handleReg={handleReg}
          onClick={handleAddPlaceClick}
          isOpen={isPopupRegister}
          onClose={closeAllPopups}
          name="delete"
          title="Регистрация"
          btnText="Зарегистрироваться"
          linkText="Войти"
        />

        <PopupLogin
          handleLogin={handleLogin}
          close={closeAllPopups}
          isOpen={isPopupLogin}
          onClick={OpenRegPopup}
          name="delete"
          title="Вход"
          btnText="Войти"
          linkText="Зарегистрироваться"
        />
        <InfoToolTip
          name="delete"
          close={closeAllPopups}
          isOpen={isInfoTooltip}
          title={InfoTooltipData.text}
          linkText="Войти"
          onClick={handleAddPlaceClick}
          loggedIn={loggedIn}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
