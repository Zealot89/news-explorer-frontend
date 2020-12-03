import React from "react";

function Footer() {
  return (
    <section className="footer">
      <p className="footer__copyright">
        {" "}
        &copy; 2020 Supersite, Powered by News API
      </p>
      <ul className="footer__links">
        <li>
          <a
            className="footer__link"
            href="https://http://localhost:3000"
            target="_blank"
          >
            Главная
          </a>
        </li>
        <li>
          <a
            className="footer__link"
            href="https://praktikum.yandex.ru/"
            target="_blank"
          >
            Яндекс.Практикум
          </a>
        </li>
      </ul>
      <ul className="footer__social">
        <a
          className="footer__icon footer__icon_gh"
          href="https://github.com/Zealot89"
          target="_blank"
        ></a>
        <a
          className="footer__icon footer__icon_vk"
          href="https://vk.com/zealot89"
          target="_blank"
        ></a>
      </ul>
    </section>
  );
}
export default Footer;
