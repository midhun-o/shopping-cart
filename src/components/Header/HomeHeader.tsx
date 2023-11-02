import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './HomeHeader.css';

interface Props {
  pageName: string;
  path: string;
}

const HomeHeader: React.FC<Props> = function (props: Props) {
  const { pageName, path } = props;
  return (
    <div className="header__container">
      <h1 className="app__title">Shopping Cart</h1>
      <div className="navbar">
        <ul className="nav">
          <li>
            <Link to={path} className="link">
              {pageName}
            </Link>
          </li>
          <li>
            <Link to="/contact" className="link">
              Contact US
            </Link>
          </li>
          <li>
            <Link to="/about" className="link">
              About US
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default HomeHeader;
