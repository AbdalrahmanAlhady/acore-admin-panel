// src/layouts/ProtectedLayout.jsx
import { Outlet, Navigate } from "react-router-dom";

const ProtectedLayout = () => {
  const isAuthenticated = !!localStorage.getItem("email"); // Replace with your auth logic

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedLayout;
