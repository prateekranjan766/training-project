import menuList from "./models/menuModel.js";
import getDishByMenu from "./models/dishModel.js";
import { cartEmpty } from "./models/imageConstants.js";

// IIFE
(function app() {
  // Action types
  const actions = {
    CHANGE_ACTIVE_MENU: "CHANGE_ACTIVE_MENU",
    ADD_TO_CART: "ADD_TO_CART",
    INCREASE_COUNT_IN_CART: "INCREASE_COUNT_IN_CART",
    DECREASE_COUNT_IN_CART: "DECREASE_COUNT_IN_CART",
    SET_VEG_ONLY_FILTER: "SET_VEG_ONLY_FILTER",
    REMOVE_VEG_ONLY_FILTER: "REMOVE_VEG_ONLY_FILTER",
  };

  // State
  let state = {
    activeMenu: 0,
    activeMenuItems: [],
    cart: [],
    vegOnly: false,
  };

  // Reducer
  function changeState(state, action, payload) {
    switch (action) {
      case actions.CHANGE_ACTIVE_MENU:
        state.activeMenu = payload.index;
        state.activeMenuItems = payload.menuItems;
        return state;
      case actions.ADD_TO_CART:
        const { cart } = state;
        const updatedCart = [...cart, payload];
        state.cart = updatedCart;
        return state;
      case actions.INCREASE_COUNT_IN_CART:
        state.cart[payload].qty = state.cart[payload].qty + 1;
        return state;
      case actions.DECREASE_COUNT_IN_CART:
        if (state.cart[payload].qty === 1) {
          const updatedCart = state.cart.filter(
            (item, index) => index !== payload
          );
          state.cart = updatedCart;
        } else {
          state.cart[payload].qty = state.cart[payload].qty - 1;
        }
        return state;
      case actions.SET_VEG_ONLY_FILTER:
        state.vegOnly = payload;
        const updatedMenuItems = state.activeMenuItems.filter(
          (item) => item.isVeg !== false
        );
        state.activeMenuItems = updatedMenuItems;
        return state;
      case actions.REMOVE_VEG_ONLY_FILTER:
        state.vegOnly = payload.value;
        state.activeMenuItems = payload.items;
        return state;
      default:
        return state;
    }
  }

  //@description    returns the index of the list item from the DOM.
  function getIndex(element, list) {
    const len = list.childNodes.length;
    for (let i = 0; i < len; i++) {
      if (list.childNodes[i] === element) {
        return i;
      }
    }
    return 0;
  }

  //   @description    toggle veg only filter
  function toggleVegOnlyFilter(e) {
    let updatedState;
    if (state.vegOnly === true) {
      updatedState = changeState(state, actions.REMOVE_VEG_ONLY_FILTER, {
        value: false,
        items: getDishByMenu(menuList[state.activeMenu]),
      });
    } else {
      updatedState = changeState(state, actions.SET_VEG_ONLY_FILTER, true);
    }

    state = updatedState;

    render();
  }

  //@description    Updates the active menu index when menu is changed.
  function updateActiveIndex(e) {
    const item = e.target || 0;
    const sidebarList = document.querySelector(".sidebar__list");
    const index = getIndex(item, sidebarList);
    const menuItems = getDishByMenu(menuList[index]);

    const updatedState = changeState(state, actions.CHANGE_ACTIVE_MENU, {
      index,
      menuItems,
    });
    state = updatedState;
    render();
  }

  //@description Adds an item to the cart
  function addToCart(e) {
    const btn = e.target;

    if (btn.classList[0] === "list__item__dish-btn") {
      const targetItem = btn.parentElement.parentElement;
      const contentList = document.querySelector(".content__list");
      const index = getIndex(targetItem, contentList);

      const { isVeg, name, price } = state.activeMenuItems[index];

      const updatedState = changeState(state, actions.ADD_TO_CART, {
        isVeg,
        name,
        price,
        qty: 1,
      });
      state = updatedState;

      render();
    }
  }

  //@description Increase the count in cart
  function increaseCount(btn) {
    const target = btn.parentElement.parentElement.parentElement.parentElement;
    const contentList = document.querySelector(".content__list");
    const idx = getIndex(target, contentList);
    const { name } = state.activeMenuItems[idx];

    for (let index = 0; index < state.cart.length; index++) {
      if (state.cart[index].name === name) {
        const updatedState = changeState(
          state,
          actions.INCREASE_COUNT_IN_CART,
          index
        );
        state = updatedState;

        render();
        return;
      }
    }
  }

  //@description    Decrease the count in cart
  function decreaseCount(btn) {
    const target = btn.parentElement.parentElement.parentElement.parentElement;
    const contentList = document.querySelector(".content__list");
    const idx = getIndex(target, contentList);
    const { name } = state.activeMenuItems[idx];

    for (let index = 0; index < state.cart.length; index++) {
      if (state.cart[index].name === name) {
        const updatedState = changeState(
          state,
          actions.DECREASE_COUNT_IN_CART,
          index
        );
        state = updatedState;

        render();
        return;
      }
    }
  }

  //@description    Decrease the count in cart from content
  function decreaseCountFromContent(e) {
    let btn = e.target;
    if (btn.classList[0] === "content__list__items__btn") {
      btn = btn.childNodes[0];
    }
    if (btn.classList[1] === "fa-minus") {
      decreaseCount(btn);
    }
  }

  //@description    Increase the count in cart from content
  function increaseCountFromContent(e) {
    let btn = e.target;
    if (btn.classList[0] === "content__list__items__btn") {
      btn = btn.childNodes[0];
    }
    if (btn.classList[1] === "fa-plus") {
      increaseCount(btn);
    }
  }

  //@description    Decrease the count in cart from cart
  function decreaseCountFromCart(e) {
    let btn = e.target;
    if (btn.classList[0] === "cart__list__items__btn") {
      btn = btn.childNodes[0];
    }
    if (btn.classList[1] === "fa-minus") {
      decreaseCount(btn);
    }
  }

  //@description    Increase the count in cart from cart
  function increaseCountFromCart(e) {
    let btn = e.target;
    if (btn.classList[0] === "cart__list__items__btn") {
      btn = btn.childNodes[0];
    }
    if (btn.classList[1] === "fa-plus") {
      increaseCount(btn);
    }
  }

  //@description    Clears the DOM (the parts which are rendered dynamically)
  function clearList() {
    const contentList = document.querySelector(".content__list");
    contentList.innerHTML = "";
    const sidebarList = document.querySelector(".sidebar__list");
    sidebarList.innerHTML = "";
    const cartList = document.querySelector(".cart__list");
    cartList.innerHTML = "";
    const cartCountHeading = document.querySelector(".cart__heading--small");
    cartCountHeading.innerHTML = "";
    const cartSummary = document.querySelector(".cart__summary");
    cartSummary.innerHTML = "";
    const cartBtn = document.querySelector(".cart__btn");
    cartBtn.style.display = "none";
  }

  //@description    renders the menu items in the sidebar
  function renderSidebarMenuItems(item, index) {
    const sidebarList = document.querySelector(".sidebar__list");

    let sidebarListItem = document.createElement("li");
    sidebarListItem.setAttribute("class", "sidebar__list__item");
    if (index === state.activeMenu) {
      sidebarListItem.classList.add("sidebar__list__item--active");
    }
    sidebarListItem.innerHTML = item;
    sidebarList.appendChild(sidebarListItem);
  }

  //@description    renders the dishes in the content section
  function renderMenuItems(item) {
    let qty;
    for (let i = 0; i < state.cart.length; i++) {
      if (item.name === state.cart[i].name) {
        qty = state.cart[i].qty;
        break;
      }
    }
    const contentList = document.querySelector(".content__list");

    const { isVeg, name, price, description, image } = item;

    let contentListItem = document.createElement("li");
    contentListItem.setAttribute("class", "content__list__item");
    contentListItem.innerHTML = `
      <div class="content__list__item--text">
          ${
            isVeg === false
              ? '<p class="non-veg"><i class="fa-solid fa-square-caret-up"></i></p>'
              : '<p class="veg"><i class="fa-solid fa-circle-stop"></i></p>'
          }
          <p class="list__item__dish-name">
              ${name}
          </p>
          <p class="list__item__dish-price">&#x20B9; ${price}</p>
          <p class="list__item__dish-items">
              ${description}
          </p>
      </div>
      <div class="content__list__item__img-container">
          <img
              class="list__item__dish-image"
              src=${image}
              alt="food-image"
          />
          ${
            qty
              ? '<div class="content__list__items__buttons"><button class="content__list__items__btn"><i class="fa-solid fa-minus"></i></button><button class="content__list__items__value">' +
                qty +
                '</button><button class="content__list__items__btn"><i class="fa-solid fa-plus"></i></button></div>'
              : '<button class="list__item__dish-btn">ADD</button>'
          }
      </div>
      `;
    contentList.appendChild(contentListItem);
  }

  //@description    renders the heading of currently selected menu
  function renderMenuHeading() {
    const contentHeading = document.querySelector(".content__heading");
    contentHeading.innerHTML = `
      <h1 class="content__heading--big">${menuList[state.activeMenu]}</h1>
      <p class="content__heading--small">${
        state.activeMenuItems.length
      } ITEMS</p>
      `;
  }

  //@description    renders the items in the cart
  function renderCartItems(item) {
    const cartList = document.querySelector(".cart__list");
    const { name, isVeg, price, qty } = item;

    const cartItem = document.createElement("li");
    cartItem.setAttribute("class", "cart__list__items");

    cartItem.innerHTML = `
    ${
      isVeg === false
        ? '<p class="non-veg"><i class="fa-solid fa-square-caret-up"></i></p>'
        : '<p class="veg"><i class="fa-solid fa-circle-stop"></i></p>'
    }
        <p class="cart__list__items__heading">
            ${name}
        </p>
        <div class="cart__list__items__buttons">
            <button class="cart__list__items__btn">
                <i class="fa-solid fa-minus"></i>
            </button>
            <button class="cart__list__items__value">${qty}</button>
            <button class="cart__list__items__btn">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>

        <p class="cart__list__items__price">&nbsp; &#x20B9; ${price * qty}</p>
      `;

    cartList.appendChild(cartItem);
  }

  //@description    renders the count of the cart
  function renderCartCount() {
    const cartCountHeading = document.querySelector(".cart__heading--small");

    let totalItemsInCart = 0;
    for (let i = 0; i < state.cart.length; i++) {
      totalItemsInCart += state.cart[i].qty;
    }

    if (state.cart.length >= 1) {
      cartCountHeading.innerHTML = `
            ${totalItemsInCart} Items
          `;
    }
  }

  //@description    renders the summary of the cart
  function renderCartSummary() {
    const cartSummary = document.querySelector(".cart__summary");

    if (state.cart.length >= 1) {
      let totalCost = 0;
      for (let i = 0; i < state.cart.length; i++) {
        totalCost += state.cart[i].price * state.cart[i].qty;
      }
      cartSummary.innerHTML = `
            <div class="cart__summary__heading">
              <p class="cart__summary__heading--primary">Subtotal</p>
              <p class="cart__summary__heading--secondary">
                Extra charges may apply
              </p>
            </div>
            <p class="cart__summary__price">&#x20B9; ${totalCost}</p>
          `;
    }
  }

  //@description    renders the checkout of the cart
  function renderCheckoutButton() {
    const btn = document.querySelector(".cart__btn");

    if (state.cart.length >= 1) {
      btn.style.display = "block";
    }
  }

  //@description    renders when the cart is empty
  function renderEmptyCart() {
    const cartElement = document.querySelector(".cart");

    const len = cartElement.childNodes.length;
    const lastChildElement =
      cartElement.childNodes[len - 1] &&
      cartElement.childNodes[len - 1].classList &&
      cartElement.childNodes[len - 1].classList[0];
    if (lastChildElement === "cart__empty__container") {
      cartElement.removeChild(cartElement.childNodes[len - 1]);
    }
    if (state.cart.length === 0) {
      const emptyCartElement = document.createElement("div");
      emptyCartElement.setAttribute("class", "cart__empty__container");
      emptyCartElement.innerHTML = `
            <img src=${cartEmpty} alt="empty cart" class="cart__img"/>
            <p class="cart__empty__text">Good food is always cooking! Go ahead, order some yummy items from the menu.</p>
        `;

      cartElement.appendChild(emptyCartElement);
    }
  }

  //@description    renders the dynamically rendered elements in the DOM
  function render() {
    // clearing
    clearList();

    //rendering
    for (let i = 0; i < menuList.length; i++) {
      renderSidebarMenuItems(menuList[i], i);
    }

    renderMenuHeading();
    for (let i = 0; i < state.activeMenuItems.length; i++) {
      renderMenuItems(state.activeMenuItems[i]);
    }

    renderCartCount();
    for (let i = 0; i < state.cart.length; i++) {
      renderCartItems(state.cart[i]);
    }
    renderCartSummary();
    renderCheckoutButton();
    renderEmptyCart();
  }

  // function onUnmount() {
  //   // clean up code
  // }

  //@description    All initialization and event listeners are added here.
  function init() {
    const sidebarList = document.querySelector(".sidebar__list");
    sidebarList.addEventListener("click", updateActiveIndex);

    const contentList = document.querySelector(".content__list");
    contentList.addEventListener("click", addToCart);
    contentList.addEventListener("click", increaseCountFromContent);
    contentList.addEventListener("click", decreaseCountFromContent);

    const cartList = document.querySelector(".cart__list");
    cartList.addEventListener("click", increaseCountFromCart);
    cartList.addEventListener("click", decreaseCountFromCart);
    state.activeMenuItems = getDishByMenu(menuList[0]);

    const vegOnlyFilter = document.getElementById("veg-only");
    vegOnlyFilter.addEventListener("click", toggleVegOnlyFilter);

    render();
  }

  window.onload = function () {
    init();
  };
})();
