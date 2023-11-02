import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import './LoginForm.css';

const LoginForm: React.FC = function () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginState, setLoginState] = useState(true);
  const [isEmptyEmail, setIsEmptyEmail] = useState(true);
  const [isEmptyPassword, setIsEmptyPassword] = useState(true);

  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim().length === 0) {
      setIsEmptyEmail(false);
    } else {
      setIsEmptyEmail(true);
    }
    if (password.trim().length === 0) {
      setIsEmptyPassword(false);
    } else {
      setIsEmptyPassword(true);
    }

    try {
      const res = await axios.post('/auth/login', {
        email,
        password,
      });
      if (res.data.success === true) {
        localStorage.setItem('jsonwebtoken', res.data.token);
        localStorage.setItem(
          'customerDetails',
          JSON.stringify(res.data.customerDetails)
        );
        navigate('/');
      }
    } catch (error) {
      if (error) {
        setLoginState(false);
      }
    }
  }
  return (
    <div className="form-container">
      <form className="input" onSubmit={handleSubmit}>
        <h1 className="head">LOGIN</h1>
        <p className="label">Email</p>
        <input
          type="email"
          className="input__box"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={isEmptyEmail ? 'empty_loginEmail' : ''}>
          <p className="email_error">Email Cannot be empty !</p>
        </div>
        <p className="label">Password</p>
        <input
          type="text"
          className="input__box"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={isEmptyPassword ? 'empty_loginPassword' : ''}>
          <p className="email_error">Password Cannot be empty !</p>
        </div>
        <button className="loginBtn" type="submit">
          Login
        </button>
        <div className={loginState ? 'login__noerror' : 'login__error'}>
          Invalid login details !
        </div>
        <span className="signup__text">
          Don&apos;t have an account? <Link to="/signup">Signup</Link>
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
