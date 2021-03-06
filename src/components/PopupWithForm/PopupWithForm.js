import React from "react";

function PopupWithForm({ name, close, isOpen, children, onSubmit }) {
  return (
    <section className={isOpen ? "popup popup_active" : "popup "}>
      <form
        method="GET"
        action="#"
        name={name}
        className={`popup__form popup__form_${name}`}
        onSubmit={onSubmit}
      >
        <button className="popup__toggle" type="button" onClick={close} />

        {children}
      </form>
    </section>
  );
}
export default PopupWithForm;
