import React, { useState } from 'react'

const SignInForm = () => {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const [check, setCheck] = useState(false);
  
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const onCheck = () => {
      setCheck(!check);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add your form submission logic here, including handling the profile image
      console.log("Form Data Submitted:", formData);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-normal" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter Email Address"
            required
            className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-normal" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            required
            className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
          />
        </div>
        <div className="mb-4">
          <input
            type="checkbox"
            className="mr-2"
            id="remember-me"
            onChange={onCheck}
          />
          <label className="font-normal" htmlFor="remember-me">
            Remember me
          </label>
        </div>
        <button className="bg-indigo-900 text-white py-3 px-6 rounded w-full font-bold">
          Login
        </button>
        <button className="hover:text-blue-600 font-medium py-2 px-4 rounded-lg w-full">
          Forget your password?
        </button>
      </form>
    );
  };
  
export default SignInForm