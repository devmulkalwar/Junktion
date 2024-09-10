import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import InputField from "../components/FormComponents/InputField"; // Assuming this is your custom input component
import { useGlobalContext } from "../contexts/GlobalContext"; // Assuming this handles the forgot password logic

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword, isLoading } = useGlobalContext(); // Assume you have a forgotPassword function in your global context

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleForgot = async () => {
    try {
      // Call the forgot password function from context or handle it locally
      await forgotPassword(email);
    } catch (error) {
      console.error("Failed to send reset email:", error);
    }
  };

  return (
    <div className="flex flex-grow m-5 md:mx-auto md:my-auto flex-col items-center justify-center">
      <form
        onSubmit={handleForgot}
        className="flex flex-col w-full max-w-lg min-w-sm shadow-xl p-6 gap-4 rounded-lg bg-base-300"
      >
        <h2 className="text-3xl font-bold text-center mb-4 text-primary">
          Enter Registered Email
        </h2>

        {/* Email */}
        <InputField
          name="email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          icon={AiOutlineMail}
          isRequired={true}
        />

        <div className="form-control lg:col-span-2 mt-6">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isLoading}
          >
            {!isLoading ? (
              "Submit"
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
