import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "./InputField";
import { useGlobalContext } from "../contexts/GlobalContext"; // Import useGlobalContext

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useGlobalContext(); // Destructure login from the context

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    try {
      // Sending the POST request
      const response = await axios.post("http://localhost:3000/api/auth/login", payload);

      if (response.status === 200) {
        // Use the login function from the context to handle authentication
        login(response.data.data, response.data.token);
        console.log("login successful:", response.data.data);
        
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Check console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Enter Email"
      />
      <InputField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Enter Password"
      />
      <button className="bg-indigo-900 text-white py-3 px-6 rounded w-full font-bold">
        Login
      </button>
      <button className="hover:text-blue-600 font-medium py-2 px-4 rounded-lg w-full">
        Forget your password?
      </button>
    </form>
  );
};

export default SignInForm;
