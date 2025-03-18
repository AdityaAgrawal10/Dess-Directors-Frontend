// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  // If no token, user is not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If a specific role is required and the user doesn't have it, redirect or show error
  if (requiredRole && userRole !== requiredRole) {
    // Example: redirect them to home or show a 403 page
    return <Navigate to="/" replace />;
  }

  // Otherwise, allow access
  return children;
}

export default ProtectedRoute;
