import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import PrivateRoutes from './utils/PrivateRoutes';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Home from './Routes/Home';
import Login from './Routes/Login';
import Signup from './Routes/Signup';

const App: React.FC = function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" />
        </Route>
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<ErrorPage />} path="*" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
