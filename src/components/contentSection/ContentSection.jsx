import "./contentSection.styles.css";

import React from "react";
import Cart from "../cart";
import Content from "../content";
import Sidebar from "../sidebar";
import menuList from "../../models/menuModel";
import { getDishByMenu } from "../../models/dishModel";
import { useState, useEffect } from "react";

import { connect } from "react-redux";
import { setActiveMenuIndex } from "../../actions/filterActions";
import {
  setActiveMenuItems,
  setQuantityByID,
} from "../../actions/contentActions";
import {
  addToCart,
  clearCart,
  removeFromCart,
  setCartItemQtyById,
} from "../../actions/cartActions";

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
}) => {
  const { cartItems, loading: loadingCart } = cart;
  const [checkoutMessage, setCheckoutMessage] = useState("");

  useEffect(() => {
    filterItems();
  }, [searchKeyword, isVegOnly]);

  const onSidebarClick = (index) => {
    const updatedMenuItems = getDishByMenu(menuList[index]).map((menuItem) => {
      const result = cartItems.find((cartItem) => cartItem.id === menuItem.id);
      if (result) menuItem.qty = result.qty;
      return menuItem;
    });

    filterItems(updatedMenuItems);
    setActiveMenuIndex(index);
  };

  const filterItems = (menuItems) => {
    const currentMenuItems =
      menuItems || getDishByMenu(menuList[activeMenuIndex]);
    const updatedMenuItems = currentMenuItems.filter((item) => {
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

    setActiveMenuItems(updatedMenuItems);
  };

  const onAdd = (index) => {
    const { isVeg, name, price, id } = activeMenuItems[index];

    setQuantityByID(id, 1);
    addToCart({ id, isVeg, name, price, qty: 1 });
  };

  const onPlusFromContent = (index) => {
    const { id, qty } = activeMenuItems[index];

    setQuantityByID(id, qty + 1);
    setCartItemQtyById(id, qty + 1);
  };

  const onMinusFromContent = (index) => {
    const { id, qty } = activeMenuItems[index];

    setQuantityByID(id, qty - 1);
    qty === 1 ? removeFromCart(id) : setCartItemQtyById(id, qty - 1);
  };

  const onPlusFromCart = (index) => {
    let { id, qty } = cartItems[index];
    setQuantityByID(id, qty + 1);
    setCartItemQtyById(id, qty + 1);
  };

  const onMinusFromCart = (index) => {
    let { id, qty } = cartItems[index];
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
      delay(5000);
      setCheckoutMessage("");
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
        activeMenuItems={activeMenuItems}
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
    activeMenuIndex: state.activeMenuIndex,
    searchKeyword: state.inputValue,
    isVegOnly: state.vegOnly,
    activeMenuItems: state.activeMenuItems,
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setActiveMenuIndex: function (index) {
      dispatch(setActiveMenuIndex(index));
    },
    setActiveMenuItems: function (updatedMenuItems) {
      dispatch(setActiveMenuItems(updatedMenuItems));
    },
    setQuantityByID: function (id, qty) {
      dispatch(setQuantityByID(id, qty));
    },
    addToCart: function (item) {
      dispatch(addToCart(item));
    },
    setCartItemQtyById: function (id, qty) {
      dispatch(setCartItemQtyById(id, qty));
    },
    removeFromCart: function (id) {
      dispatch(removeFromCart(id));
    },
    clearCart: function () {
      dispatch(clearCart());
    },
  };
};

export const ContentSection = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentSectionComponent);
