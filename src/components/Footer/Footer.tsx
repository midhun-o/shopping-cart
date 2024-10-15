import React from 'react';

const Footer: React.FC = function () {
  return (
    <footer className="bg-gray-800 text-white h-[10vh] flex items-center justify-center">
      <p className="text-center text-sm sm:text-base md:text-md lg:text-md">
        Copyright &copy; {new Date().getFullYear()} easy-cart.com
      </p>
    </footer>
  );
};

export default Footer;
