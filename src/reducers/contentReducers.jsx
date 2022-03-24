import {
  SET_ACTIVE_MENU_ITEMS,
  SET_QTY_BY_ID,
} from "../constants/contentConstants";

export const activeMenuItemsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ACTIVE_MENU_ITEMS:
      return action.payload;
    case SET_QTY_BY_ID:
      return state.map((item) => {
        if (item.id === action.payload.id) {
          const newItem = { ...item };
          newItem.qty = action.payload.qty;
          return newItem;
        }
        return item;
      });
    default:
      return state;
  }
};
