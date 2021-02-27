import React from "react";
function SearchForm({ onSearchArticles }) {
  const keywordRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onSearchArticles(keywordRef.current.value);
    keywordRef.current.value = "";
  }
  return (
    <section className="searchForm">
      <h1 className="searchForm__title">Что творится в мире?</h1>
      <p className="searchForm__subtitle">
        Находите самые свежие статьи на любую тему и сохраняйте в своём личном
        кабинете.
      </p>
      <form className="searchForm__form" onSubmit={handleSubmit}>
        <input
          className="searchForm__input"
          ref={keywordRef}
          placeholder="Тема новости"
          required
        ></input>
        <button className="searchForm__button" type="submit">
          Искать
        </button>
      </form>
    </section>
  );
}
export default SearchForm;
