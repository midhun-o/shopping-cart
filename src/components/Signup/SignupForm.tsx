import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaPhone, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from '../../api/axios';
import FormButton from '../Buttons/FormButton';

const SignupForm: React.FC = function () {
  interface SignupData {
    firstname: string;
    lastname: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const [signupData, setSignupData] = useState<SignupData>({
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  interface SignupFormError {
    firstnameError: string;
    lastnameError: string;
    phoneError: string;
    emailError: string;
    passwordError: string;
    confirmPasswordError: string;
    dataExistError: string;
  }

  const [signupFormError, setSignupFormError] = useState<SignupFormError>({
    firstnameError: '',
    lastnameError: '',
    phoneError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
    dataExistError: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setSignupData((values) => ({ ...values, [id]: value }));
  };

  const validateInput = () => {
    const inputErrors = {
      firstnameError: !signupData.firstname.trim() ? 'Firstname cannot be empty' : '',
      lastnameError: !signupData.lastname.trim() ? 'Lastname cannot be empty' : '',
      emailError: !signupData.email.trim() ? 'Email cannot be empty' : '',
      passwordError: !signupData.password.trim() ? 'Password cannot be empty' : '',
      confirmPasswordError: signupData.password !== signupData.confirmPassword
        ? 'Passwords do not match'
        : '',
      phoneError: !signupData.phone.trim() ? 'Phone cannot be empty' : '',
    };

    setSignupFormError((error) => ({
      ...error,
      ...inputErrors,
    }));

    return Object.values(inputErrors).every((error) => error === '');
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const isValid = validateInput();

    if (!isValid) {
      return; 
    }

    try {
      const res = await axios.post('/auth/signup', signupData);
      if (res.data.success) {
        navigate('/login'); 
      } else {
        setSignupFormError((error) => ({
          ...error,
          dataExistError: res.data.message,
        }));
      }
    } catch (error) {
      setSignupFormError((err) => ({
        ...err,
        dataExistError: 'An error occurred during signup. Please try again.',
      }));
    }
  }

  return (
    <div className="flex w-full min-h-[80vh] bg-gray-100">
      <form className="bg-white flex justify-center items-center p-10 sm:p-14 lg:p-14 rounded-lg shadow-lg w-full  lg:max-w-full transition-shadow duration-300 hover:shadow-xl" onSubmit={handleSubmit}>
      <div className='w-full xl:w-1/3'>
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Sign Up</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">Firstname</label>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:ring focus-within:ring-blue-500">
              <FaUser className="text-gray-400 p-2" />
              <input
                type="text"
                className="block w-full py-2 focus:outline-none"
                id="firstname"
                onChange={handleChange}
              />
            </div>
            <p className="text-red-500 text-sm mt-1">{signupFormError.firstnameError}</p>
          </div>

          <div className="mb-4">
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Lastname</label>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:ring focus-within:ring-blue-500">
              <FaUser className="text-gray-400 p-2" />
              <input
                type="text"
                className="block w-full py-2 focus:outline-none"
                id="lastname"
                onChange={handleChange}
              />
            </div>
            <p className="text-red-500 text-sm mt-1">{signupFormError.lastnameError}</p>
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:ring focus-within:ring-blue-500">
              <FaPhone className="text-gray-400 p-2" />
              <input
                type="tel"
                className="block w-full py-2 focus:outline-none"
                id="phone"
                onChange={handleChange}
              />
            </div>
            <p className="text-red-500 text-sm mt-1">{signupFormError.phoneError}</p>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:ring focus-within:ring-blue-500">
              <FaEnvelope className="text-gray-400 p-2" />
              <input
                type="email"
                className="block w-full py-2 focus:outline-none"
                id="email"
                onChange={handleChange}
              />
            </div>
            <p className="text-red-500 text-sm mt-1">{signupFormError.emailError}</p>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:ring focus-within:ring-blue-500">
              <FaLock className="text-gray-400 p-2" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="block w-full py-2 focus:outline-none"
                id="password"
                onChange={handleChange}
              />
              <button
                type="button"
                className="p-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
              </button>
            </div>
            <p className="text-red-500 text-sm mt-1">{signupFormError.passwordError}</p>
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="flex items-center border border-gray-300 rounded-md focus-within:ring focus-within:ring-blue-500">
              <FaLock className="text-gray-400 p-2" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="block w-full py-2 focus:outline-none"
                id="confirmPassword"
                onChange={handleChange}
              />
              <button
                type="button"
                className="p-2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
              </button>
            </div>
            <p className="text-red-500 text-sm mt-1">{signupFormError.confirmPasswordError}</p>
          </div>
        </div>

        <p className="text-red-500 text-sm mt-1">{signupFormError.dataExistError}</p>
        <FormButton buttonText="Sign Up" />

        <span className="block text-center mt-4 text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
        </span>

        </div>
      </form>
    </div>
  );
};

export default SignupForm;
