import React from "react";
import "./content.styles.css";

export const Content = ({
  filteredItems: menuItems,
  menuName,
  onAdd,
  onMinus,
  onPlus,
  searchKeyword,
}) => {
  return (
    <div className="content">
      <div className="content__heading">
        <h1 className="content__heading--big">
          {searchKeyword ? `Search Results in ${menuName}` : menuName}
        </h1>
        <p className="content__heading--small">{menuItems.length} ITEMS</p>
      </div>
      <ul className="content__list">
        {menuItems.map((item) => (
          <li key={item.id} className="content__list__item">
            <div className="content__list__item--text">
              {item.isVeg === false ? (
                <p className="non-veg">
                  <i className="fa-solid fa-square-caret-up"></i>
                </p>
              ) : (
                <p className="veg">
                  <i className="fa-solid fa-circle-stop"></i>
                </p>
              )}
              <p className="list__item__dish-name">{item.name}</p>
              <p className="list__item__dish-price">&#x20B9; {item.price}</p>
              <p className="list__item__dish-items">{item.description}</p>
            </div>
            <div className="content__list__item__img-container">
              <img
                className="list__item__dish-image"
                src={item.image}
                alt="food"
              />
              {item.qty ? (
                <div className="content__list__items__buttons">
                  <button
                    className="content__list__items__btn"
                    onClick={() => onMinus(item.id)}
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <button className="content__list__items__value">
                    {item.qty}
                  </button>
                  <button
                    className="content__list__items__btn"
                    onClick={() => onPlus(item.id)}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
              ) : (
                <button
                  className="list__item__dish-btn"
                  onClick={() => onAdd(item.id)}
                >
                  ADD
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
