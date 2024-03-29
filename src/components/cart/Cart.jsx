import Message from "../message";
import React, { useContext } from "react";

import cartEmpty from "./cart-empty.png";
import Spinner from "../spinner";
import { ThemeContext } from "../../context/themeContext";
import "./cart.styles.css";

export const Cart = ({
  loading,
  cartItems,
  checkoutMessage,
  onCheckout,
  onEmpty,
  onMinus,
  onPlus,
}) => {
  const totalCost = cartItems.reduce(
    (accu, item) => accu + item.qty * item.price,
    0
  );

  const isLightTheme = useContext(ThemeContext);

  return (
    <div className="cart">
      {checkoutMessage && <Message>{checkoutMessage}</Message>}
      {cartItems.length === 0 ? (
        <div className="cart__empty__container">
          <img src={cartEmpty} alt="empty cart" className="cart__img" />
          <p className="cart__empty__text">
            Good food is always cooking! Go ahead, order some yummy items from
            the menu.
          </p>
        </div>
      ) : (
        <>
          <div className="cart__heading">
            <h1 className="cart__heading--big">Cart</h1>
            <p className="cart__heading--small"></p>
          </div>
          <ul className="cart__list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart__list__items">
                {item.isVeg === false ? (
                  <p className="non-veg">
                    <i className="fa-solid fa-square-caret-up"></i>
                  </p>
                ) : (
                  <p className="veg">
                    <i className="fa-solid fa-circle-stop"></i>
                  </p>
                )}
                <p className="cart__list__items__heading">{item.name}</p>
                <div className="cart__list__items__buttons">
                  <button
                    className="cart__list__items__btn"
                    onClick={() => onMinus(item.id)}
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <button className="cart__list__items__value">
                    {item.qty}
                  </button>
                  <button
                    className="cart__list__items__btn"
                    onClick={() => onPlus(item.id)}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>

                <p className="cart__list__items__price">
                  &nbsp; &#x20B9; {item.price * item.qty}
                </p>
              </li>
            ))}
          </ul>
          <div className="cart__summary">
            <div className="cart__summary__heading">
              <p className="cart__summary__heading--primary">Subtotal</p>
              <p className="cart__summary__heading--secondary">
                Extra charges may apply
              </p>
            </div>
            <p className="cart__summary__price">&#x20B9; {totalCost}</p>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <button
              className="cart__btn cart__btn--red"
              onClick={() => onEmpty()}
            >
              Empty Cart &nbsp;
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          )}

          <button
            className={`cart__btn cart__btn__checkout ${
              isLightTheme
                ? "cart__btn__checkout--light"
                : "cart__btn__checkout--dark"
            }`}
            onClick={() => onCheckout()}
          >
            Checkout &#8594;
          </button>
        </>
      )}
    </div>
  );
};
