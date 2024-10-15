import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ButtonsContainer from '../Buttons/CartButtons/ButtonsContainer';
import axios from '../../api/axios';
import { checkout } from '../../redux/cart';
import { RootState } from '../../redux/store';

const CartItem: React.FC<{ item: any; goToProduct: (id: number) => void }> = ({ item, goToProduct }) => {
  const cartImage = process.env.REACT_APP_BACKEND_API_URL + item.url;
  const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;

  return (
    <div className="w-full h-[200px] bg-white p-12 flex items-center gap-4 shadow-md hover:scale-95 transition-transform duration-200" key={item.id}>
      <button className="flex justify-center items-center w-[75px] h-[75px] cursor-pointer" type="button" onClick={() => goToProduct(item.id)}>
        <img src={cartImage} alt={item.name} className="max-w-full h-20 object-cover" />
      </button>
      <div className="flex-grow">
        <h2 className="text-sm text-left font-semibold">{item.name}</h2>
        <p className="font-bold mt-1">Price: ${price.toFixed(2)}</p>
      </div>
      <ButtonsContainer productId={item.id} page="cart" />
    </div>
  );
};

const CartSummary: React.FC<{ cartTotal: number; onCheckout: () => void; error: string | null }> = ({ cartTotal, onCheckout, error }) => (
  <div className="mt-6 p-6 w-[300px] flex-shrink-0">
    <h2 className="text-xl font-bold text-gray-800">Cart Total</h2>
    <p className="text-lg font-semibold text-gray-700 mt-1">Total Amount: ${cartTotal.toFixed(2)}</p>
    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    <button className="mt-4 w-full bg-green-600 text-white rounded-lg py-3 hover:bg-green-700 transition duration-300 transform hover:scale-105" type="button" onClick={onCheckout}>
      Proceed to Checkout
    </button>
  </div>
);

const CartPage: React.FC = function () {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state: RootState) => state.cart);

  const goToProduct = (id: number) => {
    navigate('/product', { state: { id } });
  };

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartLength = cartItems.length;
  const [error, setError] = React.useState<string | null>(null);

  const handleCheckout = async () => {
    setError(null); 
    try {
      const token: string | null = localStorage.getItem('jsonwebtoken');
      const res = await axios.post(
        'customer/checkout',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) {
        dispatch(checkout());
        navigate('/');
      } else {
        setError('Checkout failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during checkout. Please try again.'); 
    }
  };

  return (
    <div className="container min-h-[90vh] mx-auto p-4 pt-36 flex">
      {cartLength === 0 ? (
        <div className="flex justify-center items-center h-[70vh] w-full">
          <img src="/other/empty-cart.webp" alt="empty cart" className=" object-center" />
        </div>
      ) : (
        <div className="flex flex-grow gap-4">
          <div className="flex flex-col gap-4 flex-grow">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} goToProduct={goToProduct} />
            ))}
          </div>
          <CartSummary cartTotal={cartTotal} onCheckout={handleCheckout} error={error} />
        </div>
      )}
    </div>
  );
};

export default CartPage;
