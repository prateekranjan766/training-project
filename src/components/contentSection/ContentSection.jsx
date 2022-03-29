import "./contentSection.styles.css";
import Cart from "../cart";
import Content from "../content";
import React from "react";
import Sidebar from "../sidebar";
import menuList from "../../models/menuModel";
import { getDishByMenu } from "../../models/dishModel";
import { useState, useEffect } from "react";

export const ContentSection = ({
  activeMenuIndex,
  isVegOnly,
  searchKeyword,
  setActiveMenuIndex,
}) => {
  const [activeMenuItems, setActiveMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [cartEmptyMessage, setCartEmptyMessage] = useState("");

  useEffect(() => {
    onSidebarClick(activeMenuIndex);
  }, [isVegOnly, searchKeyword, cartItems]);

  const onSidebarClick = (index) => {
    let updatedMenuItems = getDishByMenu(menuList[index]);
    if (searchKeyword !== "") {
      updatedMenuItems = updatedMenuItems.filter((item) =>
        item.name.toLowerCase().includes(searchKeyword.trim().toLowerCase())
      );
    }
    updatedMenuItems = updatedMenuItems.map((menuItem) => {
      menuItem.qty = 0;
      cartItems.forEach((cartItem) => {
        if (cartItem.id === menuItem.id) {
          menuItem.qty = cartItem.qty;
          return;
        }
      });
      return menuItem;
    });

    if (isVegOnly) {
      updatedMenuItems = updatedMenuItems.filter(
        (item) => item.isVeg !== false
      );
    }

    setActiveMenuIndex(index);
    setActiveMenuItems(updatedMenuItems);
  };

  const onAdd = (index) => {
    const { isVeg, name, price, id } = activeMenuItems[index];
    let updatedMenuItems = activeMenuItems;
    updatedMenuItems[index].qty = 1;

    setActiveMenuItems(updatedMenuItems);
    setCartItems([...cartItems, { isVeg, name, price, qty: 1, id }]);
  };

  const onPlusFromContent = (index) => {
    let updatedMenuItems = [...activeMenuItems];
    updatedMenuItems[index].qty++;

    let updatedCartItems = [...cartItems];
    const idx = updatedCartItems.findIndex(
      (item) => item.name === updatedMenuItems[index].name
    );
    updatedCartItems[idx].qty++;

    setCartItems(updatedCartItems);
    setActiveMenuItems(updatedMenuItems);
  };

  const onMinusFromContent = (index) => {
    let updatedMenuItems = [...activeMenuItems];
    updatedMenuItems[index].qty--;

    let updatedCartItems = [...cartItems];
    const idx = updatedCartItems.findIndex(
      (item) => item.name === updatedMenuItems[index].name
    );
    updatedCartItems[idx].qty--;
    if (updatedCartItems[idx].qty === 0) {
      updatedCartItems = updatedCartItems.filter((item, i) => i !== idx);
    }

    setCartItems(updatedCartItems);
    setActiveMenuItems(updatedMenuItems);
  };

  const onPlusFromCart = (index) => {
    let updatedCartItems = [...cartItems];
    updatedCartItems[index].qty++;

    let updatedMenuItems = [...activeMenuItems];
    const idx = updatedMenuItems.findIndex(
      (item) => item.name === updatedCartItems[index].name
    );

    setCartItems(updatedCartItems);

    if (idx === -1) return;

    updatedMenuItems[idx].qty++;
    setActiveMenuItems(updatedMenuItems);
  };

  const onMinusFromCart = (index) => {
    let updatedCartItems = [...cartItems];
    updatedCartItems[index].qty--;

    let updatedMenuItems = [...activeMenuItems];
    const idx = updatedMenuItems.findIndex(
      (item) => item.name === updatedCartItems[index].name
    );

    if (updatedCartItems[index].qty === 0) {
      updatedCartItems = updatedCartItems.filter((item, i) => i !== index);
    }

    setCartItems(updatedCartItems);

    if (idx === -1) return;

    updatedMenuItems[idx].qty--;
    setActiveMenuItems(updatedMenuItems);
  };

  const emptyCart = async () => {
    setCartItems([]);
    setCartEmptyMessage("Cart items removed successfully...");

    await delay(2000);
    setCartEmptyMessage("");
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

      setCartItems([]);
      setCheckoutMessage("Checkout Successful...");

      await delay(5000);
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
        cartEmptyMessage={cartEmptyMessage}
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
