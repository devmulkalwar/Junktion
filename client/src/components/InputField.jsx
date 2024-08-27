// src/components/Signup/InputField.js
import React from "react";

const InputField = ({ label, name, type, value, onChange, placeholder }) => {
  return (
    <div>
      <label className="block mb-2 font-normal" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
      />
    </div>
  );
};

export default InputField;
