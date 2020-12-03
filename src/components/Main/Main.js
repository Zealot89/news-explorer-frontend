import React from 'react';
import Header from "../Header/Header.js";
import SearchForm from "../SearchForm/SearchForm.js";
import About from "../About/About.js";
import Preloader from "../Preloader/Preloader";
import NotFound from "../NotFound/NotFound";
import NewsCardList from '../NewsCardList/NewsCardList';
function Main(){
    return(
        <main>
        <SearchForm />
     <NewsCardList/>
      
      <About />
      </main>
    )
}
export default Main;