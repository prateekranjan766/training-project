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
    console.log(e.target);
    const item = e.target;

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

    render();
    // this.getListItems(model.activeMenuIndex);

    // const addTaskForm = document.getElementById("to-do__add-task");
    // addTaskForm.addEventListener("submit", addTodo);
    // const todoList = document.querySelector(".to-do__list");
    // todoList.addEventListener("click", removeTask);
    // todoList.addEventListener("click", editTask);
    // todoList.addEventListener("click", toggleCheck);
    // const removeBtn = document.querySelector(".remove-btn");
    // removeBtn.addEventListener("click", removeCheckedTasks);
  }

  function clearList() {
    // const contentList = document.querySelector(".content__list");
    // contentList.innerHTML = "";
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
  function render() {
    // clearing
    clearList();

    //rendering
    for (let i = 0; i < menuList.length; i++) {
      renderSidebarMenuItems(menuList[i], i);
    }
  }

  // function onUnmount() {
  //   // clean up code
  // }

  window.onload = function () {
    init();
  };
})();
