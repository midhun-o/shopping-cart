import { createSlice } from '@reduxjs/toolkit';

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  url: string;
}

interface WishlistState {
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  wishlistError: boolean;
}

const INITIAL_STATE: WishlistState = {
  wishlistItems: [],
  wishlistCount: 0,
  wishlistError: false,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: INITIAL_STATE,
  reducers: {
    addToWishlist: (state, action) => {
      state.wishlistItems.push(action.payload);
      const newState = state;
      newState.wishlistCount += 1;
    },
    getWishlistItems: (state, action) => {
      const newState = { ...state };
      newState.wishlistItems = action.payload;
      newState.wishlistCount = newState.wishlistItems.length;
      return newState;
    },
    removeFromWishlist: (state, action) => {
      const productId: number = Number(action.payload.id);
      const newState = { ...state };
      newState.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== productId
      );
      newState.wishlistCount = newState.wishlistItems.length;
      return newState;
    },
    updateError: (state, action) => {
      const newState = { ...state };
      newState.wishlistError = action.payload;
      return newState;
    },
  },
});

export const {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
  updateError,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
