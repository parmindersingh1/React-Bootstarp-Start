import { combineReducers } from "redux";
import layoutReducer from "./layout/reducer";
import loaderReducer from "./loader/reducer";
import { eventRegistrySlice } from "./event-registry/eventRegistrySlice";

export const rootReducer = combineReducers({
  layout: layoutReducer,
  loader: loaderReducer,
  events: eventRegistrySlice.reducer,
});
