import "./contentSection.styles.css";
import menuList from "../../models/menuModel";
import Sidebar from "../sidebar";
import Content from "../content";
import Cart from "../cart";
import { useState } from "react";
import { getDishByMenu } from "../../models/dishModel";

export const ContentSection = () => {
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const [activeMenuItems, setActiveMenuItems] = useState(
    getDishByMenu(menuList[activeMenuIndex])
  );
  const [cartItems, setCartItems] = useState([]);

  const onSidebarClick = (index) => {
    setActiveMenuIndex(index);
    let updatedMenuItems = getDishByMenu(menuList[index]);
    for (let i = 0; i < updatedMenuItems.length; i++) {
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
      />

      <Cart cartItems={cartItems} />
    </section>
  );
};
