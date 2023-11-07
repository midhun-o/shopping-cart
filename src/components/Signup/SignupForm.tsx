import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import '../Login/UserForm.css';
import FormButton from '../Buttons/FormButton';

const SignupForm: React.FC = function () {
  const [firstname, setFirstname] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const [firstnameError, setFirstnameError] = useState<string>('');
  const [lastnameError, setLastnameError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [dataExistError, setDataExistError] = useState<string>('');

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
    if (phone.trim().length === 0) {
      setPhoneError('Phone cant be empty');
    } else {
      setPhoneError('');
    }
    if (firstname.trim().length === 0) {
      setFirstnameError('Firstname cant be empty');
    } else {
      setFirstnameError('');
    }
    if (lastname.trim().length === 0) {
      setLastnameError('Lastname cant be empty');
    } else {
      setLastnameError('');
    }

    try {
      const res = await axios.post('/auth/signup', {
        firstname,
        lastname,
        phone,
        email,
        password,
      });
      if (res.data.success === true) {
        navigate('/login');
      } else if (res.data.success === false) {
        setDataExistError(res.data.message);
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
          onChange={(e) => setFirstname(e.target.value)}
        />
        <p className="input-error">{firstnameError}</p>
        <p className="label">Lastname</p>
        <input
          type="text"
          className="input-box"
          id="lastname"
          onChange={(e) => setLastname(e.target.value)}
        />
        <p className="input-error">{lastnameError}</p>
        <p className="label">Phone</p>
        <input
          type="text"
          className="input-box"
          id="phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <p className="input-error">{phoneError}</p>
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
        <p className="result-error">{dataExistError}</p>
        <FormButton buttonText="Sign Up" />
        <span className="signup-text">
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default SignupForm;
