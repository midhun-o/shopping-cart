import { createSlice } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  price: number;
  url: string;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  cartCount: number;
}

const INITIAL_STATE: CartState = {
  cartItems: [],
  cartCount: 0,
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
      const newState = state;
      newState.cartItems = action.payload;
      newState.cartCount = newState.cartItems.length;
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
      const productId = action.payload.data;
      const newState = state;
      newState.cartItems = state.cartItems.filter(
        (item) => item.id !== productId
      );
    },
  },
});

export const {
  addToCart,
  getCartItems,
  incrementItem,
  decrementItem,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
