import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Login/UserForm.css';
import FormButton from '../Buttons/FormButton';
import { handleSignupApi } from '../../utils/api/axios';

const SignupForm: React.FC = function () {
  interface SignupData {
    firstname: string;
    lastname: string;
    phone: number;
    email: string;
    password: string;
  }
  const [signupData, setSignupData] = useState<SignupData>({
    firstname: '',
    lastname: '',
    phone: 0,
    email: '',
    password: '',
  });
  interface SignupFormError {
    firstnameError: string;
    lastnameError: string;
    phoneError: string;
    emailError: string;
    passwordError: string;
    dataExistError: string;
  }
  const [signupFormError, setSignupFormError] = useState<SignupFormError>({
    firstnameError: '',
    lastnameError: '',
    phoneError: '',
    emailError: '',
    passwordError: '',
    dataExistError: '',
  });

  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setSignupData((values) => ({ ...values, [id]: value }));
  };

  const validateInput = () => {
    const inputErrors = {
      firstnameError: !signupData.firstname.trim()
        ? 'Firstname cannot be empty'
        : '',
      lastnameError: !signupData.lastname.trim()
        ? 'Lastname cannot be empty'
        : '',
      emailError: !signupData.email.trim() ? 'Email cannot be empty' : '',
      passwordError: !signupData.password.trim()
        ? 'Password cannot be empty'
        : '',
      phoneError: !signupData.phone ? 'Phone cannot be empty' : '',
    };
    setSignupFormError((error) => ({
      ...error,
      ...inputErrors,
    }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    validateInput();
    try {
      const res = await handleSignupApi(signupData);
      if (res.data.success) {
        navigate('/login');
      } else {
        setSignupFormError((error) => ({
          ...error,
          dataExistError: res.data.message,
        }));
      }
    } catch (error) {
      if (error) {
        return false;
      }
    }
  }
  return (
    <div className="form-container">
      <form className="input" onSubmit={handleSubmit}>
        <h1 className="head">Sign Up</h1>
        <p className="label">Firstname</p>
        <input
          type="text"
          className="input-box"
          id="firstname"
          onChange={handleChange}
        />
        <p className="input-error">{signupFormError.firstnameError}</p>
        <p className="label">Lastname</p>
        <input
          type="text"
          className="input-box"
          id="lastname"
          onChange={handleChange}
        />
        <p className="input-error">{signupFormError.lastnameError}</p>
        <p className="label">Phone</p>
        <input
          type="number"
          className="input-box"
          id="phone"
          onChange={handleChange}
        />
        <p className="input-error">{signupFormError.phoneError}</p>
        <p className="label">Email</p>
        <input
          type="email"
          className="input-box"
          id="email"
          onChange={handleChange}
        />
        <p className="input-error">{signupFormError.emailError}</p>
        <p className="label">Password</p>
        <input
          type="password"
          className="input-box"
          id="password"
          onChange={handleChange}
        />
        <p className="input-error">{signupFormError.passwordError}</p>
        <p className="result-error">{signupFormError.dataExistError}</p>
        <FormButton buttonText="Sign Up" />
        <span className="signup-text">
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default SignupForm;
