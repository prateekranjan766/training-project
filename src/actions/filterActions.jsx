import {
  SET_ACTIVE_MENU_INDEX,
  SET_INPUT_VALUE,
  SET_VEG_ONLY,
} from "../constants/filterConstants";

export const setActiveMenuIndex = (index) => (dispatch) => {
  try {
    dispatch({ type: SET_ACTIVE_MENU_INDEX, payload: index });
  } catch (error) {
    console.log(error);
  }
};
