import { createSlice } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
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
  },
});

export const { addToCart, getCartItems } = cartSlice.actions;

export default cartSlice.reducer;
