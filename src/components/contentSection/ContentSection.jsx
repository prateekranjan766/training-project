import "./contentSection.styles.css";
import menuList from "../../models/menuModel";
import Sidebar from "../sidebar";
import { useState } from "react";

export const ContentSection = () => {
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);

  const onSidebarClick = (index) => {
    setActiveMenuIndex(index);
  };

  return (
    <section className="content-section">
      <Sidebar
        menuList={menuList}
        activeMenuIndex={activeMenuIndex}
        onClick={onSidebarClick}
      />

      <div className="content">
        <div className="content__heading"></div>
        <ul className="content__list"></ul>
      </div>

      <div className="cart">
        <div className="cart__heading">
          <h1 className="cart__heading--big">Cart</h1>
          <p className="cart__heading--small"></p>
        </div>
        <ul className="cart__list"></ul>
        <div className="cart__summary"></div>

        <button className="cart__btn cart__btn--red">
          Empty Cart &nbsp;<i className="fa fa-trash" aria-hidden="true"></i>
        </button>
        <button className="cart__btn cart__btn__checkout">
          Checkout &#8594;
        </button>
      </div>
    </section>
  );
};
