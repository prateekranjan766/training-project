import menuList from "./models/menuModel.js";
import getDishByMenu from "./models/dishModel.js";

// IIFE
(function todoApp() {
  // Action types
  const actions = {
    CHANGE_ACTIVE_MENU: "CHANGE_ACTIVE_MENU",
  };

  // State
  let state = {
    activeMenu: 0,
    activeMenuItems: [],
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

  function init() {
    const sidebarList = document.querySelector(".sidebar__list");
    sidebarList.addEventListener("click", updateActiveIndex);

    state.activeMenuItems = getDishByMenu(menuList[0]);

    render();
    // this.getListItems(activeMenuIndex);
  }

  function clearList() {
    const contentList = document.querySelector(".content__list");
    contentList.innerHTML = "";
    const sidebarList = document.querySelector(".sidebar__list");
    sidebarList.innerHTML = "";
  }

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

  function renderMenuItems(item) {
    const contentList = document.querySelector(".content__list");

    const { isVeg, name, price, description, image } = item;

    let contentListItem = document.createElement("li");
    contentListItem.setAttribute("class", "content__list__item");
    contentListItem.innerHTML = `
      <div class="content__list__item--text">
          ${
            isVeg
              ? '<p class="veg"><i class="fa-solid fa-circle-stop"></i></p>'
              : '<p class="non-veg"><i class="fa-solid fa-square-caret-up"></i></p>'
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

  function render() {
    // clearing
    clearList();

    //rendering
    for (let i = 0; i < menuList.length; i++) {
      renderSidebarMenuItems(menuList[i], i);
    }

    for (let i = 0; i < state.activeMenuItems.length; i++) {
      renderMenuItems(state.activeMenuItems[i]);
    }
  }

  // function onUnmount() {
  //   // clean up code
  // }

  window.onload = function () {
    init();
  };
})();
