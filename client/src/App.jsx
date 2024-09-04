import React from "react";
import Header from "./components/Header/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContextProvider } from "./contexts/GlobalContext";

function App() {
  return (
    <ContextProvider>
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </div>
    </ContextProvider>
  );
}

export default App;
