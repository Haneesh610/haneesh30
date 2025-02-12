export const selectCartItems = (state) => state.cart.cart || [];
export const selectCartTotal = (state) => {
  const cartItems = selectCartItems(state);
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};
export const selectCartError = (state) => state.cart.error || null;
export const selectProducts = (state) => state.cart.products || [];
export const selectCurrentUser = (state) => state.cart.currentUser;
export const selectUsers = (state) => state.cart.users;