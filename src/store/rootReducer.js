import { combineReducers } from "redux";
import layoutReducer from "./layout/reducer";
import loaderReducer from "./loader/reducer";
import { eventRegistrySlice } from "./event-registry/eventRegistrySlice";
import { apiRegistrySlice } from "./api-registry/apiRegistrySlice";

export const rootReducer = combineReducers({
  layout: layoutReducer,
  loader: loaderReducer,
  events: eventRegistrySlice.reducer,
  api: apiRegistrySlice.reducer
});
