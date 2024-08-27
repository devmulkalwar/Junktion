// src/components/Signup/ProfileImageUpload.js
import React from "react";
import { MdAddAPhoto } from "react-icons/md";

const ProfileUpload = ({ imagePreview, role, handleClickImageUpload, handleImageChange, fileInputRef }) => {
  return (
    <div className="relative">
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="Profile Preview"
          className="w-24 h-24 rounded-full object-cover"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}
      <button
        type="button"
        onClick={handleClickImageUpload}
        className={`absolute bottom-0 right-0 text-white p-2 rounded-full shadow-md ${
          role === "Kabadiwala" ? "bg-indigo-500" : "bg-green-500"
        }`}
      >
        <MdAddAPhoto size={24} />
      </button>
      <input
        type="file"
        name="profileImage"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        className="hidden"
      />
    </div>
  );
};

export default ProfileUpload;
