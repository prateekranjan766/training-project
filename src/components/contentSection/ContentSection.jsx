import "./contentSection.styles.css";

import React from "react";
import Cart from "../cart";
import Content from "../content";
import Sidebar from "../sidebar";
import menuList from "../../models/menuModel";
import { getDishByMenu } from "../../models/dishModel";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setActiveMenuIndex } from "../../actions/filterActions";
import {
  setActiveMenuItems,
  setQuantityByID,
} from "../../actions/contentActions";
import {
  addToCart,
  clearCart,
  setCartItemQtyById,
  removeFromCart,
} from "../../actions/cartActions";

export const ContentSection = () => {
  const dispatch = useDispatch();
  const activeMenuIndex = useSelector((state) => state.activeMenuIndex);
  const searchKeyword = useSelector((state) => state.inputValue);
  const isVegOnly = useSelector((state) => state.vegOnly);
  const activeMenuItems = useSelector((state) => state.activeMenuItems);
  const cart = useSelector((state) => state.cart);
  const { cartItems, loading: loadingCart } = cart;

  const [checkoutMessage, setCheckoutMessage] = useState("");

  useEffect(() => {
    onSidebarClick(activeMenuIndex);
  }, [searchKeyword, isVegOnly]);

  const onSidebarClick = (index) => {
    let updatedMenuItems = getDishByMenu(menuList[index]);
    if (searchKeyword !== "") {
      updatedMenuItems = updatedMenuItems.filter((item) =>
        item.name.toLowerCase().includes(searchKeyword.trim().toLowerCase())
      );
    }
    for (let i = 0; i < updatedMenuItems.length; i++) {
      updatedMenuItems[i].qty = 0;
      for (let j = 0; j < cartItems.length; j++) {
        if (updatedMenuItems[i].id === cartItems[j].id) {
          updatedMenuItems[i].qty = cartItems[j].qty;
          break;
        }
      }
    }

    if (isVegOnly) {
      updatedMenuItems = updatedMenuItems.filter(
        (item) => item.isVeg !== false
      );
    }

    dispatch(setActiveMenuIndex(index));
    dispatch(setActiveMenuItems(updatedMenuItems));
  };

  const onAdd = (index) => {
    const { isVeg, name, price, id } = activeMenuItems[index];

    dispatch(setQuantityByID(id, 1));
    dispatch(addToCart({ id, isVeg, name, price, qty: 1 }));
  };

  const onPlusFromContent = (index) => {
    const { id, qty } = activeMenuItems[index];

    dispatch(setQuantityByID(id, qty + 1));
    dispatch(setCartItemQtyById(id, qty + 1));
  };

  const onMinusFromContent = (index) => {
    const { id, qty } = activeMenuItems[index];

    dispatch(setQuantityByID(id, qty - 1));
    qty === 1
      ? dispatch(removeFromCart(id))
      : dispatch(setCartItemQtyById(id, qty - 1));
  };

  const onPlusFromCart = (index) => {
    let { id, qty } = cartItems[index];
    dispatch(setQuantityByID(id, qty + 1));
    dispatch(setCartItemQtyById(id, qty + 1));
  };

  const onMinusFromCart = (index) => {
    let { id, qty } = cartItems[index];
    dispatch(setQuantityByID(id, qty - 1));
    qty === 1
      ? dispatch(removeFromCart(id))
      : dispatch(setCartItemQtyById(id, qty - 1));
  };

  const emptyCart = () => {
    for (let i = 0; i < cartItems.length; i++) {
      const { id } = cartItems[i];
      dispatch(setQuantityByID(id, 0));
    }
    dispatch(clearCart());
  };

  function checkoutFakeAPI() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const error = false;

        if (!error) {
          resolve(cartItems);
        } else {
          reject("Error: Somthing went wrong!!!");
        }
      }, 2000);
    });
  }

  const onCheckout = async () => {
    try {
      const items = await checkoutFakeAPI();

      localStorage.setItem("cart", JSON.stringify(items));
      // setCartItems([]);

      setCheckoutMessage("Checkout Successful...");
      setTimeout(() => {
        setCheckoutMessage("");
      }, 5000);
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
