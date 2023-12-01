import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCartItems, updateError } from '../redux/cart';
import { login } from '../redux/user';
import { fetchCartApi } from '../utils/api/ApiUtil';

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
          dispatch(getCartItems(res.data.cartItems));
          dispatch(updateError(false));
        }
      } catch (error) {
        dispatch(updateError(true));
      }
    }
    getCartDetails();
  }, [dispatch]);
};

export default useFetchCartItems;
