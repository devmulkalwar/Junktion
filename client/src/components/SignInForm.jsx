import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'

const SignInForm = () => {
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
  const [check, setCheck] = useState(false);
  const navigate = useNavigate(); // Import useNavigate
  
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const onCheck = () => {
      setCheck(!check);
  };
  
    const handleSubmit = async (e) => {
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log('Response from server:', data);

        if (response.ok) {
          // Store user data and token in local storage
          localStorage.setItem('user', JSON.stringify(data.data));
          localStorage.setItem('token', data.token);

          // Redirect to homepage
          navigate('/home'); // Adjust the path as needed
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form. Check console for details.');
      }
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