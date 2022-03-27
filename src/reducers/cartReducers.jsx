import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SET_ITEM_QTY,
  CART_CLEAR_ITEM_REQUEST,
  CART_CLEAR_ITEM_SUCCESS,
} from "../constants/cartConstants";
import produce from "immer";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      return produce(state, (draft) => {
        draft.cartItems.push(action.payload);
      });
    case CART_REMOVE_ITEM:
      return produce(state, (draft) => {
        draft.cartItems.splice(
          draft.cartItems.findIndex((item) => item.id === action.payload),
          1
        );
      });
    case CART_CLEAR_ITEM_REQUEST:
      return produce(state, (draft) => {
        draft.loading = true;
      });
    case CART_CLEAR_ITEM_SUCCESS:
      return produce(state, (draft) => {
        draft.loading = false;
        draft.cartItems = [];
      });
    case CART_SET_ITEM_QTY:
      return produce(state, (draft) => {
        const idx = draft.cartItems.findIndex(
          (item) => item.id === action.payload.id
        );
        if (idx !== undefined) {
          draft.cartItems[idx].qty = action.payload.qty;
        }
      });
    default:
      return state;
  }
};
