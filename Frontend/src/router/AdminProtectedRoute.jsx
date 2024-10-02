import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminProtectedRoute = ({ children }) => {
  const {userData} = useSelector(state => state.main); 
  const {logoutLoading} = useSelector(state => state.auth); 
  if (userData?.account_type === 'admin' && !logoutLoading) {
    return <Navigate to="/admin" replace />;
  } 
  return children;
};

export default AdminProtectedRoute;