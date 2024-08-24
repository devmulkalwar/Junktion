import React, { useState, useRef } from "react";
import { MdAddAPhoto } from "react-icons/md";

const Signup = () => {
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

    // Preview the image
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here, including handling the profile image
    console.log("Form Data Submitted:", formData);
  };

  return (
    <section className="ezy__signup flex bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white overflow-hidden">
      <div className="container px-4 mx-auto min-h-screen max-w-7xl">
        <div className="grid grid-cols-12 h-96 lg:h-full">
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 order-2">
            <div
              className="hidden lg:block w-full h-full lg:w-[50vw] bg-cover bg-center bg-no-repeat float-left"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1506984548480-17c160170c06?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                backgroundSize: "75%",
              }}
            ></div>
          </div>
          <div className="col-span-12 lg:col-span-5 py-12 ">
            <div className="flex items-center justify-center h-full">
              <div className="w-full">
                <div className="bg-blue-100 bg-opacity-70 dark:bg-slate-800 shadow-xl rounded-2xl p-4 md:p-12">
                  <h2 className="text-indigo-900 dark:text-white text-3xl font-bold mb-3">
                    Create your Junktion account
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex items-center justify-between mb-6">
                      {/* Profile Picture Upload */}
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
                            formData.role === "Kabadiwala"
                              ? "bg-indigo-500"
                              : "bg-green-500"
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

                      {/* Toggle Role Button */}
                      <button
                        type="button"
                        onClick={toggleRole}
                        className={`ml-4 px-4 py-2 border rounded-md shadow-sm transition-all duration-300 ease-in-out focus:outline-none ${
                          formData.role === "Kabadiwala"
                            ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                            : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                      >
                        {formData.role}
                      </button>
                    </div>

                    <div>
                      <label className="block mb-2 font-normal" htmlFor="name">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter Name"
                        required
                        className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-normal" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter Email"
                        required
                        className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-normal" htmlFor="password">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter Password"
                        required
                        className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-normal" htmlFor="confirmPassword">
                        Confirm Password
                      </label>
                      <input
                      id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Enter Confirm Password"
                        required
                        className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-normal" htmlFor="mobile">
                        Mobile Number
                      </label>
                      <input
                        id="mobile"
                        type="text"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="Enter Mobile Number"
                        required
                        className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-normal" htmlFor="address">
                        Address
                      </label>
                      <input
                        id="address"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter Google Map Address Link"
                        required
                        className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
                      />
                    </div>

                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className={`w-full px-4 py-2 rounded-md shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        formData.role === "Kabadiwala"
                          ? "bg-indigo-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      Sign Up
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
