import logo from "./swiggy-logo.svg";

import "./header.styles.css";
import React from "react";

export const Header = ({ changeTheme }) => {
  return (
    <header className="header">
      <div className="header__logo-box">
        <a href="#">
          <img src={logo} alt="brand-logo" className="header__logo" />
        </a>
        <a href="#" className="header__logo-box__link">
          <strong>
            <u>Other</u>
          </strong>{" "}
          Bengaluru, Karnataka, India
          <i className="fa-solid fa-angle-down"></i>
        </a>
      </div>
      <ul className="header__navigation-list">
        <li className="header__navigation__item">
          <a href="#" className="header__navigation__link">
            <i className="fa-solid fa-magnifying-glass"></i>
            &#160;Search
          </a>
        </li>
        <li className="header__navigation__item">
          <a href="#" className="header__navigation__link">
            <i className="fa-solid fa-tags"></i>
            &#160;Offers
          </a>
        </li>
        <li className="header__navigation__item">
          <a href="#" className="header__navigation__link">
            <i className="fa-solid fa-handshake-angle"></i>
            &#160;Help
          </a>
        </li>
        <li className="header__navigation__item">
          <a href="#" className="header__navigation__link">
            <i className="fa-solid fa-circle-user"></i>
            &#160;Sign In
          </a>
        </li>
        <li className="header__navigation__item">
          <a href="#" className="header__navigation__link">
            <i className="fa-solid fa-cart-shopping"></i>
            &#160;Cart
          </a>
        </li>
        <li className="header__navigation__item">
          <a
            className="header__navigation__link"
            style={{ cursor: "pointer" }}
            onClick={() => changeTheme()}
          >
            Change Checkout Button
          </a>
        </li>
      </ul>
    </header>
  );
};
