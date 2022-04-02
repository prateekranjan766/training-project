import "./contentSection.styles.css";

import React, { useState, useMemo } from "react";
import Cart from "../cart";
import Content from "../content";
import Sidebar from "../sidebar";
import menuList from "../../models/menuModel";
import { getDishByMenu } from "../../models/dishModel";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setActiveMenuIndex } from "../../actions/filterActions";
import * as ContentActions from "../../actions/contentActions";
import * as CartActions from "../../actions/cartActions";
import * as ContentSelectors from "../../selectors/contentSectionSelectors";

const ContentSectionComponent = ({
  activeMenuIndex,
  activeMenuItems,
  addToCart,
  cart,
  clearCart,
  isVegOnly,
  removeFromCart,
  searchKeyword,
  setActiveMenuIndex,
  setActiveMenuItems,
  setCartItemQtyById,
  setQuantityByID,
  history,
}) => {
  const { cartItems, loading: loadingCart } = cart;
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const filteredItems = useMemo(() => {
    const items = activeMenuItems.filter((item) => {
      if (
        item.name.toLowerCase().includes(searchKeyword.trim().toLowerCase())
      ) {
        if (isVegOnly && item.isVeg !== false) {
          return item;
        } else if (!isVegOnly) {
          return item;
        }
      }
    });
    return items;
  }, [activeMenuItems, isVegOnly, searchKeyword]);

  const onSidebarClick = (index) => {
    const updatedMenuItems = getDishByMenu(menuList[index]).map((menuItem) => {
      const result = cartItems.find((cartItem) => cartItem.id === menuItem.id);
      if (result) menuItem.qty = result.qty;
      return menuItem;
    });

    setActiveMenuItems(updatedMenuItems);
    setActiveMenuIndex(index);
  };

  const onAdd = (id) => {
    const { isVeg, name, price } = activeMenuItems.find(
      (item) => item.id === id
    );

    setQuantityByID(id, 1);
    addToCart({ id, isVeg, name, price, qty: 1 });
  };

  const onPlusFromContent = (id) => {
    const { qty } = activeMenuItems.find((item) => item.id === id);

    setQuantityByID(id, qty + 1);
    setCartItemQtyById(id, qty + 1);
  };

  const onMinusFromContent = (id) => {
    const { qty } = activeMenuItems.find((item) => item.id === id);

    setQuantityByID(id, qty - 1);
    qty === 1 ? removeFromCart(id) : setCartItemQtyById(id, qty - 1);
  };

  const onPlusFromCart = (id) => {
    const { qty } = cartItems.find((item) => item.id === id);
    setQuantityByID(id, qty + 1);
    setCartItemQtyById(id, qty + 1);
  };

  const onMinusFromCart = (id) => {
    const { qty } = cartItems.find((item) => item.id === id);
    setQuantityByID(id, qty - 1);
    qty === 1 ? removeFromCart(id) : setCartItemQtyById(id, qty - 1);
  };

  const emptyCart = () => {
    cartItems.forEach((item) => setQuantityByID(item.id, 0));
    clearCart();
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const checkoutFakeAPI = async () => {
    await delay(2000);
    return cartItems;
  };

  const onCheckout = async () => {
    try {
      const items = await checkoutFakeAPI();
      localStorage.setItem("cart", JSON.stringify(items));

      setCheckoutMessage("Checkout Successful...");
      emptyCart();
      await delay(2000);
      setCheckoutMessage("");
      history.push("/thank-you");
    } catch (err) {
      console.log("Error: " + err);
    }
  };

  return (
    <section className="content-section">
      <Sidebar
        activeMenuIndex={activeMenuIndex}
        menuList={menuList}
        onClick={onSidebarClick}
      />
      <Content
        filteredItems={filteredItems}
        menuName={menuList[activeMenuIndex]}
        onAdd={onAdd}
        onMinus={onMinusFromContent}
        onPlus={onPlusFromContent}
        searchKeyword={searchKeyword}
      />
      <Cart
        loading={loadingCart}
        cartItems={cartItems}
        checkoutMessage={checkoutMessage}
        onCheckout={onCheckout}
        onEmpty={emptyCart}
        onMinus={onMinusFromCart}
        onPlus={onPlusFromCart}
      />
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    activeMenuIndex: ContentSelectors.activeMenuIndex(state),
    searchKeyword: ContentSelectors.searchKeyword(state),
    isVegOnly: ContentSelectors.isVegOnly(state),
    activeMenuItems: ContentSelectors.activeMenuItems(state),
    cart: ContentSelectors.cart(state),
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { ...CartActions, ...ContentActions, setActiveMenuIndex },
    dispatch
  );

export const ContentSection = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContentSectionComponent)
);
