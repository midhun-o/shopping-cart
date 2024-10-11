const useAuth = () => {
  const isAuthenticated = !!localStorage.getItem('jsonwebtoken');
  const customer = JSON.parse(localStorage.getItem('customerDetails') || '{}');
  return { isAuthenticated, customer };
};

export default useAuth;
