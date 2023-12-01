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
  },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: INITIAL_STATE,
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push({ ...action.payload, quantity: 1 });
      const newState = state;
      newState.cartCount += 1;
    },
    getCartItems: (state, action) => {
      const newState = { ...state };
      newState.cartItems = action.payload;
      newState.cartCount = newState.cartItems.length;
      return newState;
    },
    incrementItem: (state, action) => {
      const productId = action.payload.id;
      state.cartItems.forEach((item) => {
        if (item.id === productId) {
          const product = item;
          product.quantity = action.payload.quantity;
        }
      });
    },
    decrementItem: (state, action) => {
      const productId = action.payload.id;
      state.cartItems.forEach((item) => {
        if (item.id === productId) {
          const product = item;
          product.quantity = action.payload.quantity;
        }
      });
    },
    removeFromCart: (state, action) => {
      const productId: number = action.payload.id;
      const newState = { ...state };
      newState.cartItems = state.cartItems.filter(
        (item) => item.id !== productId
      );
      newState.cartCount = newState.cartItems.length;
      return newState;
    },
    checkout: (state) => {
      const newState = { ...state };
      newState.cartItems = [];
      newState.cartCount = 0;
      return newState;
    },
    updateError: (state, action) => {
      const newState = { ...state };
      newState.cartError = action.payload;
      return newState;
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
  updateError,
} = cartSlice.actions;

export default cartSlice.reducer;
