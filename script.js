//IIFE
(function swiggyClone() {
  //Model
  model = {
    activeMenuIndex: 0,
    actions: {
      CHANGE_ACTIVE_MENU: "CHANGE_ACTIVE_MENU",
    },
    sidebarList: [
      "recommended",
      "platters",
      "starters",
      "family binge packs",
      "main course",
      "rice & indian breads",
      "premium thalis",
      "deserts & beverages",
      "accomniments",
    ],
    sidebarListItems: {
      recommended: [
        {
          isVeg: false,
          name: "Premium Butter Chicken Roti Thali",
          price: 289,
          details:
            "Butter Chicken , 2 nos roti served with pickle , raita ,gulab jamun, 2 Pcs Chicken Tikka",
          imgLocation: "./images/dishes/premium-butter-chicken-roti-thali.jpeg",
        },
        {
          isVeg: true,
          name: "Veg Platter",
          price: 699,
          details:
            "An authentic veg platter with 3 pieces of Paneer Achari, 3 pieces of Hara Bhara, 3 pieces of Veg Seekh and 3 pieces of Malai Chaap.",
          imgLocation: "./images/dishes/veg-platter.jpeg",
        },
        {
          isVeg: false,
          name: "Non Veg Platter",
          price: 899,
          details:
            "An authentic non veg platter with 3 pieces of Barnala Mathi Chicken Tikka, 3 pieces of Dhaniya Chicken, 3 pieces of Tawa Chicken and 3 pieces of Chicken Kebab.",
          imgLocation: "./images/dishes/non-veg-platter.jpeg",
        },
      ],
      platters: [
        {
          isVeg: false,
          name: "Mixed Platter",
          price: 799,
          details:
            "An authentic mixed platter with 3 pieces of Barnala Methi Chicken, 3 pieces of Chicken Kebab, 3 pieces of Hara Bhara and 3 pieces of Paneer Tikka.",
          imgLocation: "./images/dishes/mixed-platter.jpeg",
        },
        {
          isVeg: true,
          name: "Veg Platter",
          price: 699,
          details:
            "An authentic veg platter with 3 pieces of Paneer Achari, 3 pieces of Hara Bhara, 3 pieces of Veg Seekh and 3 pieces of Malai Chaap.",
          imgLocation: "./images/dishes/veg-platter.jpeg",
        },
      ],
      starters: [
        {
          isVeg: true,
          name: "Paneer Malai Tikka",
          price: 239,
          details: "Slow-cooked Paneer Tikka mildly flavoured with rich cream.",
          imgLocation: "./images/dishes/paneer-malai-tikka.jpeg",
        },
        {
          isVeg: false,
          name: "Dhaniya Chicken Tikka",
          price: 249,
          details:
            "Succulent chicken marinated & flavoured with fresh coriander, grilled to perfection.",
          imgLocation: "./images/dishes/dhaniya-chicken-tikka.jpeg",
        },
      ],
      "family binge packs": [
        {
          isVeg: false,
          name: "Dhaniya Chicken Tikka",
          price: 249,
          details:
            "Succulent chicken marinated & flavoured with fresh coriander, grilled to perfection.",
          imgLocation: "./images/dishes/dhaniya-chicken-tikka.jpeg",
        },
      ],
      "main course": [
        {
          isVeg: false,
          name: "Butter Chicken",
          price: 249,
          details:
            "A classic chicken dish prepared in a rich sauce of tomato, butter and cream.",
          imgLocation: "./images/dishes/butter-chicken.jpeg",
        },
      ],
      "rice & indian breads": [
        {
          isVeg: true,
          name: "Naan",
          price: 40,
          details: "A leavened flatbread cooked in a tandoor (clay oven).",
          imgLocation: "./images/dishes/naan.jpeg",
        },
      ],
      "premium thalis": [
        {
          isVeg: false,
          name: "Premium Butter Chicken Roti Thali",
          price: 289,
          details:
            "Butter Chicken , 2 nos roti served with pickle , raita ,gulab jamun, 2 Pcs Chicken Tikka",
          imgLocation: "./images/dishes/premium-butter-chicken-roti-thali.jpeg",
        },
      ],
      "deserts & beverages": [
        {
          isVeg: true,
          name: "Gulab Jamun",
          price: 99,
          details:
            "Sweet and sumptuous dough balls soaked in cinnamon flavoured sugar syrup.",
          imgLocation: "./images/dishes/gulab-jamun.jpeg",
        },
      ],
      accomniments: [
        {
          isVeg: true,
          name: "Raita",
          price: 69,
          details: "A delish side dish made with fresh curd and vegetables.",
          imgLocation: "./images/dishes/raita.jpeg",
        },
      ],
    },

    cart: [],
  };

  //View
  view = {
    clearList: function () {
      const contentList = document.querySelector(".content__list");
      contentList.innerHTML = "";
      const sidebarList = document.querySelector(".sidebar__list");
      sidebarList.innerHTML = "";
    },

    renderSidebarMenuItems: function (item, index, activeIndex) {
      const sidebarList = document.querySelector(".sidebar__list");

      let sidebarListItem = document.createElement("li");
      sidebarListItem.setAttribute("class", "sidebar__list__item");
      if (index === activeIndex) {
        sidebarListItem.classList.add("sidebar__list__item--active");
      }
      sidebarListItem.innerHTML = item;
      console.log(item);
      sidebarList.appendChild(sidebarListItem);
    },

    renderMenuHeading: function (activeIndex) {
      const contentHeading = document.querySelector(".content__heading");
      contentHeading.innerHTML = `
        <h1 class="content__heading--big">${model.sidebarList[activeIndex]}</h1>
        <p class="content__heading--small">${
          model.sidebarListItems[model.sidebarList[activeIndex]].length
        } ITEMS</p>
        `;
    },

    renderMenuItems: function (item) {
      const contentList = document.querySelector(".content__list");

      const { isVeg, name, price, details, imgLocation } = item;

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
                ${details}
            </p>
        </div>
        <div class="content__list__item__img-container">
            <img
                class="list__item__dish-image"
                src=${imgLocation}
                alt="food-image"
            />
            <button class="list__item__dish-btn">ADD</button>
        </div>
        `;

      contentList.appendChild(contentListItem);
    },

    render: function (sidebarList, menuItems, activeIndex) {
      this.clearList();

      this.renderMenuHeading(activeIndex);
      for (let i = 0; i < sidebarList.length; i++) {
        this.renderSidebarMenuItems(sidebarList[i], i, activeIndex);
      }

      for (let i = 0; i < menuItems.length; i++) {
        this.renderMenuItems(menuItems[i]);
      }
    },
  };

  //Controller
  controller = {
    init: function () {
      const sidebarList = document.querySelector(".sidebar__list");
      sidebarList.addEventListener("click", this.updateActiveIndex);
      this.getListItems(model.activeMenuIndex);
    },
    getIndex: function (element) {
      const sidebarList = document.querySelector(".sidebar__list");
      const len = sidebarList.childNodes.length;
      for (let i = 0; i < len; i++) {
        if (sidebarList.childNodes[i] === element) {
          return i;
        }
      }
      return 0;
    },
    updateActiveIndex: function (e) {
      console.log(e.target);
      const item = e.target;
      const index = controller.getIndex(item);

      const updatedModel = controller.changeModel(
        model,
        model.actions.CHANGE_ACTIVE_MENU,
        index
      );
      model = updatedModel;
      controller.getListItems(index);
    },
    getListItems: function (activeMenuIndex) {
      const activeIndex = activeMenuIndex;
      const sidebarList = model.sidebarList;
      const menuItems = model.sidebarListItems[model.sidebarList[activeIndex]];
      view.render(sidebarList, menuItems, activeIndex);
    },
    changeModel: function (state, action, payload) {
      switch (action) {
        case model.actions.CHANGE_ACTIVE_MENU:
          state.activeMenuIndex = payload;
          return state;
        default:
          return state;
      }
    },
  };

  window.onload = function () {
    controller.init();
  };
})();
