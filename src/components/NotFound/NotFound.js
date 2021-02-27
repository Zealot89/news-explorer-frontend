import React from "react";
import img from "../../images/not-found_v1.png";
function NotFound() {
  return (
    <section className="notFound">
      <img
        className="notFound__img"
        src={img}
        alt="Грустная лупа"
      ></img>
      <h2 className="notFound__itle">Ничего не найдено</h2>
      <p className="notFound__text">
        К сожалению по вашему запросу ничего не найдено.
      </p>
    </section>
  );
}
export default NotFound;
