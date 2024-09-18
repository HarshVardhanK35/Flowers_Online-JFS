import React from "react";
import { Navigate } from "react-router-dom";

// Higher-order component for protecting routes
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to the login page
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;