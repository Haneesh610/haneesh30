import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  EMPTY_CART,
  ORDER_HISTORY,
  ADMIN_LOGIN,
  FETCH_ADMIN_DATA,
} from "./constant";

export const addToCart = (data) => ({
  type: ADD_TO_CART,
  payload: data,
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

export const updateCartQuantity = (id, quantity) => ({
  type: UPDATE_CART_QUANTITY,
  payload: { id, quantity },
});

export const fetchCart = () => ({
  type: FETCH_PRODUCTS,
});

export const fetchCartSuccess = (cart) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: cart,
});

export const fetchCartFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const registerUser = (userData) => ({
  type: REGISTER_USER,
  payload: userData,
});

export const loginUser = (credentials) => ({
  type: LOGIN_USER,
  payload: credentials,
});

export const logoutUser = () => ({ type: LOGOUT_USER });

export const emptyCart = () => ({
  type: EMPTY_CART,
});

export const orderHistory = (order) => ({
  type: ORDER_HISTORY,
  payload:order
})

export const adminLogin = (credentials) => ({
  type: ADMIN_LOGIN,
  payload: credentials,
})

export const fetchAdminData = () => ({
  type: FETCH_ADMIN_DATA,
})