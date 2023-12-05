import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems } from '../redux/cart';
import { login } from '../redux/user';
import { fetchCartApi } from '../utils/api/axios';

const useFetchCartItems = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getCartDetails() {
      try {
        const customerString: string | null =
          localStorage.getItem('customerDetails');
        if (customerString !== null) {
          const customer = JSON.parse(customerString);
          dispatch(login(customer));
        }
        const res = await fetchCartApi();
        if (res.data.success === true) {
          dispatch(getCartItems({ success: true, data: res.data.cartItems }));
        }
      } catch (error) {
        dispatch(getCartItems({ success: false }));
      }
    }
    getCartDetails();
  }, [dispatch]);
};

export default useFetchCartItems;
