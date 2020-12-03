import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
function PopupRegister({ isOpen, onClose, onClick}){
    return(
        <PopupWithForm 
        title="Регистрация"
            btnText="Зарегистрироваться"
            linkText="Войти"
        isOpen={isOpen}
        onClick={onClick}
        close={onClose}>
           <label className="popup__input-wrapper">
          <span className="popup__input-name">Name</span>
          <input
            className="popup__input popup__input_name "
            type="name"
            autocomplete="on"
            minLength="4"
            maxLength="40"
            required
          />
          <span className="popup__error" id="name-error"></span>
        </label>  
        </PopupWithForm>
    )
}
export default PopupRegister;