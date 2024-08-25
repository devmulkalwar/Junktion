import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { ContextProvider  } from "./contexts/GlobalContext";

function App() {
  return (
    <ContextProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow ">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ContextProvider>
  );
}

export default App;
