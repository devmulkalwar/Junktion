import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { RouterProvider, createBrowserRouter } from "react-router-dom"

// pages import
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Error from './pages/Error.jsx'

const router = createBrowserRouter([
  {
      path: "/",
      element: <App />,
      errorElement: <Error />,
      children: [
          { index: true, element: <Home /> },
          { path: "home", element: <Home /> },
          { path: "login", element: <Login /> },
          { path: "signup", element: <Signup /> },
          { path: "about", element: <About /> },
          { path: "contact", element: <Contact /> }, 
          {path: "profile", element: <Profile />},
      ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)