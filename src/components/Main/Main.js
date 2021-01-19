import React from "react";
import SearchForm from "../SearchForm/SearchForm.js";
import About from "../About/About.js";
import Preloader from "../Preloader/Preloader";
import NotFound from "../NotFound/NotFound";
import NewsCardList from "../NewsCardList/NewsCardList";
function Main({
  onSearchArticles,
  articles,
  handleShowMore,
  isShowMoreBtn,
  isLoading,
  isLoaded,
  isNotFound,
  AddAndRemove,
  loggedIn,
  savedArticles,
  openPopup,
}) {
  return (
    <main>
      <SearchForm onSearchArticles={onSearchArticles} />
      {isLoading && <Preloader />}
      {isLoaded && (
        <NewsCardList
          loggedIn={loggedIn}
          AddAndRemove={AddAndRemove}
          articles={articles}
          handleShowMore={handleShowMore}
          isShowMoreBtn={isShowMoreBtn}
          savedArticles={savedArticles}
          openPopup={openPopup}
        />
      )}
      {isNotFound && <NotFound />}
      <About />
    </main>
  );
}
export default Main;
