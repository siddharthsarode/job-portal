import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    console.log(user.role);
    switch (user.role) {
      case "candidate":
        return <Navigate to="/candidate" />;
      case "employer":
        return <Navigate to="/employer" />;
      case "admin":
        return <Navigate to="/admin" />;
      default:
        return <Navigate to="/" />;
    }
  }
  return children;
};
export default PublicRoute;
