import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AdminAuth from './AdminAuth';

const AdminRoutes: React.FC = function () {
  const token = AdminAuth();
  const auth = { token: token.isAuthenticated };
  return auth.token ? <Outlet /> : <Navigate to="/admin" />;
};

export default AdminRoutes;
