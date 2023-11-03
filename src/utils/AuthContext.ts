const Authorization = () => {
  const isAuthenticated: string | null = localStorage.getItem('jsonwebtoken');
  const customer: string | null = localStorage.getItem('customerDetails');
  if (!isAuthenticated) {
    return {};
  }
  return { isAuthenticated, customer };
};

export default Authorization;
