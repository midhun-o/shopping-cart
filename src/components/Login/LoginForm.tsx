import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import './LoginForm.css';

const LoginForm: React.FC = function () {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginState, setLoginState] = useState<boolean>(true);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim().length === 0) {
      setEmailError('Email cant be empty');
    } else {
      setEmailError('');
    }
    if (password.trim().length === 0) {
      setPasswordError('Password cant be empty');
    } else {
      setPasswordError('');
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
        <p className="email_error">{emailError}</p>
        <p className="label">Password</p>
        <input
          type="text"
          className="input__box"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="email_error">{passwordError}</p>
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
