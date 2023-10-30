import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginForm.css';

const LoginForm: React.FC = function () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginState, setloginState] = useState(true);

  const navigate = useNavigate();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .post('http://localhost:3001/auth/login', { email, password })
      .then((res) => {
        if (res.data.success === true) {
          navigate('/products');
        }
      })
      .catch((err) => {
        if (err) {
          setloginState(false);
        }
      });
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
        <p className="label">Password</p>
        <input
          type="text"
          className="input__box"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginBtn" type="submit">
          Login
        </button>
        <div className={loginState ? 'login__noerror' : 'login__error'}>
          Invalid login details !
        </div>
        <span className="signup__text">
          Don&apos;t have an account? <a href="#signup">Sign up</a>
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
