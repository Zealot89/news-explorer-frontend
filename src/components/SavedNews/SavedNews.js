import React from "react";
import NewsCardList from "../NewsCardList/NewsCardList";

function SavedNews({ articles, loggedIn, AddAndRemove, savedArticles }) {
  return (
    <NewsCardList
      articles={articles}
      loggedIn={loggedIn}
      AddAndRemove={AddAndRemove}
      savedArticles={articles}
    />
  );
}
export default SavedNews;
