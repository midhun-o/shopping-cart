import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUserCircle, FaShoppingCart } from 'react-icons/fa';
import { MdOutlineAdminPanelSettings } from 'react-icons/md';
import { HiOutlineMenu } from 'react-icons/hi';

interface HeaderProps {
  pageName: string;
  path: string;
}

const HomeHeader: React.FC<HeaderProps> = function HomeHeader({ pageName, path }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-gray-800 text-white h-[10vh] px-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center pt-3">
          <FaShoppingCart className="w-6 h-6 mr-2" />
          Easy Cart
        </h1>
        <button type="button" onClick={toggleMenu} className="md:hidden">
          <HiOutlineMenu className="w-6 h-6" />
        </button>
        <nav className={`md:flex ${isOpen ? 'block' : 'hidden'} absolute md:static bg-gray-800 md:bg-transparent z-10 w-full md:w-auto`}>
          <ul className="flex flex-col md:flex-row md:space-x-6 p-4 md:p-0">
            <li className="flex items-center mb-2 md:mb-0">
              <FaRegUserCircle className="w-5 h-5 mr-1" />
              <Link to={path} className="hover:text-gray-300">
                {pageName}
              </Link>
            </li>
            <li className="flex items-center mb-2 md:mb-0">
              <MdOutlineAdminPanelSettings className="w-5 h-5 mr-1" />
              <Link to="/admin" className="hover:text-gray-300">
                Login as Admin
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HomeHeader;
