import "./subHeader.styles.css";

import restaurantImage from "./rest-img.jpeg";
import React from "react";

export const SubHeader = ({ onClick, onChange }) => {
  return (
    <section className="restaurant__section">
      <img
        src={restaurantImage}
        alt="restaurant"
        className="restaurant__image"
      />
      <div className="restaurant__info">
        <p className="restaurant__info--name">Kitchens of Punjab</p>
        <p className="restaurant__info--type">Punjabi, North Indian</p>
        <p className="restaurant__info--address">
          Bilekahalli, BTM - Bangalore | Change Outlet
          <i className="fa-solid fa-angle-down"></i>
        </p>
        <div className="restaurants__highlights">
          <div>
            <p className="restaurants__highlights__features">
              <i className="fa-solid fa-star"></i> 4.1
            </p>
            <p className="restaurants__highlights__text">100+ Ratings</p>
          </div>
          <div>
            <p className="restaurants__highlights__features">
              <i className="fa-solid fa-motorcycle"></i> 74min
            </p>
            <p className="restaurants__highlights__text">Delivery Time</p>
          </div>
          <div>
            <p className="restaurants__highlights__features">&#x20B9; 400</p>
            <p className="restaurants__highlights__text">Cost for two</p>
          </div>
        </div>

        <div className="restaurant__info__input-fields">
          <div className="restaurant__info__input-group">
            <input
              type="text"
              id="restaurant__info__search"
              className="restaurant__info__search"
              placeholder="Search for dishes..."
              onChange={(e) => onChange(e)}
            />
            <label
              htmlFor="restaurant__info__search"
              className="restaurant__info__search-label"
            >
              <span className="restaurant__info__input-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </label>
          </div>

          <label htmlFor="veg-only">
            <div className="restaurant__info__checkbox">
              <input type="checkbox" id="veg-only" onClick={() => onClick()} />
              &#160; Veg Only
            </div>
          </label>

          <button className="restaurant__info__favourite">
            <i className="fa-solid fa-heart"></i>
            &#160; Favourite
          </button>
        </div>
      </div>
      <div className="restaurant__offer">
        <p className="restaurant__offer__heading">OFFER</p>
        <div className="restaurant__offer__item">
          <span className="restaurant__offer__icon">
            <i className="fa-solid fa-tags"></i>
          </span>
          20% off | Use code PARTY
        </div>
        <div className="restaurant__offer__item">
          <span className="restaurant__offer__icon">
            <i className="fa-solid fa-tags"></i>
          </span>
          30% off up to ₹150 on orders above ₹400 | Use code JUMBO
        </div>
      </div>
    </section>
  );
};
