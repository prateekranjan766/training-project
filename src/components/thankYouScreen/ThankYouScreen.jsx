import React from "react";
import { withRouter } from "react-router-dom";
import "./thankYouScreen.styles.css";

const ThankYouScreen = ({ history }) => {
  const orderItems = JSON.parse(localStorage.getItem("cart"));
  const totalCost = orderItems.reduce(
    (accu, item) => accu + item.qty * item.price,
    0
  );

  return (
    <div className="thank-you__container">
      <div className="thank-you__container__heading">
        <h1 className="container__heading--large">Thank You</h1>
        <h2 className="container__heading--medium">Checkout Successful</h2>
      </div>
      <div className="thank-you__content">
        <ul className="order__list">
          <h3 className="thank-you__content__heading">Order Summary</h3>
          {orderItems.map((item) => (
            <li key={item.id} className="order__list__item">
              <div>
                {item.isVeg === false ? (
                  <p className="non-veg">
                    <i className="fa-solid fa-square-caret-up"></i>
                  </p>
                ) : (
                  <p className="veg">
                    <i className="fa-solid fa-circle-stop"></i>
                  </p>
                )}
              </div>
              <p className="order__list__item-name">{item.name}</p>
              <div className="order__list__item-price">
                <p className="price-p1">{item.qty}&nbsp; x </p>
                <p className="price-p2">&nbsp; &#x20B9; {item.price} = </p>
                <p className="price-p3">
                  &nbsp; &#x20B9; {item.price * item.qty}
                </p>
              </div>
            </li>
          ))}
          <li className="order__list__total">
            <p>
              <strong>Total Amount Paid</strong>
            </p>
            <p className="order__list__item-price">
              <strong>&#x20B9; {totalCost}</strong>
            </p>
          </li>
        </ul>
        <button className="thankyou-btn" onClick={() => history.push("/")}>
          Buy More Food 🤤
        </button>
      </div>
    </div>
  );
};

export default withRouter(ThankYouScreen);
