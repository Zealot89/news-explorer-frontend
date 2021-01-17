import React from "react";
import NewsCardList from "../NewsCardList/NewsCardList";

function SavedNews({ articles, loggedIn, AddAndRemove }) {
  return (
    <NewsCardList
      articles={articles}
      loggedIn={loggedIn}
      AddAndRemove={AddAndRemove}
    />
  );
}
export default SavedNews;
