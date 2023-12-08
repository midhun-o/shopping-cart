import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useFetchCartItems from '../custom/fetchCart';
import useFetchWishlistItems from '../custom/fetchWishlist';
import { getAuth } from './api/axios';

const PrivateRoutes: React.FC = function () {
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem('isLogin')
  );
  useFetchCartItems();
  useFetchWishlistItems();
  useEffect(() => {
    const Authorization = async () => {
      try {
        if (!token) {
          const isLogin = await getAuth();
          if (isLogin.status === 200) {
            setToken(isLogin.data.success);
            sessionStorage.setItem('isLogin', isLogin.data.success);
          }
        }
      } catch (err) {
        sessionStorage.setItem('isLogin', 'false');
      }
    };
    Authorization();
  }, [token]);
  return token === 'true' ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
