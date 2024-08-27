import React from "react";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";

const NonProtectedRoute =  ({ children }) => {
    const { isAuthenticated } = useGlobalContext();
  
    // If the user is authenticated, redirect them away from non-auth pages.
    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }
  
    // Otherwise, render the page for non-auth users
    return children;
  };

export default NonProtectedRoute