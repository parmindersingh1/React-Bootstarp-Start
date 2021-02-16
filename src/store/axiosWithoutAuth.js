import axios from "axios";

let axiosWithoutAuth = axios.create();
delete axiosWithoutAuth.defaults.headers.common["Authorization"];

export default axiosWithoutAuth;