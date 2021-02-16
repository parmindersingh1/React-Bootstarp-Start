import { combineReducers } from "redux";
import layoutReducer from "./layout/reducer";
import loaderReducer from "./loader/reducer";

export const rootReducer = combineReducers({
  layout: layoutReducer,
  loader: loaderReducer,
});
