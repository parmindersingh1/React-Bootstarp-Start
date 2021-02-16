import { actionTypes } from "./reducer";

export const loading = (bool) => {
  return bool
    ? {
        type: actionTypes.SHOW_LOADER,
        data: bool,
      }
    : {
        type: actionTypes.HIDE_LOADER,
        data: bool,
      };
};
