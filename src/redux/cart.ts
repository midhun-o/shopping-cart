import { createSlice } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  price: number;
  url: string;
  quantity: number;
}

interface CartError {
  getCartItemsError: boolean;
  addToCartError: boolean;
  incrementItemError: boolean;
  decrementItemError: boolean;
  removeItemError: boolean;
  checkoutError: boolean;
}

interface CartState {
  cartItems: CartItem[];
  cartCount: number;
  cartError: CartError;
}

const INITIAL_STATE: CartState = {
  cartItems: [],
  cartCount: 0,
  cartError: {
    getCartItemsError: false,
    addToCartError: false,
    incrementItemError: false,
    decrementItemError: false,
    removeItemError: false,
    checkoutError: false,
  },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    addToCart: (state, action) => {
      if (action.payload.success) {
        const newItem = { ...action.payload.data, quantity: 1 };
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
          cartCount: state.cartCount + 1,
          cartError: { ...state.cartError, addToCartError: false },
        };
      } else {
        return {
          ...state,
          cartError: { ...state.cartError, addToCartError: true },
        };
      }
    },
    getCartItems: (state, action) => {
      if (action.payload.success) {
        return {
          ...state,
          cartItems: action.payload.data,
          cartCount: action.payload.data.length,
          cartError: { ...state.cartError, getCartItemsError: false },
        };
      } else {
        return {
          ...state,
          cartError: { ...state.cartError, getCartItemsError: true },
        };
      }
    },
    incrementItem: (state, action) => {
      if (action.payload.success) {
        const updatedItems = state.cartItems.map((item) =>
          item.id === action.payload.data.id
            ? { ...item, quantity: action.payload.data.quantity }
            : item
        );
        return {
          ...state,
          cartItems: updatedItems,
          cartError: { ...state.cartError, incrementItemError: false },
        };
      } else {
        return {
          ...state,
          cartError: { ...state.cartError, incrementItemError: true },
        };
      }
    },
    decrementItem: (state, action) => {
      if (action.payload.success) {
        const updatedItems = state.cartItems.map((item) =>
          item.id === action.payload.data.id
            ? { ...item, quantity: action.payload.data.quantity }
            : item
        );
        return {
          ...state,
          cartItems: updatedItems,
          cartError: { ...state.cartError, decrementItemError: false },
        };
      } else {
        return {
          ...state,
          cartError: { ...state.cartError, decrementItemError: true },
        };
      }
    },
    removeFromCart: (state, action) => {
      if (action.payload.success) {
        const productId = action.payload.data.id;
        const updatedCartItems = state.cartItems.filter(
          (item) => item.id !== productId
        );
        return {
          ...state,
          cartItems: updatedCartItems,
          cartCount: updatedCartItems.length,
          cartError: { ...state.cartError, removeItemError: false },
        };
      } else {
        return {
          ...state,
          cartError: { ...state.cartError, removeItemError: true },
        };
      }
    },
    checkout: (state, action) => {
      if (action.payload.success) {
        return {
          ...state,
          cartItems: [],
          cartCount: 0,
          cartError: { ...state.cartError, checkoutError: false },
        };
      } else {
        return {
          ...state,
          cartError: { ...state.cartError, checkoutError: true },
        };
      }
    },
  },
});

export const {
  addToCart,
  getCartItems,
  incrementItem,
  decrementItem,
  removeFromCart,
  checkout,
} = cartSlice.actions;

export default cartSlice.reducer;
