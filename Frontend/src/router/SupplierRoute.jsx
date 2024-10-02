import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SupplierRoute = ({ children }) => {
  const {userData} = useSelector(state => state.main); 
  if (userData?.account_type === 'customer') {
    return <Navigate to="/profile" replace />;
  }
  return children;
};

export default SupplierRoute;