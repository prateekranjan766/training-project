import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  activeMenuIndexReducer,
  inputValueReducer,
  vegOnlyReducer,
} from "./reducers/filterReducers";

const reducer = combineReducers({
  activeMenuIndex: activeMenuIndexReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
