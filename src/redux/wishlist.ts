import { createSlice } from '@reduxjs/toolkit';

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  url: string;
}

interface WishlistError {
  getWishlistItemsError: boolean;
  addToWishlistError: boolean;
  removeFromWishlistError: boolean;
}

interface WishlistState {
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  wishlistError: WishlistError;
}

const INITIAL_STATE: WishlistState = {
  wishlistItems: [],
  wishlistCount: 0,
  wishlistError: {
    getWishlistItemsError: false,
    addToWishlistError: false,
    removeFromWishlistError: false,
  },
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: INITIAL_STATE,
  reducers: {
    addToWishlist: (state, action) => {
      if (action.payload.success) {
        return {
          ...state,
          wishlistItems: [...state.wishlistItems, action.payload.data],
          wishlistCount: state.wishlistItems.length + 1,
          wishlistError: { ...state.wishlistError, addToWishlistError: false },
        };
      }
      return {
        ...state,
        wishlistError: { ...state.wishlistError, addToWishlistError: true },
      };
    },
    getWishlistItems: (state, action) => {
      if (action.payload.success) {
        return {
          ...state,
          wishlistItems: action.payload.data,
          wishlistCount: action.payload.data.length,
          wishlistError: {
            ...state.wishlistError,
            getWishlistItemsError: false,
          },
        };
      } else {
        return {
          ...state,
          wishlistError: {
            ...state.wishlistError,
            getWishlistItemsError: true,
          },
        };
      }
    },
    removeFromWishlist: (state, action) => {
      if (action.payload.success) {
        const productId = action.payload.data.id;
        const updatedWishlistItems = state.wishlistItems.filter(
          (item) => item.id !== productId
        );
        return {
          ...state,
          wishlistItems: updatedWishlistItems,
          wishlistCount: updatedWishlistItems.length,
          wishlistError: {
            ...state.wishlistError,
            removeFromWishlistError: false,
          },
        };
      }
      return {
        ...state,
        wishlistError: {
          ...state.wishlistError,
          removeFromWishlistError: true,
        },
      };
    },
  },
});

export const { addToWishlist, getWishlistItems, removeFromWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
