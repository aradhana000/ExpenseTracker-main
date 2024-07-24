import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Component/Signup';
import Login from './Component/Login';
import Welcome from './Component/Welcome';
import CompleteProfile from './Component/CompleteProfile';
import VerifyEmail from './Component/VerifyEmail';
import ForgotPassword from './Component/ForgotPassword';
import Header from './Component/Header';
import ExpenseForm from './Component/ExpenseForm';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/expenses" element={<ExpenseForm />} />
        <Route path="/" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;


