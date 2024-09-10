import React, { useState } from "react";
import OTPInput from "../Components/OTP/OTPInput";
import SubmitButton from "../Components/OTP/SubmitButton";
import ResendOTP from "../Components/OTP/ResendOTP";
import { useGlobalContext } from "../contexts/GlobalContext";

const OTPPage = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const { verifyEmail, isLoading } = useGlobalContext();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if value is entered
      if (value !== "" && index < 5) {
        e.target.nextElementSibling?.focus();
      }
    }
  };

  const handleKeyDown = (e, index, inputRefs) => {
    if (e.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e, inputRefs) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const digits = pastedData.split("").filter((char) => /^\d$/.test(char));

    const newOtp = [...otp];
    digits.forEach((digit, idx) => {
      if (idx < 6) {
        newOtp[idx] = digit;
        inputRefs.current[idx].value = digit;
      }
    });
    setOtp(newOtp);

    const nextIndex = digits.length;
    if (nextIndex < 6) {
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = async () => {
    const code = otp.join("");
    console.log(code);
    try {
      await verifyEmail(code);
    } catch (err) {
      console.log(err);
    }
  };

  const handleResend = () => {
    console.log("Resending OTP...");
  };

  return (
    <div className="flex flex-grow mx-3 md:mx-auto my-6 flex-col items-center justify-center">
      <div className="flex flex-col w-full max-w-md min-w-sm shadow-xl p-6 rounded-lg bg-base-300">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-primary">
          Verify OTP
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm md:text-base">
          We have sent an OTP to your email: <br />
          <span className="font-semibold">devmulkalwar@gmail.com</span>
        </p>
        <OTPInput
          otp={otp}
          handleChange={handleChange}
          handleKeyDown={handleKeyDown}
          handlePaste={handlePaste}
        />
        <SubmitButton handleSubmit={handleSubmit} btnText="Verify OTP" />
        <ResendOTP handleResend={handleResend} />
        <div className="text-center text-xs md:text-sm text-gray-500 mt-4">
          Didn't receive the OTP? Check your spam folder or try resending it.
        </div>
      </div>
    </div>
  );
};

export default OTPPage;
