import React from 'react';
import { Link } from 'react-router-dom';
import './HomeHeader.css';

interface HeaderProps {
  pageName: string;
  path: string;
}

const HomeHeader: React.FC<HeaderProps> = function ({ pageName, path }) {
  return (
    <div className="header">
      <div className="header-container">
        <h1 className="app-title">Shopping Cart</h1>
        <div className="navbar">
          <ul className="nav">
            <li>
              <Link to={path} className="link">
                {pageName}
              </Link>
            </li>
            <li>
              <Link to="/admin" className="link">
                Login as Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
