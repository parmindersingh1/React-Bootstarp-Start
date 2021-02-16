import { hideLoader, loading, showLoader } from "../store/loader/actions";

import { env } from "../env";

export default function initApp(store, axios) {
  axios.defaults.baseURL = env.exchangeUrl;
  axios.interceptors.request.use(
    (config) => {
      store.dispatch(showLoader());
      return config;
    },
    (err) => Promise.reject(err)
  );

  axios.interceptors.response.use(
    (response) => {
      store.dispatch(hideLoader());

      return response;
    },
    (error) => {
      // if (error && error.response && 401 === error.response.status) {
      //   store.dispatch({ type: actionTypes.Logout });
      // }
      store.dispatch(hideLoader());
      return Promise.reject({ ...error });
    }
  );
}
