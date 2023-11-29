import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../api/axios';
import { getCartItems } from '../redux/cart';
import { login } from '../redux/user';

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
        const token: string | null = localStorage.getItem('jsonwebtoken');
        const res = await axios.get('customer/viewcart/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success === true) {
          dispatch(getCartItems(res.data.cartItems));
        }
      } catch (error) {
        return false;
      }
    }
    getCartDetails();
  }, [dispatch]);
};

export default useFetchCartItems;
