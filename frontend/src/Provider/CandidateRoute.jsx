import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const CandidateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user && user.role === "candidate") {
    return children;
  }
  return <Navigate to={"/jobs"} />;
};

export default CandidateRoute;
