import menuList from "./models/menuModel.js";
import getDishByMenu from "./models/dishModel.js";

// IIFE
(function app() {
  // Action types
  const actions = {
    CHANGE_ACTIVE_MENU: "CHANGE_ACTIVE_MENU",
  };

  // State
  let state = {
    activeMenu: 0,
    activeMenuItems: [],
    cart: [
      {
        isVeg: false,
        name: "Premium Butter Chicken Roti Thali",
        price: 289,
        qty: 1,
      },
      {
        isVeg: true,
        name: "Veg Platter",
        price: 699,
        qty: 1,
      },
    ],
  };

  // Reducer
  function changeState(state, action, payload) {
    switch (action) {
      case actions.CHANGE_ACTIVE_MENU:
        state.activeMenu = payload.index;
        state.activeMenuItems = payload.menuItems;
        return state;
      default:
        return state;
    }
  }

  //@description    returns the index of the list item from the DOM.
  function getIndex(element) {
    const sidebarList = document.querySelector(".sidebar__list");
    const len = sidebarList.childNodes.length;
    for (let i = 0; i < len; i++) {
      if (sidebarList.childNodes[i] === element) {
        return i;
      }
    }
    return 0;
  }

  //@description    Updates the active menu index when menu is changed.
  function updateActiveIndex(e) {
    const item = e.target || 0;

    const index = getIndex(item);
    const menuItems = getDishByMenu(menuList[index]);

    const updatedState = changeState(state, actions.CHANGE_ACTIVE_MENU, {
      index,
      menuItems,
    });
    state = updatedState;
    render();
  }

  //@description    All initialization and event listeners are added here.
  function init() {
    const sidebarList = document.querySelector(".sidebar__list");
    sidebarList.addEventListener("click", updateActiveIndex);

    state.activeMenuItems = getDishByMenu(menuList[0]);

    render();
    // this.getListItems(activeMenuIndex);
  }

  //@description    Clears the DOM (the parts which are rendered dynamically)
  function clearList() {
    const contentList = document.querySelector(".content__list");
    contentList.innerHTML = "";
    const sidebarList = document.querySelector(".sidebar__list");
    sidebarList.innerHTML = "";
    const cartList = document.querySelector(".cart__list");
    cartList.innerHTML = "";
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
          <button class="list__item__dish-btn">ADD</button>
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

        <p class="cart__list__items__price">&nbsp; &#x20B9; ${price}</p>
      `;

    cartList.appendChild(cartItem);
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

    for (let i = 0; i < state.cart.length; i++) {
      renderCartItems(state.cart[i]);
    }
  }

  // function onUnmount() {
  //   // clean up code
  // }

  window.onload = function () {
    init();
  };
})();
