import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_PRODUCTS, FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_FAILURE } from "./constant";

function fetchPRODUCTSApi() {
  return fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
}

function* fetchPRODUCTS() {
  try {
    const response = yield call(fetchPRODUCTSApi);
    yield put({ type: FETCH_PRODUCTS_SUCCESS, payload: response.products });
  } catch (error) {
    yield put({ type: FETCH_PRODUCTS_FAILURE, payload: error.message });
  }
}

export function* watchFetchPRODUCTS() {
  yield takeEvery(FETCH_PRODUCTS, fetchPRODUCTS);
}