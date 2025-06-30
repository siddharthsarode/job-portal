import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (user && user.role === "admin") {
    return children;
  }
  return <Navigate to={"/jobs"} />;
};

export default AdminRoute;
