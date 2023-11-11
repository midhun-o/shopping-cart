import { createSlice } from '@reduxjs/toolkit';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  url: string;
}

interface WishlistState {
  wishlistItems: WishlistItem[];
  wishlistCount: number;
}

const INITIAL_STATE: WishlistState = {
  wishlistItems: [],
  wishlistCount: 0,
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
      const newState = state;
      newState.wishlistItems = action.payload;
      newState.wishlistCount = newState.wishlistItems.length;
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload.data;
      const newState = state;
      newState.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== productId
      );
    },
  },
});

export const { addToWishlist, getWishlistItems, removeFromWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
