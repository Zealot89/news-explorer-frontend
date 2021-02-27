/* eslint-disable default-case */
import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";
import { Link } from "react-router-dom";
function PopupRegister({
  isOpen,
  onClose,
  onClick,
  handleReg,
  btnText,
  linkText,
  title,
}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const [emailDirty, setEmailDirty] = React.useState(false);
  const [passwordDirty, setPasswordDirty] = React.useState(false);
  const [nameDirty, setNameDirty] = React.useState(false);

  const [emailError, setEmailError] = React.useState("Заполните поле Емейл");
  const [passwordError, setPasswordError] = React.useState(
    "Заполните поле Пароль"
  );
  const [nameError, setNameError] = React.useState("Заполните поле Имя");

  const [formValid, setFormValid] = React.useState(false);

  React.useEffect(() => {
    if (emailError || passwordError || nameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError, nameError]);

  function handleBlur(e) {
    switch (e.target.name) {
      case "text":
        setNameDirty(true);

        break;
      case "email":
        setEmailDirty(true);

        break;
      case "password":
        setPasswordDirty(true);

        break;
    }
  }
  function changeName(evt) {
    if (evt.target.type === "text") {
      setName(evt.target.value);
      if (evt.target.value.length < 4) {
        setNameError("Имя должно быть не короче 4 символов");
        if (!evt.target.value) {
          setNameError("Заполните поле Имя");
        }
      } else {
        setNameError("");
      }
    } else {
      setName("");
    }
  }

  function changeData(evt) {
    if (evt.target.type === "email") {
      setEmail(evt.target.value);

      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(evt.target.value).toLowerCase())) {
        setEmailError("Некорректный Емаил");
      } else {
        setEmailError("");
      }
    } else {
      setPassword(evt.target.value);
      if (evt.target.value.length < 4) {
        setPasswordError("Пароль должен быть не короче 4 символов");
        if (!evt.target.value) {
          setPasswordError("Заполните поле Емейл");
        }
      } else {
        setPasswordError("");
      }
    }
  }
  function clearForm() {
    setEmail("");
    setPassword("");
    setName("");
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!name || !password || !email) {
      console.log("Заполните форму");

      return;
    } else {
      handleReg(email, name, password);
      clearForm();
    }
  }

  return (
    <PopupWithForm isOpen={isOpen} close={onClose} onSubmit={handleSubmit}>
      <h2 className="popup__title">{title}</h2>
      <label className="popup__input-wrapper">
        <span className="popup__input-name">Name</span>
        <input
          className="popup__input popup__input_activiti"
          tabIndex="2"
          autoComplete="on"
          type="text"
          name="text"
          minLength="8"
          maxLength="200"
          required
          onChange={changeName}
          onBlur={handleBlur}
        />
        {nameDirty && nameError && (
          <span className="popup__error" id="name-error">
            {nameError}
          </span>
        )}
      </label>
      <label className="popup__input-wrapper">
        <span className="popup__input-name">Email</span>
        <input
          className="popup__input popup__input_name "
          type="email"
          name="email"
          autoComplete="off"
          minLength="8"
          maxLength="40"
          required
          onChange={changeData}
          onBlur={handleBlur}
        />
        {emailDirty && emailError && (
          <span className="popup__error" id="name-error">
            {emailError}
          </span>
        )}
      </label>
      <label className="popup__input-wrapper">
        <span className="popup__input-name">Password</span>
        <input
          className="popup__input popup__input_activiti"
          tabIndex="2"
          autoComplete="off"
          type="password"
          name="password"
          minLength="2"
          maxLength="200"
          required
          onChange={changeData}
          onBlur={handleBlur}
        />
        {passwordDirty && passwordError && (
          <span className="popup__error" id="activiti-error">
            {passwordError}
          </span>
        )}
      </label>
      <button
        type="submit"
        className={`popup__button ${
          !formValid ? "popup__button_disabled" : ""
        }`}
      >
        {btnText}
      </button>
      <div className="popup__auth-box">
        <p className="popup__auth-text">или</p>
        <Link to="" className="popup__auth-link" onClick={onClick}>
          {linkText}
        </Link>
      </div>
    </PopupWithForm>
  );
}
export default PopupRegister;
