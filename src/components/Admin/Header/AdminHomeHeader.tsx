import React from 'react';
import './AdminHomeHeader.css';
import { AiOutlineLogout } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const AdminHeader: React.FC = function () {
  const handleLogout = () => {
    localStorage.removeItem('jsonwebtoken');
  };
  return (
    <div className="admin-header">
      <div className="admin-header-container">
        <h1 className="app-title">Shopping Cart</h1>
        <Link to="/login" className="link" onClick={handleLogout}>
          Log out <AiOutlineLogout />
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
