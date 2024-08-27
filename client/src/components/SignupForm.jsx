// src/components/Signup/SignupForm.js
import React, { useRef, useState } from "react";
import axios from "axios";
import ProfileUpload from "./ProfileUpload";
import RoleToggleButton from "./RoleToggleButton";
import InputField from "./InputField";
import { useGlobalContext } from "../contexts/GlobalContext"; // Import Global Context
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const { login } = useGlobalContext(); // Access login method from context
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
    role: "Kabadiwala",
    profileImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profileImage: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleClickImageUpload = () => {
    fileInputRef.current.click();
  };

  const toggleRole = () => {
    setFormData((prevState) => ({
      ...prevState,
      role: prevState.role === "Kabadiwala" ? "Scrap Dealer" : "Kabadiwala",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the file along with other fields
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      mobileNumber: formData.mobile,
      address: formData.address,
      role: formData.role,
      // profileImage: formData.profileImage // This would just store the reference, not upload the file properly
    };

    try {
      if (formData.password === formData.confirmPassword) {
        const response = await axios.post(
          "http://localhost:3000/api/auth/register",
          payload
        );

        if(response.status === 201){
          // Assuming the API returns the user data and token upon successful signup
          login(response.data.data, response.data.token); // Store user data and token in global context
          console.log("Signup successful:", response.data.data);
        }else{
          alert(`Error: ${response.data.message}`);
          console.log("Error signing up:", error);
        }
      } else {
        console.log("Passwords do not match");
        alert("Passwords do not match");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Check console for details.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <ProfileUpload
          imagePreview={imagePreview}
          role={formData.role}
          handleClickImageUpload={handleClickImageUpload}
          handleImageChange={handleImageChange}
          fileInputRef={fileInputRef}
        />
        <RoleToggleButton role={formData.role} toggleRole={toggleRole} />
      </div>
      <InputField
        label="Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Enter Name"
      />
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
      <InputField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        placeholder="Enter Confirm Password"
      />
      <InputField
        label="Mobile Number"
        name="mobile"
        type="text"
        value={formData.mobile}
        onChange={handleInputChange}
        placeholder="Enter Mobile Number"
      />
      <InputField
        label="Address"
        name="address"
        type="text"
        value={formData.address}
        onChange={handleInputChange}
        placeholder="Enter Google Map Address Link"
      />
      <button
        type="submit"
        className={`text-white py-3 px-6 rounded w-full font-bold ${
          formData.role === "Kabadiwala"
            ? "bg-indigo-500 text-white"
            : "bg-green-500 text-white"
        }`}
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
