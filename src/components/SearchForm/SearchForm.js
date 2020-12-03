import React from "react";

//import { Link, useLocation } from "react-router-dom";

function SearchForm() {

return(
   <section className="searchForm">
     <h1 className="searchForm__title">Что творится в мире?</h1>
     <p className="searchForm__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
     <form className="searchForm__form">
         <input className="searchForm__input"></input>
         <button className="searchForm__button">Искать</button>
         </form>  
   </section>)
}
export default SearchForm ;