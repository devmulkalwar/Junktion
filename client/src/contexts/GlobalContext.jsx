// src/context/GlobalContext.js

import React, { createContext, useState, useContext } from "react";

// Create a Context for the global state
const GlobalContext = createContext();

// Create a provider component
export const ContextProvider = ({ children }) => {
  // Initialize with null or a suitable default value
  const [user, setUser] = useState("dev"); 
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication status

  const contextValue = {
    user,
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
