import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart';
import userReducer from './user';
import wishlistReducer from './wishlist';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
