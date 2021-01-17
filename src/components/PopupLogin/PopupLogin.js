import React from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { Link } from "react-router-dom";
function PopupLogin({
  title,
  close,
  isOpen,
  btnText,
  linkText,
  onClick,
  handleLogin,
}) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [emailDirty, setEmailDirty] = React.useState(false);
  const [passwordDirty, setPasswordDirty] = React.useState(false);

  const [emailError, setEmailError] = React.useState("Заполните поле Емейл");
  const [passwordError, setPasswordError] = React.useState("Введите Пароль");

  const [formValid, setFormValid] = React.useState(false);

  React.useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

  function handleBlur(e) {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);

        break;
      case "about":
        setPasswordDirty(true);

        break;
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
        console.log(password.length);
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
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    if (!email || !password) {
      clearForm();
      console.log("Заполните форму");
      return;
    } else {
      handleLogin(email, password);
      clearForm();
    }
  }
  return (
    <PopupWithForm close={close} isOpen={isOpen} onSubmit={handleSubmit}>
      <h2 className="popup__title">{title}</h2>
      <label className="popup__input-wrapper">
        <span className="popup__input-name">Email</span>
        <input
          className="popup__input popup__input_name "
          type="email"
          name="email"
          autoComplete="on"
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
          name="about"
          autoComplete="off"
          tabIndex="2"
          type="password"
          minLength=""
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
export default PopupLogin;
