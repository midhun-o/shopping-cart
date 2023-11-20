import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Authorization from './AuthContext';
import useFetchCartItems from '../custom/fetchCart';
import useFetchWishlistItems from '../custom/fetchWishlist';

const PrivateRoutes: React.FC = function () {
  useFetchCartItems();
  useFetchWishlistItems();
  const token = Authorization();
  const auth = { token: token.isAuthenticated };
  return auth.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
