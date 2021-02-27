import React from "react";
import avatar from "../../images/image-03.jpg";
function About() {
  return (
    <section className="about">
      <img className="about__avatar" src={avatar} alt="аватарка"></img>
      <div className="about__container">
        <h2 className="about__title">Об авторе</h2>
        <p className="about__subtitle">
          Это блок с описанием автора проекта. Здесь следует указать, как вас
          зовут, чем вы занимаетесь, какими технологиями разработки владеете.
          <br></br><br></br>Также можно рассказать о процессе обучения в Практикуме, чему
          вы тут научились, и чем можете помочь потенциальным заказчикам.
        </p>
      </div>
    </section>
  );
}
export default About;
