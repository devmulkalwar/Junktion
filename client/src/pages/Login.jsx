/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react';


const SignInForm = () => {
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
    <form noValidate validated={validated} onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2 font-normal" htmlFor="email">
          Email Address
        </label>
        <input
          type="text"
          className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
          id="email"
          placeholder="Enter Email Address"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-normal" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="w-full bg-blue-50 dark:bg-slate-700 min-h-[48px] leading-10 px-4 p-2 rounded-lg outline-none border border-transparent focus:border-blue-600"
          id="password"
          placeholder="Enter Password"
        />
      </div>
      <div className="mb-4">
        <input type="checkbox" className="mr-2" id="remember-me" checked />
        <label className="font-normal" htmlFor="remember-me">
          Remember me
        </label>
      </div>
      <button className="bg-indigo-900 text-white py-3 px-6 rounded w-full font-bold">
        Login
      </button>
      <button className="hover:text-blue-600 font-medium py-2 px-4 rounded-lg w-full">
        Forget your password?
      </button>
    </form>
  );
};

const Login = () => {
  return (
    <section className="ezy__signin4 light flex bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white overflow-hidden">
      <div className="container px-4 mx-auto min-h-screen max-w-7xl">
        <div className="grid grid-cols-12 h-96 lg:h-full">
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 order-2">
            <div
              className="hidden lg:block w-full h-full lg:w-[50vw] bg-cover bg-center bg-no-repeat float-left"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1506984548480-17c160170c06?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                backgroundSize: '75%',
              }}></div>
          </div>
          <div className="col-span-12 lg:col-span-5 py-12">
            <div className="flex items-center justify-center h-full">
              <div className="w-full">
                <div className="bg-blue-100 bg-opacity-70 dark:bg-slate-800 shadow-xl rounded-2xl p-4 md:p-12">
                  <h2 className="text-indigo-900 dark:text-white text-3xl font-bold mb-3">
                    Welcome to Junktion
                  </h2>
                  <div className="flex items-center mb-6 md:mb-12">
                    <p className="mb-0 mr-2 opacity-50">Don't have an account?</p>
                    <a href="/signup">Create Account</a>
                  </div>

                  <SignInForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;