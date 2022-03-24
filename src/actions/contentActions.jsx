import {
  SET_ACTIVE_MENU_ITEMS,
  SET_QTY_BY_ID,
} from "../constants/contentConstants";

export const setActiveMenuItems = (items) => (dispatch) => {
  try {
    dispatch({ type: SET_ACTIVE_MENU_ITEMS, payload: items });
  } catch (error) {
    console.log(error);
  }
};

export const setQuantityByID = (id, qty) => (dispatch) => {
  dispatch({ type: SET_QTY_BY_ID, payload: { id, qty } });
};
