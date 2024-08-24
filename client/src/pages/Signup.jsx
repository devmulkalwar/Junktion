// /* eslint-disable react/no-unknown-property */
// import React, { useState } from 'react';

// const SignUpForm = () => {
//   const [validated, setValidated] = useState(false);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.preventDefault();
//       event.stopPropagation();
//     }

//     setValidated(true);
//   };

//   return (
//     <form noValidate validated={validated} onSubmit={handleSubmit} className="mt-6">
//       <div className="w-full relative mb-6">
//         <input
//           type="text"
//           className="bg-transparent border-b border-black dark:border-gray-200 focus:outline-none focus:border-blue-600 text-sm w-full py-2"
//           id="uname"
//           placeholder="Username"
//         />
//       </div>
//       <div className="w-full relative mb-6">
//         <input
//           type="email"
//           className="bg-transparent border-b border-black dark:border-gray-200 focus:outline-none focus:border-blue-600 text-sm w-full py-2"
//           id="email"
//           placeholder="Email Address"
//         />
//       </div>
//       <div className="w-full relative mb-6">
//         <input
//           type="pass"
//           className="bg-transparent border-b border-black dark:border-gray-200 focus:outline-none focus:border-blue-600 text-sm w-full py-2"
//           id="pass"
//           placeholder="Password"
//         />
//       </div>
//       <div className="w-full relative mb-6">
//         <input
//           type="pass"
//           className="bg-transparent border-b border-black dark:border-gray-200 focus:outline-none focus:border-blue-600 text-sm w-full py-2"
//           id="con-pass"
//           placeholder="Confirm Password"
//         />
//       </div>
//       <div className="form-group mb-3">
//         <div className="form-check">
//           <input className="form-check-input" type="checkbox" value="" id="remember-me" />
//           <label className="form-check-label" htmlFor="remember-me">
//             {' '}
//             I agree all statements in
//             <a href="#!" className="underline hover:text-blue-600">
//               Terms & Conditions
//             </a>
//           </label>
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="bg-blue-600 py-4 px-10 text-white hover:bg-opacity-95 duration-300 mt-4">
//         Register
//       </button>
//     </form>
//   );
// };

// const Signup = () => {
//   return (
//     <section className="ezy__signup15 light flex items-center justify-center py-14 md:py-24 bg-white dark:bg-[#0b1727] text-black text-opacity-90 dark:text-white overflow-hidden">
//       <div className="container px-4 mx-auto">
//         <div className="flex justify-center">
//           <div className="w-full md:w-2/3">
//             <div className="bg-white dark:bg-slate-800 shadow-xl p-6 lg:p-12">
//               <div className="flex flex-wrap justify-between items-center">
//                 <div className="w-full lg:w-1/2 lg:order-2">
//                   <div className="flex flex-col items-center justify-center h-full mt-12 lg:mt-0">
//                     <img
//                       src="https://cdn.easyfrontend.com/pictures/sign-in-up/abstract1.png"
//                       alt=""
//                     />
//                     <div className="text-center mt-12">
//                       <a href="/login" className="underline hover:text-blue-200 duration-300">
//                         I am already a member
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
//                   <div className="flex flex-col h-full p-2 lg:p-6 xl:p-12">
//                     <h2 className="text-3xl md:text-[45px] font-bold mb-2">Sign Up</h2>
//                     <SignUpForm />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Signup;

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
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col items-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </label>
            <div className="relative mb-4">
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

            <div className="flex justify-center mb-4">
              <button
                type="button"
                onClick={toggleRole}
                className={`px-4 py-2 border rounded-md shadow-sm ${
                  formData.role === "Kabadiwala"
                    ? "bg-indigo-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {formData.role}
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
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
  );
};

export default Signup;
