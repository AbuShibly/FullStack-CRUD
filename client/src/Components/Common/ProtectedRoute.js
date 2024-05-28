import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString);
  if (!userData?.id) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
