import "./contentSection.styles.css";
import menuList from "../../models/menuModel";
import Sidebar from "../sidebar";
import Content from "../content";
import Cart from "../cart";
import { useState, useEffect } from "react";
import { getDishByMenu } from "../../models/dishModel";

export const ContentSection = () => {
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [activeMenuItems, setActiveMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setActiveMenuItems(getDishByMenu(menuList[activeMenuIndex]));
  }, [activeMenuItems, cartItems]);

  const onSidebarClick = (index) => {
    setActiveMenuIndex(index);
    let updatedMenuItems = getDishByMenu(menuList[index]);
    for (let i = 0; i < updatedMenuItems.length; i++) {
      updatedMenuItems[i].qty = 0;
      for (let j = 0; j < cartItems.length; j++) {
        if (updatedMenuItems[i].name === cartItems[j].name) {
          updatedMenuItems[i].qty = cartItems[j].qty;
          break;
        }
      }
    }
    setActiveMenuItems(updatedMenuItems);
  };

  const onAdd = (index) => {
    const { isVeg, name, price } = activeMenuItems[index];
    let updatedMenuItems = activeMenuItems;
    updatedMenuItems[index].qty = 1;

    setActiveMenuItems(updatedMenuItems);
    setCartItems([...cartItems, { isVeg, name, price, qty: 1 }]);
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

  const emptyCart = () => {
    let updatedMenuItems = [...activeMenuItems];
    updatedMenuItems = updatedMenuItems.map((item) => {
      item.qty = 0;
      return item;
    });
    setCartItems([]);
  };

  return (
    <section className="content-section">
      <Sidebar
        menuList={menuList}
        activeMenuIndex={activeMenuIndex}
        onClick={onSidebarClick}
      />

      <Content
        activeMenuItems={activeMenuItems}
        onAdd={onAdd}
        menuName={menuList[activeMenuIndex]}
        onPlus={onPlusFromContent}
        onMinus={onMinusFromContent}
      />

      <Cart
        cartItems={cartItems}
        onPlus={onPlusFromCart}
        onMinus={onMinusFromCart}
        onEmpty={emptyCart}
      />
    </section>
  );
};
