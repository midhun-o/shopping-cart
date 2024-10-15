import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import axios from '../../api/axios';
import FormButton from '../Buttons/FormButton';

function LoginForm() {
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
    setLoginData((prevData) => ({ ...prevData, [id]: value }));
  };

  const validateInput = () => {
    const inputErrors = {
      emailError: !loginData.email.trim() ? 'Email cannot be empty' : '',
      passwordError: !loginData.password.trim() ? 'Password cannot be empty' : '',
    };
    setLoginFormError((prevError) => ({
      ...prevError,
      ...inputErrors,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateInput();

    if (loginFormError.emailError || loginFormError.passwordError) return;

    try {
      const res = await axios.post('/auth/login', loginData);
      if (res.data.success) {
        localStorage.setItem('jsonwebtoken', res.data.token);
        localStorage.setItem('customerDetails', JSON.stringify(res.data.customerDetails));
        navigate('/');
      }
    } catch (err) {
      setLoginFormError((prevError) => ({
        ...prevError,
        loginError: 'Invalid Login Details',
      }));
    }
  };

  return (
    <div className="flex h-[80vh] bg-gray-100">
      <form className="bg-white p-8 flex flex-col items-center justify-center rounded-lg shadow-lg h-full w-full transition-shadow duration-300 hover:shadow-xl" onSubmit={handleSubmit}>
      <div className='w-full md:w-1/3'>
          <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">LOGIN</h1>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:ring focus-within:ring-blue-500">
              <FaEnvelope className="text-gray-400 p-2" />
              <input
                type="email"
                id="email"
                onChange={handleChange}
                value={loginData.email}
                className="block w-full py-2 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>
            {loginFormError.emailError && <p className="text-red-500 text-sm mt-1">{loginFormError.emailError}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:ring focus-within:ring-blue-500">
              <FaLock className="text-gray-400 p-2" />
              <input
                type="password"
                id="password"
                onChange={handleChange}
                value={loginData.password}
                className="block w-full py-2 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>
            {loginFormError.passwordError && <p className="text-red-500 text-sm mt-1">{loginFormError.passwordError}</p>}
          </div>

          <FormButton buttonText="Login" />

          {loginFormError.loginError && <div className="text-red-500 text-sm mt-4">{loginFormError.loginError}</div>}

          <span className="block text-center mt-4 text-sm text-gray-600">
            Don&apos;t have an account? <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
          </span>

        </div>      </form>
    </div>
  );
}

export default LoginForm;
