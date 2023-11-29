import React from 'react';
import './AdminHeader.css';
import { Link } from 'react-router-dom';

const AdminHeader: React.FC = function () {
  return (
    <div className="admin-header">
      <div className="admin-header-container">
        <h1 className="app-title">Shopping Cart</h1>
        <Link to="/" className="link">
          Login as user
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
