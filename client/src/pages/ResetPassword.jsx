import React from 'react'
import InputField from '../components/FormComponents/InputField'
import { AiOutlineLock } from 'react-icons/ai'

const ResetPassword = () => {
  return (
    <div className="flex flex-grow m-5 md:mx-auto md:my-auto flex-col items-center justify-center ">
      <div className="flex flex-col w-full max-w-lg min-w-sm shadow-xl p-6 gap-4 rounded-lg bg-base-300">
        <h2 className="text-3xl font-bold text-center mb-4 text-primary">Reset Password</h2>
        
        {/* Password */}
        <InputField
            name="Password"
            type="password"
            placeholder="Password"
            icon={AiOutlineLock}
            isRequired={true}
          />

          {/* Confirm Password */}
          <InputField
            name="Confirm Password"
            type="password"
            placeholder="Confirm password"
            icon={AiOutlineLock}
            isRequired={true}
          />
        <div className="form-control lg:col-span-2 mt-6">
            <button className="btn btn-primary w-full">Reset Password</button>
          </div>
      </div>
    </div>
  )
}

export default ResetPassword