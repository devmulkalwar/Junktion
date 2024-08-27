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
    profileImage: null, // Image file stored locally
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Set image preview
      setImagePreview(URL.createObjectURL(file));

      // Store the file locally in formData
      setFormData((prevState) => ({
        ...prevState,
        profileImage: file,
      }));
    }
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

    try {
      // Upload the image only when the form is submitted
      let imageUrl = "";

      if (formData.profileImage) {
        setUploading(true);

        // Create FormData to send to Cloudinary
        const uploadFormData = new FormData();
        uploadFormData.append("file", formData.profileImage);
        uploadFormData.append("upload_preset", "t9dkbte8"); // Replace with your Cloudinary upload preset
        uploadFormData.append("cloud_name", "duegl06ax"); // Replace with your Cloudinary cloud name

        // Upload image to Cloudinary
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/duegl06ax/image/upload", // Replace with your Cloudinary URL
          uploadFormData
        );

        imageUrl = response.data.secure_url; // Get the uploaded image URL
      }

      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        mobileNumber: formData.mobile,
        address: formData.address,
        role: formData.role,
        profileImage: imageUrl, // Use the final image URL
      };

      if (formData.password === formData.confirmPassword) {
        const response = await axios.post(
          "http://localhost:3000/api/auth/register",
          payload
        );

        if (response.status === 201) {
          login(response.data.data, response.data.token); // Store user data and token in global context
          console.log("Signup successful:", response.data.data);
        } else {
          alert(`Error: ${response.data.message}`);
        }
      } else {
        alert("Passwords do not match");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Check console for details.");
    } finally {
      setUploading(false);
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
          uploading={uploading} // Pass uploading state
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
          formData.role === "Kabadiwala" ? "bg-indigo-500" : "bg-green-500"
        }`}
        disabled={uploading} // Disable submit button while uploading
      >
        {uploading ? "Uploading..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;
