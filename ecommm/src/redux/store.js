import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { productsReducer } from "./reducer";
import { watchFetchPRODUCTS } from "./saga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  cart: productsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(watchFetchPRODUCTS);

export default store;