//IIFE
(function swiggyClone() {
  //Model
  model = {
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

    renderSidebarMenuItems: function (item) {
      const sidebarList = document.querySelector(".sidebar__list");

      let sidebarListItem = document.createElement("li");
      sidebarListItem.setAttribute("class", "sidebar__list__item");
      //   if the menu is active use this class-> .sidebar__list__item--active
      sidebarListItem.innerHTML = item;
      console.log(item);
      sidebarList.appendChild(sidebarListItem);
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

    render: function (sidebarList, menuItems) {
      this.clearList();

      for (let i = 0; i < sidebarList.length; i++) {
        this.renderSidebarMenuItems(sidebarList[i]);
      }

      for (let i = 0; i < menuItems.length; i++) {
        this.renderMenuItems(menuItems[i]);
      }
    },
  };

  //Controller
  controller = {
    init: function () {
      this.getListItems("recommended");
    },

    getListItems: function (menuType) {
      const sidebarList = model.sidebarList;
      const menuItems = model.sidebarListItems[menuType];
      view.render(sidebarList, menuItems);
    },
  };

  window.onload = function () {
    controller.init();
  };
})();
