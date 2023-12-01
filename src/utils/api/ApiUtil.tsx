import axios from '../../api/axios';

const fetchProducts = (
  pageNumber: number,
  searchString: string,
  categoryId: string,
  sort: string,
  type: string
) => {
  return axios.get(
    `products/search?page=${pageNumber}&search=${searchString}&category=${categoryId}&sort=${sort}&type=${type}`
  );
};

const fetchCategories = () => {
  return axios.get('products/getcategories');
};

const addToCartApi = (productId: number) => {
  return axios.post(`customer/adtocart/${productId}`);
};

const incrementCartApi = (productId: number) => {
  return axios.post(`customer/increment/${productId}`);
};

const decrementCartApi = (productId: number) => {
  return axios.post(`customer/decrement/${productId}`);
};

const removeCartApi = (productId: number) => {
  return axios.post(`customer/removecartitem/${productId}`);
};

const addToWishlistApi = (productId: number) => {
  return axios.post(`customer/addtowishlist/${productId}`);
};

const removeWishlistApi = (productId: number) => {
  return axios.post(`customer/removewishlist/${productId}`);
};

const handleCheckoutApi = () => {
  return axios.post('customer/checkout');
};

interface LoginData {
  email: string;
  password: string;
}

const handleLoginApi = (loginData: LoginData) => {
  return axios.post('/auth/login', loginData);
};

interface SignupData {
  firstname: string;
  lastname: string;
  phone: number;
  email: string;
  password: string;
}

const handleSignupApi = (signupData: SignupData) => {
  return axios.post('/auth/signup', signupData);
};

const getBannersApi = () => {
  return axios.get('customer/fetchBannerImages');
};

const getproductDetailsApi = (id: number) => {
  return axios.get(`products/getproducts/${id}`);
};

const fetchWishlistApi = () => {
  return axios.get('customer/wishlist/');
};

const fetchCartApi = () => {
  return axios.get('customer/viewcart/');
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
};
