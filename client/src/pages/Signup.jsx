// src/pages/Signup.js
import React from "react";
import SignupForm from "../components/SignupForm";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <section className="ezy__signup flex bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white overflow-hidden">
      <div className="container px-4 mx-auto min-h-screen max-w-7xl">
        <div className="grid grid-cols-12 h-96 lg:h-full">
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 order-2">
            <div
              className="hidden lg:block w-full h-full lg:w-[50vw] bg-cover bg-center bg-no-repeat float-left"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1506984548480-17c160170c06?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                backgroundSize: "75%",
              }}
            ></div>
          </div>
          <div className="col-span-12 lg:col-span-5 py-12 ">
            <div className="flex items-center justify-center h-full">
              <div className="w-full">
                <div className="bg-blue-100 bg-opacity-70 dark:bg-slate-800 shadow-xl rounded-2xl p-4 md:p-12">
                  <h2 className="text-indigo-900 dark:text-white text-3xl font-bold mb-3">
                    Create your Junktion account
                  </h2>
                  <div className="flex items-center mb-6 md:mb-12">
                    <p className="mb-0 mr-2 opacity-50">
                      Already have an account?
                    </p>
                    <Link to="/login">Login</Link>
                  </div>
                  <SignupForm />
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
