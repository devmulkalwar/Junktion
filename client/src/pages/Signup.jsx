import React, { useState } from "react";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineUser,
  AiOutlinePhone,
  AiOutlineHome,
} from "react-icons/ai"; // Mail, Lock, User, Phone, and Home icons
import RoleToggle from "../components/FormComponents/RoleToggle";
import UploadProfile from "../components/FormComponents/UploadProfile";
import InputField from "../components/FormComponents/InputField";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useGlobalContext } from "../contexts/GlobalContext";

const SignUp = () => {
  const {signup , isLoading } = useGlobalContext();
  const [role, setRole] = useState("Kabadiwala");
  const [profilePic, setProfilePic] = useState(null);
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Scrap Dealer",
    mobile: "",
    address: "",
    profileImage: null,
  });
  const [isloading, setIsloading] = useState(false);

  const handleRoleToggle = () => {
    const newRole = role === "Kabadiwala" ? "Scrap Dealer" : "Kabadiwala";
    setRole(newRole);
    setSignUpData({ ...signUpData, role: newRole });
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file)); // Preview the image
      setSignUpData({ ...signUpData, profileImage: file }); // Store the file object
    } else {
      setProfilePic(null);
      setSignUpData({ ...signUpData, profileImage: null });
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({ ...signUpData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);

    // Create a new FormData object
    const formData = new FormData();

    // Append form fields to FormData
    formData.append("name", signUpData.name);
    formData.append("email", signUpData.email);
    formData.append("role", signUpData.role);
    formData.append("password", signUpData.password);
    formData.append("confirmPassword", signUpData.confirmPassword);
    formData.append("mobile", signUpData.mobile);
    formData.append("address", signUpData.address);

    // Handle profile image
    if (signUpData.profileImage) {
      formData.append("profileImage", signUpData.profileImage);
    }
      console.log(formData)
      await signup(formData);
   
  };

  return (
    <div className="flex justify-evenly m-5 lg:m-8 gap-6 items-center flex-col lg:flex-row-reverse flex-grow">
      <div className="text-center lg:text-left max-w-4xl">
        <h1 className="text-4xl lg:text-6xl font-bold">Register now!</h1>
        <p className="hidden lg:block mt-2 text-xl py-6">
          Junktion is a waste management platform designed to streamline the
          process of buying and selling scrap materials. The platform connects
          Scrap Dealer with Kabadiwala, facilitating efficient transactions and
          promoting sustainable waste management practices.
        </p>
        <p className="mt-2 text-md lg:text-xl">
          Already have an account?
          <Link to="/login" className="text-md font-semibold text-primary">
            Login
          </Link>
        </p>
      </div>

      <div className="card w-full max-w-2xl shrink-0 shadow-2xl bg-base-300">
        <form
          onSubmit={handleSubmit}
          className="card-body grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          {/* Profile Picture Selector */}
          <UploadProfile
            profilePic={profilePic}
            handleProfilePicChange={handleProfilePicChange}
          />

          {/* Role Toggle button */}
          <RoleToggle handleRoleToggle={handleRoleToggle} role={role} />

          {/* Name */}
          <InputField
            name="name"
            type="text"
            value={signUpData.name}
            onChange={onInputChange}
            placeholder="Name"
            icon={AiOutlineUser}
            isRequired={true}
          />

          {/* Email */}
          <InputField
            name="email"
            type="email"
            value={signUpData.email}
            onChange={onInputChange}
            placeholder="Email"
            icon={AiOutlineMail}
            isRequired={true}
          />

          {/* Password */}
          <InputField
            name="password"
            type="password"
            value={signUpData.password}
            onChange={onInputChange}
            placeholder="Password"
            icon={AiOutlineLock}
            isRequired={true}
          />

          {/* Confirm Password */}
          <InputField
            name="confirmPassword"
            type="password"
            value={signUpData.confirmPassword}
            onChange={onInputChange}
            placeholder="Confirm Password"
            icon={AiOutlineLock}
            isRequired={true}
          />

          {/* Mobile Number */}
          <InputField
            name="mobile"
            type="tel"
            value={signUpData.mobile}
            onChange={onInputChange}
            placeholder="Mobile Number"
            icon={AiOutlinePhone}
            isRequired={true}
          />

          {/* Address */}
          <InputField
            name="address"
            type="text"
            value={signUpData.address}
            onChange={onInputChange}
            placeholder="Address"
            icon={AiOutlineHome}
            isRequired={true}
          />

          {/* Sign Up Button */}
          <div className="form-control lg:col-span-2 mt-6">
            <button className="btn btn-primary w-full" disabled={isLoading}>
              {!isLoading ? (
                " Sign Up"
              ) : (
                <span className="loading loading-spinner"></span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
