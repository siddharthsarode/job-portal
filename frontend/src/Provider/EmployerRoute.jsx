import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const EmployerRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user && user.role === "employer") {
    return children;
  }
  return <Navigate to={"/jobs"} />;
};

export default EmployerRoute;
