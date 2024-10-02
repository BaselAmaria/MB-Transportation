import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CustomerRoute = ({ children }) => {
  const {userData} = useSelector(state => state.main); 
  if (userData?.account_type === 'supplier') {
    return <Navigate to="/supplier-profile" replace />;
  }
  return children;
};

export default CustomerRoute;