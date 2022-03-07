import cartEmpty from "./cart-empty.png";
export const Cart = ({ cartItems }) => {
  return cartItems.length === 0 ? (
    <div className="cart">
      <div className="cart__empty__container">
        <img src={cartEmpty} alt="empty cart" className="cart__img" />
        <p className="cart__empty__text">
          Good food is always cooking! Go ahead, order some yummy items from the
          menu.
        </p>
      </div>
    </div>
  ) : (
    <div className="cart">
      <div className="cart__heading">
        <h1 className="cart__heading--big">Cart</h1>
        <p className="cart__heading--small"></p>
      </div>
      <ul className="cart__list">
        {cartItems.map((item, index) => (
          <li key={index} className="cart__list__items">
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
              <button className="cart__list__items__btn">
                <i className="fa-solid fa-minus"></i>
              </button>
              <button className="cart__list__items__value">{item.qty}</button>
              <button className="cart__list__items__btn">
                <i className="fa-solid fa-plus"></i>
              </button>
            </div>

            <p className="cart__list__items__price">
              &nbsp; &#x20B9; {item.price * item.qty}
            </p>
          </li>
        ))}
      </ul>
      <div className="cart__summary"></div>

      <button className="cart__btn cart__btn--red">
        Empty Cart &nbsp;<i className="fa fa-trash" aria-hidden="true"></i>
      </button>
      <button className="cart__btn cart__btn__checkout">
        Checkout &#8594;
      </button>
    </div>
  );
};
