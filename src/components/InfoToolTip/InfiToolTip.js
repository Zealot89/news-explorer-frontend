import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import { Link } from "react-router-dom";

function InfoToolTip({ close, isOpen, name, title, linkText, onClick }) {
  return (
    <PopupWithForm close={close} name={name} isOpen={isOpen}>
      <h2 className="popup__title">{title}</h2>
      <Link to="" className="popup__auth-link popup__tooltip" onClick={onClick}>
        {linkText}
      </Link>
    </PopupWithForm>
  );
}
export default InfoToolTip;
