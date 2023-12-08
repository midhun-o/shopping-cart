import axios from 'axios';

const token: string | null = localStorage.getItem('jsonwebtoken');
const authHead = { Authorization: `Bearer ${token}` };

const productApi = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_API_URL}products`,
  headers: authHead,
});

const customer = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_API_URL}customer`,
  headers: authHead,
});

const admin = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_API_URL}admin`,
  headers: authHead,
});

const auth = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_API_URL}auth`,
});

const fetchProducts = (
  pageNumber: number,
  searchString: string,
  categoryId: string,
  sort: string,
  type: string
) => {
  return productApi.get(
    `/search?page=${pageNumber}&search=${searchString}&category=${categoryId}&sort=${sort}&type=${type}`
  );
};

const fetchCategories = () => {
  return productApi.get('/getcategories');
};

const addToCartApi = (productId: number) => {
  return customer.post(`/addtocart/${productId}`);
};

const incrementCartApi = (productId: number) => {
  return customer.post(`/increment/${productId}`);
};

const decrementCartApi = (productId: number) => {
  return customer.post(`/decrement/${productId}`);
};

const removeCartApi = (productId: number) => {
  return customer.post(`/removecartitem/${productId}`);
};

const addToWishlistApi = (productId: number) => {
  return customer.post(`/addtowishlist/${productId}`);
};

const removeWishlistApi = (productId: number) => {
  return customer.post(`/removewishlist/${productId}`);
};

const handleCheckoutApi = () => {
  return customer.post('/checkout');
};

interface LoginData {
  email: string;
  password: string;
}

const handleLoginApi = (loginData: LoginData) => {
  return auth.post('/login', loginData);
};

const getAuth = () => {
  return customer.get('/getaccess');
};

interface SignupData {
  firstname: string;
  lastname: string;
  phone: number;
  email: string;
  password: string;
}

const handleSignupApi = (signupData: SignupData) => {
  return auth.post('/signup', signupData);
};

const getBannersApi = () => {
  return customer.get('/fetchBannerImages');
};

const getproductDetailsApi = (id: number) => {
  return productApi.get(`/getproducts/${id}`);
};

const fetchWishlistApi = () => {
  return customer.get('/wishlist/');
};

const fetchCartApi = () => {
  return customer.get('/viewcart/');
};

interface AdminLoginData {
  adminUsername: string;
  adminPassword: string;
}

const handleAdminLoginApi = (adminLoginData: AdminLoginData) => {
  return admin.post('/login', adminLoginData);
};

const getCategoriesAndSellerApi = () => {
  return admin.get('/getcategoryandseller');
};

interface Product {
  name: string;
  sku: string;
  description: string;
  price: number;
  stock: number;
  maxLimitPerOrder: number;
  categoryId: number;
  discount: number;
  sellerId: number;
  productImage: File | null;
}

const addProductsApi = (product: Product) => {
  return admin.post('/addproduct', product, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const getAllProductsApi = () => {
  return admin.get('/fetchproduct');
};

const deleteProductsApi = (productId: number) => {
  return admin.delete(`/deleteproduct/${productId}`);
};

export {
  fetchProducts,
  fetchCategories,
  addToCartApi,
  incrementCartApi,
  decrementCartApi,
  removeCartApi,
  addToWishlistApi,
  removeWishlistApi,
  handleCheckoutApi,
  handleLoginApi,
  handleSignupApi,
  getBannersApi,
  getproductDetailsApi,
  fetchWishlistApi,
  fetchCartApi,
  handleAdminLoginApi,
  getCategoriesAndSellerApi,
  addProductsApi,
  getAllProductsApi,
  deleteProductsApi,
  getAuth,
};
