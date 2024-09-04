import React from "react";
import { useGlobalContext } from "../../contexts/GlobalContext";

const SubmitButton = ({ handleSubmit, btnText }) => {
  const { isLoading } = useGlobalContext();
  return (
    <button
      className="btn btn-primary btn-wide mt-6 self-center"
      onClick={handleSubmit} // If handleSubmit is for button click, this is correct
      disabled={isLoading}
    >
      {!isLoading ? (
        btnText 
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </button>
  );
};

export default SubmitButton;
