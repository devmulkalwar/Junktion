import React, { useState } from "react";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai"; // Lock and Mail icons
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/FormComponents/InputField";
import { useGlobalContext } from "../contexts/GlobalContext";

const Login = () => {
  const { login, isLoading} = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await login(email,password); 
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-evenly m-5 lg:m-8 gap-6 items-center flex-col lg:flex-row-reverse flex-grow">
      <div className="text-center lg:text-left max-w-4xl">
        <h1 className="text-4xl lg:text-6xl font-bold">Welcome Back!</h1>
        <p className="hidden lg:block mt-2 text-xl py-6">
          Junktion is a waste management platform designed to streamline the
          process of buying and selling scrap materials. Login to continue
          managing your waste and contributing to a sustainable future.
        </p>
        <p className="mt-2 text-md lg:text-xl">
          Don't have an account yet?
          <Link to="/signup" className="text-md font-semibold text-primary">
            Sign Up
          </Link>
        </p>
      </div>

      <div className="card w-full max-w-2xl shrink-0 shadow-2xl bg-base-300">
        <form onSubmit={handleSubmit} className="card-body grid grid-cols-1 gap-4">
          {/* Email */}
          <InputField
            name="Email"
            type="email"
            onChange={handleEmailChange}
            valuev= {email}
            placeholder="Email"
            icon={AiOutlineMail}
            isRequired={true}
          />

          {/* Password */}
          <InputField
            name="Password"
            type="password"
            onChange={handlePasswordChange}
            value={password}
            placeholder="Password"
            icon={AiOutlineLock}
            isRequired={true}
          />

          {/* Forgot Password Link */}
          <div className="form-control">
            <Link
              to="/forgot-password"
              className="text-sm text-primary text-right"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full" onClick={handleSubmit} disabled = {isLoading}>
              {!isLoading ? (
                "Login"
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

export default Login;
