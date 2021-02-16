import { actionTypes } from "./reducer";

export const showLoader = () => {
  return {
    type: actionTypes.SHOW_LOADER,
    data: true,
  };
};

export const hideLoader = () => {
  return {
    type: actionTypes.HIDE_LOADER,
    data: false,
  };
};
