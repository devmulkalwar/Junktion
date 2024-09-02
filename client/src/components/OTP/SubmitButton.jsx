import React from 'react';

const SubmitButton = ({ handleSubmit , btnText}) => {
  return (
    <button className="btn btn-primary btn-wide mt-6 self-center" onClick={handleSubmit}>
      {btnText}
    </button>
  );
};

export default SubmitButton;
