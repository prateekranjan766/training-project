import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  activeMenuIndexReducer,
  inputValueReducer,
  vegOnlyReducer,
} from "./reducers/filterReducers";

import { activeMenuItemsReducer } from "./reducers/contentReducers";
import { cartReducer } from "./reducers/cartReducers";
import { getDishByMenu } from "./models/dishModel";
import menuList from "./models/menuModel";

const reducer = combineReducers({
  activeMenuIndex: activeMenuIndexReducer,
  vegOnly: vegOnlyReducer,
  inputValue: inputValueReducer,
  activeMenuItems: activeMenuItemsReducer,
  cart: cartReducer,
});

const initialState = {
  activeMenuIndex: 0,
  activeMenuItems: getDishByMenu(menuList[0]),
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
