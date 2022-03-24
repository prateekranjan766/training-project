import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SET_ITEM_QTY,
  CART_CLEAR_ITEM_REQUEST,
  CART_CLEAR_ITEM_SUCCESS,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      return { ...state, cartItems: [...state.cartItems, action.payload] };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case CART_CLEAR_ITEM_REQUEST:
      return { ...state, loading: true };
    case CART_CLEAR_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        cartItems: [],
      };
    case CART_SET_ITEM_QTY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.id === action.payload.id) {
            const newItem = { ...item };
            newItem.qty = action.payload.qty;
            return newItem;
          }

          return item;
        }),
      };
    default:
      return state;
  }
};
