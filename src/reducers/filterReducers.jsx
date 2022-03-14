import {
  SET_ACTIVE_MENU_INDEX,
  SET_INPUT_VALUE,
  SET_VEG_ONLY,
} from "../constants/filterConstants";

export const activeMenuIndexReducer = (state = 0, action) => {
  switch (action.type) {
    case SET_ACTIVE_MENU_INDEX:
      return action.payload;
    default:
      return state;
  }
};

export const inputValueReducer = (state = "", action) => {
  switch (action.type) {
    case SET_INPUT_VALUE:
      return action.payload;
    default:
      return state;
  }
};

export const vegOnlyReducer = (state = false, action) => {
  switch (action.type) {
    case SET_VEG_ONLY:
      return action.payload;
    default:
      return state;
  }
};
