import { env } from "../env";
import { loading } from "../store/loader/actions";

export default function initApp(store, axios) {
  axios.defaults.baseURL = env.exchangeUrl;
  axios.interceptors.request.use(
    (config) => {
      store.dispatch(loading(true));
      return config;
    },
    (err) => Promise.reject(err)
  );

  axios.interceptors.response.use(
    (response) => {
      store.dispatch(loading(false));

      return response;
    },
    (error) => {
      // if (error && error.response && 401 === error.response.status) {
      //   store.dispatch({ type: actionTypes.Logout });
      // }
      store.dispatch(loading(false));
      return Promise.reject({ ...error });
    }
  );
}
