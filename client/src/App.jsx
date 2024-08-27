import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Navigate, Outlet } from "react-router-dom";
import { ContextProvider, useGlobalContext } from "./contexts/GlobalContext"; // Ensure the context import is correct
import Login from "./pages/Login";
import Landing from "./pages/Landing";


function App() {
  return (
    <ContextProvider>
      <AppContent />
    </ContextProvider>
  );
}

function AppContent() {
  const { isAuthenticated } = useGlobalContext(); 

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet  /> 
      </main>
      <Footer />
    </div>
  );
}

export default App;
