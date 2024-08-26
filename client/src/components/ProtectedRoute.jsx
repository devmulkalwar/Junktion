import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useGlobalContext();

  if (!isAuthenticated) {
    return <Navigate to="/landingpage" />;
  }

  return children;
};

export default ProtectedRoute;
