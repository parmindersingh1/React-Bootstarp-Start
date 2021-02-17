import * as serviceWorker from "./serviceWorker";

import store, { persistor } from "./store";

import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import config from "./config";
import initApp from "./utils/initApp";

initApp(store, axios);

const app = (
  <Provider store={store}>
    {/* <PersistGate persistor={persistor}> */}
      <BrowserRouter basename={config.basename}>
        {/* basename="/datta-able" */}
        <App />
      </BrowserRouter>
    {/* </PersistGate> */}
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
