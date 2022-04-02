import {
  CART_ADD_ITEM,
  CART_SET_ITEM_QTY,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEM_REQUEST,
  CART_CLEAR_ITEM_SUCCESS,
} from "../constants/cartConstants";

export const addToCart = (item) => (dispatch) => {
  try {
    dispatch({ type: CART_ADD_ITEM, payload: item });
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = (id) => (dispatch) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: id });
};

export const clearCart = () => async (dispatch) => {
  try {
    dispatch({ type: CART_CLEAR_ITEM_REQUEST });
    setTimeout(() => {
      dispatch({ type: CART_CLEAR_ITEM_SUCCESS });
    }, 2000);
  } catch (error) {
    console.log(error);
  }
};

export const setCartItemQtyById = (id, qty) => (dispatch) => {
  dispatch({ type: CART_SET_ITEM_QTY, payload: { id, qty } });
};
