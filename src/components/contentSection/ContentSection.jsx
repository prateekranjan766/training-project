import "./contentSection.styles.css";
import Cart from "../cart";
import Content from "../content";
import React from "react";
import Sidebar from "../sidebar";
import menuList from "../../models/menuModel";
import { getDishByMenu } from "../../models/dishModel";
import { useState, useMemo } from "react";

export const ContentSection = ({
  activeMenuIndex,
  isVegOnly,
  searchKeyword,
  setActiveMenuIndex,
}) => {
  const [activeMenuItems, setActiveMenuItems] = useState(
    getDishByMenu(menuList[activeMenuIndex])
  );
  const [cartItems, setCartItems] = useState([]);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [cartEmptyMessage, setCartEmptyMessage] = useState("");

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
      menuItem.qty = result ? result.qty : 0;
      return menuItem;
    });

    setActiveMenuItems(updatedMenuItems);
    setActiveMenuIndex(index);
  };

  const onAdd = (id) => {
    const item = activeMenuItems.find((item) => item.id === id);

    const updatedMenuItems = [...activeMenuItems];
    const index = updatedMenuItems.findIndex((element) => element.id === id);
    updatedMenuItems[index].qty = 1;

    const { isVeg, name, price } = item;
    setActiveMenuItems(updatedMenuItems);
    setCartItems([...cartItems, { isVeg, name, price, qty: 1, id }]);
  };

  const onPlusFromContent = (id) => {
    const updatedMenuItems = [...activeMenuItems];
    const index = updatedMenuItems.findIndex((element) => element.id === id);
    updatedMenuItems[index].qty++;

    const updatedCartItems = [...cartItems];
    const idx = updatedCartItems.findIndex((element) => element.id === id);
    updatedCartItems[idx].qty++;

    setCartItems(updatedCartItems);
    setActiveMenuItems(updatedMenuItems);
  };

  const onMinusFromContent = (id) => {
    const updatedMenuItems = [...activeMenuItems];
    const index = updatedMenuItems.findIndex((element) => element.id === id);
    updatedMenuItems[index].qty--;

    let updatedCartItems = [...cartItems];
    const idx = updatedCartItems.findIndex((element) => element.id === id);
    updatedCartItems[idx].qty--;
    if (updatedCartItems[idx].qty === 0) {
      updatedCartItems = updatedCartItems.filter((item, i) => i !== idx);
    }

    setCartItems(updatedCartItems);
    setActiveMenuItems(updatedMenuItems);
  };

  const onPlusFromCart = (id) => {
    const updatedCartItems = [...cartItems];
    const index = updatedCartItems.findIndex((element) => element.id === id);
    updatedCartItems[index].qty++;

    let updatedMenuItems = [...activeMenuItems];
    const idx = updatedMenuItems.findIndex((element) => element.id === id);

    setCartItems(updatedCartItems);

    if (idx === -1) return;
    updatedMenuItems[idx].qty++;
    setActiveMenuItems(updatedMenuItems);
  };

  const onMinusFromCart = (id) => {
    let updatedCartItems = [...cartItems];
    const index = updatedCartItems.findIndex((element) => element.id === id);
    updatedCartItems[index].qty--;

    let updatedMenuItems = [...activeMenuItems];
    const idx = updatedMenuItems.findIndex((element) => element.id === id);

    if (updatedCartItems[index].qty === 0) {
      updatedCartItems = updatedCartItems.filter((item, i) => i !== index);
    }

    setCartItems(updatedCartItems);

    if (idx === -1) return;
    updatedMenuItems[idx].qty--;
    setActiveMenuItems(updatedMenuItems);
  };

  const emptyCart = async (isCheckout) => {
    const updatedMenuItems = activeMenuItems.map((item) => {
      item.qty = 0;
      return item;
    });
    setCartItems([]);
    setActiveMenuItems(updatedMenuItems);
    if (!isCheckout) {
      setCartEmptyMessage("Cart items removed successfully...");
      await delay(2000);
      setCartEmptyMessage("");
    }
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

      emptyCart(true);
      setCheckoutMessage("Checkout Successful...");

      await delay(2000);
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
        activeMenuItems={filteredItems}
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
