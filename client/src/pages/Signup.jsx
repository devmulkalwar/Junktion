/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';

const SignUpForm = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <form noValidate validated={validated} onSubmit={handleSubmit} className="mt-6">
      <div className="w-full relative mb-6">
        <input
          type="text"
          className="bg-transparent border-b border-black dark:border-gray-200 focus:outline-none focus:border-blue-600 text-sm w-full py-2"
          id="uname"
          placeholder="Username"
        />
      </div>
      <div className="w-full relative mb-6">
        <input
          type="email"
          className="bg-transparent border-b border-black dark:border-gray-200 focus:outline-none focus:border-blue-600 text-sm w-full py-2"
          id="email"
          placeholder="Email Address"
        />
      </div>
      <div className="w-full relative mb-6">
        <input
          type="pass"
          className="bg-transparent border-b border-black dark:border-gray-200 focus:outline-none focus:border-blue-600 text-sm w-full py-2"
          id="pass"
          placeholder="Password"
        />
      </div>
      <div className="w-full relative mb-6">
        <input
          type="pass"
          className="bg-transparent border-b border-black dark:border-gray-200 focus:outline-none focus:border-blue-600 text-sm w-full py-2"
          id="con-pass"
          placeholder="Confirm Password"
        />
      </div>
      <div className="form-group mb-3">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" value="" id="remember-me" />
          <label className="form-check-label" htmlFor="remember-me">
            {' '}
            I agree all statements in
            <a href="#!" className="underline hover:text-blue-600">
              Terms & Conditions
            </a>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 py-4 px-10 text-white hover:bg-opacity-95 duration-300 mt-4">
        Register
      </button>
    </form>
  );
};

const Signup = () => {
  return (
    <section className="ezy__signup15 light flex items-center justify-center py-14 md:py-24 bg-white dark:bg-[#0b1727] text-black text-opacity-90 dark:text-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex justify-center">
          <div className="w-full md:w-2/3">
            <div className="bg-white dark:bg-slate-800 shadow-xl p-6 lg:p-12">
              <div className="flex flex-wrap justify-between items-center">
                <div className="w-full lg:w-1/2 lg:order-2">
                  <div className="flex flex-col items-center justify-center h-full mt-12 lg:mt-0">
                    <img
                      src="https://cdn.easyfrontend.com/pictures/sign-in-up/abstract1.png"
                      alt=""
                    />
                    <div className="text-center mt-12">
                      <a href="/login" className="underline hover:text-blue-200 duration-300">
                        I am already a member
                      </a>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                  <div className="flex flex-col h-full p-2 lg:p-6 xl:p-12">
                    <h2 className="text-3xl md:text-[45px] font-bold mb-2">Sign Up</h2>
                    <SignUpForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;