import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../api/axios';
import FormButton from '../../Buttons/FormButton';
import './AdminLogin.css';

const AdminLogin: React.FC = function () {
  interface AdminLoginData {
    adminUsername: string;
    adminPassword: string;
  }

  const [adminLoginData, setAdminLoginData] = useState<AdminLoginData>({
    adminUsername: '',
    adminPassword: '',
  });

  interface AdminLoginFormError {
    usernameError: string;
    passwordError: string;
    loginError: string;
  }

  const [adminLoginFormError, setAdminLoginFormError] =
    useState<AdminLoginFormError>({
      usernameError: '',
      passwordError: '',
      loginError: '',
    });

  const navigate = useNavigate();

  const handleAdminChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setAdminLoginData((values) => ({ ...values, [id]: value }));
  };

  const validateAdminInput = () => {
    const inputErrors = {
      usernameError: !adminLoginData.adminUsername.trim()
        ? 'Username cannot be empty'
        : '',
      passwordError: !adminLoginData.adminPassword.trim()
        ? 'Password cannot be empty'
        : '',
    };
    setAdminLoginFormError((error) => ({
      ...error,
      ...inputErrors,
    }));
  };

  async function handleAdminSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    validateAdminInput();
    try {
      const res = await axios.post('/admin/login', adminLoginData);
      if (res.data.success === true) {
        localStorage.setItem('adminToken', res.data.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setAdminLoginFormError((error) => ({
        ...error,
        loginError: 'Invalid Admin Login Details',
      }));
    }
  }

  return (
    <div className="admin-form-container">
      <form className="admin-input" onSubmit={handleAdminSubmit}>
        <h1 className="admin-head">Admin Login</h1>
        <p className="admin-label">Email</p>
        <input
          type="text"
          className="admin-input-box"
          id="email"
          onChange={handleAdminChange}
        />
        <p className="admin-input-error">{adminLoginFormError.usernameError}</p>
        <p className="admin-label">Password</p>
        <input
          type="password"
          className="admin-input-box"
          id="password"
          onChange={handleAdminChange}
        />
        <p className="admin-input-error">{adminLoginFormError.passwordError}</p>
        <FormButton buttonText="Login" />
        <div className="admin-result-error">
          {adminLoginFormError.loginError}
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
