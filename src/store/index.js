import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import { persistStore } from "redux-persist";
import { rootReducer } from "./rootReducer";

export const middleware = [
    ...getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
        thunk: true
    }),
];

const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: process.env.NODE_ENV !== "production",
});

/**
 * @see https://github.com/rt2zz/redux-persist#persiststorestore-config-callback
 * @see https://github.com/rt2zz/redux-persist#persistor-object
 */
export const persistor = persistStore(store);

export default store;