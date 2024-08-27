// src/components/Signup/RoleToggleButton.js
import React from "react";

const RoleToggleButton = ({ role, toggleRole }) => {
  return (
    <button
      type="button"
      onClick={toggleRole}
      className={`ml-4 px-4 py-2 border rounded-md shadow-sm transition-all duration-300 ease-in-out focus:outline-none ${
        role === "Kabadiwala"
          ? "bg-indigo-500 hover:bg-indigo-600 text-white"
          : "bg-green-500 hover:bg-green-600 text-white"
      }`}
    >
      {role}
    </button>
  );
};

export default RoleToggleButton;
