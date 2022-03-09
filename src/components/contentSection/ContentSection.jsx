import "./contentSection.styles.css";
import menuList from "../../models/menuModel";
import Sidebar from "../sidebar";
import Content from "../content";
import Cart from "../cart";
import { useState, useEffect } from "react";
import { getDishByMenu } from "../../models/dishModel";

export const ContentSection = ({
  isVegOnly,
  activeMenuIndex,
  setActiveMenuIndex,
  searchKeyword,
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
    for (let i = 0; i < updatedMenuItems.length; i++) {
      updatedMenuItems[i].qty = 0;
      for (let j = 0; j < cartItems.length; j++) {
        if (updatedMenuItems[i].name === cartItems[j].name) {
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

    setActiveMenuIndex(index);
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

    setCartEmptyMessage("Cart items removed successfully...");
    setTimeout(() => {
      setCartEmptyMessage("");
    }, 5000);
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
      setCartItems([]);

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
        searchKeyword={searchKeyword}
      />

      <Cart
        cartItems={cartItems}
        onPlus={onPlusFromCart}
        onMinus={onMinusFromCart}
        onEmpty={emptyCart}
        onCheckout={onCheckout}
        checkoutMessage={checkoutMessage}
        cartEmptyMessage={cartEmptyMessage}
      />
    </section>
  );
};
