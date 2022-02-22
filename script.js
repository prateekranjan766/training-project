//IIFE
import sidebarList from "./models/menuModel.js";
import getDishByMenu from "./models/dishModel.js";

sidebarList.map((item) => console.log(getDishByMenu(item)));
