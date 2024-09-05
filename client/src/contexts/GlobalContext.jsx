import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Create a Context for the global state
const GlobalContext = createContext();

// Create a provider component
export const ContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Signup function
  const signup = async (formData) => {
    setIsLoading(true);
    setError(null); // Reset error state before making the request
    
    try {
      const response = await axios.post(`http://localhost:3000/api/auth/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // Ensures cookies are sent and received
      });
  
      // Handle successful response
      const user = response.data.user;
      const message = response.data.message || "Sign up successful";
  
      // Set user and message
      setUser(user);
      setIsAuthenticated(true);
  
      // Show success toast
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  
      // Navigate to verify OTP page
      navigate("/verify-otp");
  
    } catch (err) {
      console.error(err);
  
      // Handle error response
      const errorMessage = err.response?.data?.message || "Error signing up";
  
      // Set error state and display error toast
      setError(errorMessage);
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  
    } finally {
      // Stop loading spinner
      setIsLoading(false);
    }
  };
  
  
  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`http://localhost:3000/api/auth/login`, {
        email,
        password,
      },{
        withCredentials: true,
      });
      setUser(response.data.user);
      setMessage(response.data.message);
      setIsAuthenticated(true);
      toast.success(message || "Login successful", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Error in Login";
      setError(errorMessage);
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await axios.post(`http://localhost:3000/api/auth/logout`, {}, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      setUser(null);
      setIsAuthenticated(false);
      toast.success("Logout successful", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/login");
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Error in Logout";
      setError(errorMessage);
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Email Verification function
  const verifyEmail = async (code) => {
    setIsLoading(true);
    setError(null);
    console.log(code)
    try {
      const response = await axios.post(`http://localhost:3000/api/auth/verify-email`, { code },{
        withCredentials: true,
      });
      setUser(response.data.user);
      setIsAuthenticated(true);
      toast.success("Email verification successful", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error in email verification";
      setError(errorMessage);
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Check Auth Status function
  const checkAuth = async () => {
    setIsCheckingAuth(true);
    setError(null);
  
    try {
      const response = await axios.get(`http://localhost:3000/api/auth/check-auth`, {
        withCredentials: true,
      });
  
  
      // Log the response for debugging
      console.log("Check Auth Response:", response);
  
      // Update user and authentication status based on the response
      if (response.data.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      // Log error for debugging
      console.error("Check Auth Error:", err);
  
      // Handle errors
      setUser(null);
      setIsAuthenticated(false);
      setError(err.response?.data?.message || "Error checking authentication status");
    } finally {
      setIsCheckingAuth(false);
    }
  };
  

  // Forgot Password function
  const forgotPassword = async (email) => {
    setIsLoading(true);
    setError(null);
    setMessage(null);
    console.log(email);
    try {
      const response = await axios.post(`http://localhost:3000/api/auth/forgot-password`, {
        email,
      },{
        withCredentials: true,
      });
      console.log(response);
      setMessage(response.data.message);
      toast.success(message || "Reset password email sent successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(`/reset-password/${response.data.resetToken}`);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error in email verification";
      setError(errorMessage);
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Reset Password function
  const resetPassword = async (token, password) => {
    setIsLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await axios.post(`http://localhost:3000/api/reset-password/${token}`, {
        password,
      },{
        withCredentials: true,
      });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response.data.message || "Error resetting password");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Execute checkAuth when the component mounts
  useEffect(() => {
    checkAuth();
  }, [isAuthenticated]);

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    error,
    setError,
    isLoading,
    setIsLoading,
    isCheckingAuth,
    setIsCheckingAuth,
    message,
    setMessage,
    signup,
    login,
    verifyEmail,
    logout,
    checkAuth,
    forgotPassword,
    resetPassword,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
