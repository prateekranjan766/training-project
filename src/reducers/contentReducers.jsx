import {
  SET_ACTIVE_MENU_ITEMS,
  SET_QTY_BY_ID,
} from "../constants/contentConstants";
import produce from "immer";

export const activeMenuItemsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ACTIVE_MENU_ITEMS:
      return action.payload;
    case SET_QTY_BY_ID:
      return produce(state, (draft) => {
        const idx = draft.findIndex((item) => item.id === action.payload.id);
        if (idx !== undefined && idx >= 0) {
          draft[idx].qty = action.payload.qty;
        }
      });
    default:
      return state;
  }
};
