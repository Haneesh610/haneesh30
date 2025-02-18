import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
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

const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  products: [],
  error: null,
  adminData: {
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
  },
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      let updatedCart;
      if (existingItem) {
        updatedCart = state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }

      if (state.currentUser) {
        const updatedUsersAdd = state.users.map((user) =>
          user.email === state.currentUser.email
            ? { ...user, cart: updatedCart }
            : user
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        localStorage.setItem("users", JSON.stringify(updatedUsersAdd));
        return {
          ...state,
          users: updatedUsersAdd,
          cart: updatedCart,
        };
      }

      // return {
      //   ...state,
      //   cart: updatedCart,
      // };

    case REMOVE_FROM_CART:
      const filteredCart = state.cart.filter(
        (item) => item.id !== action.payload
      );

      if (state.currentUser) {
        const updatedUsersRemove = state.users.map((user) =>
          user.email === state.currentUser.email
            ? { ...user, cart: filteredCart }
            : user
        );
        localStorage.setItem("cart", JSON.stringify(filteredCart));
        localStorage.setItem("users", JSON.stringify(updatedUsersRemove));

        return {
          ...state,
          users: updatedUsersRemove,
          cart: filteredCart,
        };
      }

      // return {
      //   ...state,
      //   cart: filteredCart,
      // };

    case UPDATE_CART_QUANTITY:
      const updatedCartQuantity = state.cart.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      if (state.currentUser) {
        const updatedUsersQuantity = state.users.map((user) =>
          user.email === state.currentUser.email
            ? { ...user, cart: updatedCartQuantity }
            : user
        );
        localStorage.setItem("cart", JSON.stringify(updatedCartQuantity));
        localStorage.setItem("users", JSON.stringify(updatedUsersQuantity));

        return {
          ...state,
          users: updatedUsersQuantity,
          cart: updatedCartQuantity,
        };
      }

      return {
        ...state,
        cart: updatedCartQuantity,
      };

    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        error: null,
      };

    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case REGISTER_USER:
      const isExistingUser = state.users.some(
        (user) => user.email === action.payload.email
      );
      if (isExistingUser) {
        return {
          ...state,
          error: "User already exists!",
        };
      } else {
        const newUsers = [...state.users, { ...action.payload, cart: [] }];
        localStorage.setItem("users", JSON.stringify(newUsers));

        return {
          ...state,
          users: newUsers,
          error: null,
        };
      }

    case LOGIN_USER:
      const user = state.users.find(
        (u) =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        localStorage.setItem("cart", JSON.stringify(user.cart || []));
        return {
          ...state,
          currentUser: user,
          cart: user.cart || [],
          error: null,
        };
      } else {
        return {
          ...state,
          currentUser: null,
          error: "Invalid credentials",
        };
      }

    case LOGOUT_USER:
      localStorage.removeItem("currentUser");
      localStorage.removeItem("cart");
      return {
        ...state,
        currentUser: null,
        cart: [],
      };

    case EMPTY_CART:
      const updatedUsersEmpty = state.users.map((user) =>
        user.email === state.currentUser?.email ? { ...user, cart: [] } : user
      );
      localStorage.setItem("cart", JSON.stringify([]));
      localStorage.setItem("users", JSON.stringify(updatedUsersEmpty));

      return {
        ...state,
        users: updatedUsersEmpty,
        cart: [],
      };

    case ORDER_HISTORY:
      const order = {
        ...action.payload,
        date: new Date().toLocaleString(),
      };

      if (state.currentUser) {
        const updatedUsers = state.users.map((user) =>
          user.email === state.currentUser.email
            ? { ...user, orders: [...(user.orders || []), order] }
            : user
        );

        localStorage.setItem("users", JSON.stringify(updatedUsers));
        const updatedCurrentUser = {
          ...state.currentUser,
          orders: [...(state.currentUser.orders || []), order],
        };
        localStorage.setItem("currentUser", JSON.stringify(updatedCurrentUser));

        return {
          ...state,
          users: updatedUsers,
          currentUser: updatedCurrentUser,
        };
      }
      return state;

    case ADMIN_LOGIN:
      const { id, password } = action.payload;
      const adminCredentials = {
        id: "q1w2e3",
        password: "6969",
        role: "admin",
      };

      if (
        id === adminCredentials.id &&
        password === adminCredentials.password
      ) {
        localStorage.setItem("currentUser",JSON.stringify(adminCredentials))
        return {
          ...state,
          currentUser: adminCredentials,
          error: null,
        };
      } else {
        return {
          ...state,
          error: "Invalid credentials",
        };
      }

    case FETCH_ADMIN_DATA:
      const data = {
        totalUsers: state.users.length,
        
        totalOrders: state.users.reduce(
          (acc, user) => acc + (user.orders?.length || 0),
          0
        ),
        
        totalItemsSold:state.users.reduce((acc, user) => {
          const itemsSold = user.orders?.reduce((orderAcc, order) => {
            const totalItemsInOrder = order.items?.reduce((itemAcc, item) => {
              return itemAcc + item.quantity;
            }, 0) || 0;
            return orderAcc + totalItemsInOrder;
          }, 0) || 0;
          return acc + itemsSold;
        }, 0),
        
        totalRevenue: state.users.reduce((acc, user) => {
          const userRevenue = user.orders?.reduce((orderAcc, order) => {
            const orderTotal = order.total * 15;
            return orderAcc + orderTotal;
          }, 0) || 0;
          return acc + userRevenue;
        }, 0),
        
        paymentModeStats: state.users.reduce((acc, user) => {
          user.orders?.forEach(order => {
            const mode = order.paymentMethod || "unknown";
            acc[mode] = (acc[mode] || 0) + 1;
          });
          return acc;
        }, {}),
      };
      
      const totalOrdersCount = data.totalOrders;
      const paymentModePercentages = Object.keys(data.paymentModeStats).reduce((acc, mode) => {
        acc[mode] = ((data.paymentModeStats[mode] / totalOrdersCount) * 100).toFixed(2);
        return acc;
      }, {});

      return {
        ...state,
        adminData: {
          ...data,
          paymentModePercentages,
          totalRevenue: data.totalRevenue.toFixed(2),
        },
        error: null,
      };

    default:
      return state;
  }
};