export const Content = ({
  activeMenuItems,
  onAdd,
  menuName,
  onPlusFromContent,
}) => {
  return (
    <div className="content">
      <div className="content__heading">
        <h1 className="content__heading--big">{menuName}</h1>
        <p className="content__heading--small">
          {activeMenuItems.length} ITEMS
        </p>
      </div>
      <ul className="content__list">
        {activeMenuItems.map((item, index) => (
          <li key={index} className="content__list__item">
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
                alt="food-image"
              />
              {item.qty ? (
                <div className="content__list__items__buttons">
                  <button className="content__list__items__btn">
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <button className="content__list__items__value">
                    {item.qty}
                  </button>
                  <button className="content__list__items__btn">
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
              ) : (
                <button
                  className="list__item__dish-btn"
                  onClick={() => onAdd(index)}
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
