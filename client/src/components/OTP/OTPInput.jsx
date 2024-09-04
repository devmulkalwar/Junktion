import React, { useEffect, useRef } from "react";

const OTPInput = ({ otp, handleChange, handleKeyDown, handlePaste }) => {
  const inputRefs = useRef([]);

  // Focus on the first input when the component mounts
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="flex justify-center space-x-2">
      {[...Array(6)].map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          ref={(el) => (inputRefs.current[index] = el)}
          className="input-bordered rounded-md bg-base-100 text-center  h-8 w-8 "
          value={otp[index] || ""}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index, inputRefs)}
          onPaste={(e) => handlePaste(e, inputRefs)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
