import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserForm.css';
import FormButton from '../Buttons/FormButton';
import { handleLoginApi } from '../../utils/api/axios';

const LoginForm: React.FC = function () {
  interface LoginData {
    email: string;
    password: string;
  }

  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });

  interface LoginFormError {
    emailError: string;
    passwordError: string;
    loginError: string;
  }
  const [loginFormError, setLoginFormError] = useState<LoginFormError>({
    emailError: '',
    passwordError: '',
    loginError: '',
  });
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setLoginData((values) => ({ ...values, [id]: value }));
  };

  const validateInput = () => {
    const inputErrors = {
      emailError: !loginData.email.trim() ? 'Email cannot be empty' : '',
      passwordError: !loginData.password.trim()
        ? 'Password cannot be empty'
        : '',
    };
    setLoginFormError((error) => ({
      ...error,
      ...inputErrors,
    }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    validateInput();
    try {
      const res = await handleLoginApi(loginData);
      if (res.data.success === true) {
        localStorage.setItem('jsonwebtoken', res.data.token);
        localStorage.setItem(
          'customerDetails',
          JSON.stringify(res.data.customerDetails)
        );
        navigate('/');
      }
    } catch (err) {
      setLoginFormError((error) => ({
        ...error,
        loginError: 'Invalid Login Details',
      }));
    }
  }
  return (
    <div className="form-container">
      <form className="input" onSubmit={handleSubmit}>
        <h1 className="head">LOGIN</h1>
        <p className="label">Email</p>
        <input
          type="email"
          className="input-box"
          id="email"
          onChange={handleChange}
        />
        <p className="input-error">{loginFormError.emailError}</p>
        <p className="label">Password</p>
        <input
          type="password"
          className="input-box"
          id="password"
          onChange={handleChange}
        />
        <p className="input-error">{loginFormError.passwordError}</p>
        <FormButton buttonText="Login" />
        <div className="result-error">{loginFormError.loginError}</div>
        <span className="signup-text">
          Don&apos;t have an account? <Link to="/signup">Signup</Link>
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
