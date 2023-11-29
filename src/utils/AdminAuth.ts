const AdminAuth = () => {
  const isAuthenticated: string | null = localStorage.getItem('adminToken');
  if (!isAuthenticated) {
    return {};
  }
  return { isAuthenticated };
};

export default AdminAuth;
