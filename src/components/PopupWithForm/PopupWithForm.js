import React from "react";
import { Link, useHistory } from "react-router-dom";
function PopupWithForm({
  name,
  title,
  close,
  isOpen,
  children,
  onSubmit,
  btnText,
  linkText,
  onClick
}) {
  const history = useHistory();
  return (
    <section className={isOpen ? "popup popup_active" : "popup "}>
      <form
        method="GET"
        action="#"
        name={name}
        className={`popup__form popup__form_${name}`}
        onSubmit={onSubmit}
      >
        <h3 className="popup__title">{title}</h3>
        <label className="popup__input-wrapper">
          <span className="popup__input-name">Email</span>
          <input
            className="popup__input popup__input_name "
            type="email"
            autocomplete="on"
            minLength="8"
            maxLength="40"
            required
          />
          <span className="popup__error" id="name-error"></span>
        </label>
        <label className="popup__input-wrapper">
          <span className="popup__input-name">Password</span>
          <input
            className="popup__input popup__input_activiti"
            id="activiti"
            name="about"
            tabIndex="2"
            type="password"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__error" id="activiti-error"></span>
        </label>
        <button className="popup__toggle" type="button" onClick={close} />

        {children}
        <button type="submit" className="popup__button">
          {btnText}
        </button>
        <div className="popup__auth-box">
        <p className="popup__auth-text">или</p>
        <Link className="popup__auth-link" onClick={onClick} >
          {linkText}
        </Link>
      </div>
      </form>
    </section>
  );
}
export default PopupWithForm;
