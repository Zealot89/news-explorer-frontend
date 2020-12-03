import React from "react";
import image from "../../images/Ellipse.png";
function Preloader() {
  return (
    <section className="preloader">
      <div className="preloader__container">
        <img className="preloader__image" src={image} alt="Загрузочка..."></img>
        <p className="preloader__text">Идет поиск новостей...</p>
      </div>
    </section>
  );
}
export default Preloader;
