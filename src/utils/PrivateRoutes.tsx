import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './AuthContext';
import useFetchCartItems from '../custom/fetchCart';
import useFetchWishlistItems from '../custom/fetchWishlist';

const PrivateRoutes: React.FC = function () {
  const { isAuthenticated } = useAuth();
  useFetchCartItems();
  useFetchWishlistItems();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
