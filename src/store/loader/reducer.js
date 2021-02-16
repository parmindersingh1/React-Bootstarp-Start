export const actionTypes = {
  SHOW_LOADER: "[Loader] SHOW_LOADER",
  HIDE_LOADER: "[Loader] HIDE_LOADER",
};

const loaderReducer = (state = false, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADER:
      return action.data;
      break;
    case actionTypes.HIDE_LOADER:
      return action.data;
      break;
    default:
      return state;
  }
};

export default loaderReducer;
