import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart';
import userReducer, { login } from './user';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

const customerDetails = localStorage.getItem('customerDetails');
const jsonwebtoken = localStorage.getItem('jsonwebtoken');

if (customerDetails && jsonwebtoken) {
  store.dispatch(
    login({
      customerDetails: JSON.parse(customerDetails),
      token: jsonwebtoken,
    })
  );
}

export default store;
