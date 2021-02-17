import { act } from "react-dom/test-utils";
import { checkPropTypes } from "prop-types";
import { configureStore } from "@reduxjs/toolkit";
import { middleware } from "./../store";
import { rootReducer } from "./../store/rootReducer";

export const findByTestAttr = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
}

export const checkProps = (component, expectedProps) => {
    const propsErr = checkPropTypes(
      component.propTypes,
      expectedProps,
      "props",
      component.name
    );
    return propsErr;
  };

  // Use this in your test after mounting if you want the query to finish and update the wrapper
export async function waitForUpdateWrapper(wrapper) {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    wrapper.update();
  });
}

export const testStore = (initialState) => {
  // const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  // return createStoreWithMiddleware(rootReducer, initialState);
  return configureStore({
    reducer: rootReducer,
    middleware,
    devTools: process.env.NODE_ENV !== "production",
  });
};

export const setHookState = (newState) =>
  jest.fn().mockImplementation((state) => [newState, (newState) => {}]);
