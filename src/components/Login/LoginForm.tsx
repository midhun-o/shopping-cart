import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import './UserForm.css';
import FormButton from '../Buttons/FormButton';

const LoginForm: React.FC = function () {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

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
      setLoginError('Invalid Login Details');
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="input-error">{emailError}</p>
        <p className="label">Password</p>
        <input
          type="text"
          className="input-box"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="input-error">{passwordError}</p>
        <FormButton buttonText="Login" />
        <div className="result-error">{loginError}</div>
        <span className="signup-text">
          Don&apos;t have an account? <Link to="/signup">Signup</Link>
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
