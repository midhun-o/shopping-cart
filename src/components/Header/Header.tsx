import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLogout, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';
import { MdFavorite } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const CartItemCount: React.FC<{ count: number }> = ({ count }) => (
  <span className="bg-red-600 ml-2 w-8 h-8 rounded-full flex justify-center items-center font-bold text-white">
    {count}
  </span>
);

interface NavItemProps {
  to: string;
  label: string;
  icon: JSX.Element;
  count?: number;
  onLogout?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon, count, onLogout }) => (
  <li className="text-white text-sm flex items-center">
    <Link
      to={to}
      className="flex items-center hover:bg-gray-700 p-2 rounded transition duration-200"
      onClick={onLogout}
    >
      {icon}
      <span className="ml-2">{label}</span>
      {count !== undefined && count > 0 && <CartItemCount count={count} />}
    </Link>
  </li>
);

NavItem.defaultProps = {
  count: 0,
  onLogout: () => {},
};

const Header: React.FC = () => {
  const { cartCount } = useSelector((state: RootState) => state.cart);
  const { wishlistCount } = useSelector((state: RootState) => state.wishlist);

  const handleLogout = () => {
    localStorage.removeItem('jsonwebtoken');
    localStorage.removeItem('customerDetails');
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 fixed z-50 w-full">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto h-24 px-4 md:px-10">
        <Link to="/" className="text-white text-2xl font-bold">
          EasyCart
        </Link>

        <div className="md:hidden ml-auto">
          <button
            type="button"
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>

        <nav className={`md:flex md:items-center ${isMenuOpen ? 'block' : 'hidden'} md:block`}>
          <ul className={`flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 ${isMenuOpen ? 'bg-gray-800 w-full absolute top-24 left-0 z-40 rounded-b-lg p-4 md:p-0' : ''}`}>
            <NavItem to="/cart" label="Cart" icon={<FaShoppingCart />} count={cartCount} />
            <NavItem to="/wishlist" label="Wishlist" icon={<MdFavorite />} count={wishlistCount} />
            <NavItem to="/login" label="Log out" icon={<AiOutlineLogout />} onLogout={handleLogout} />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
