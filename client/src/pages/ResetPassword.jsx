import React, { useState } from "react";
import InputField from "../components/FormComponents/InputField";
import { AiOutlineLock } from "react-icons/ai";
import { useGlobalContext } from "../contexts/GlobalContext";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { resetPassword, isLoading } = useGlobalContext();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (confirmPassword !== password) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      await resetPassword(token, password);
    } catch (error) {
      console.error("Failed to send reset password:", error);
    }
  };

  return (
    <div className="flex flex-grow m-5 md:mx-auto md:my-auto flex-col items-center justify-center ">
      <form
        className="flex flex-col w-full max-w-lg min-w-sm shadow-xl p-6 gap-4 rounded-lg bg-base-300"
        onSubmit={handleResetPassword}
      >
        <h2 className="text-3xl font-bold text-center mb-4 text-primary">
          Reset Password
        </h2>

        {/* Password */}
        <InputField
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          icon={AiOutlineLock}
          isRequired={true}
        />

        {/* Confirm Password */}
        <InputField
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Confirm Password"
          icon={AiOutlineLock}
          isRequired={true}
        />

        <div className="form-control lg:col-span-2 mt-6">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {!isLoading ? (
              "Reset Password"
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
