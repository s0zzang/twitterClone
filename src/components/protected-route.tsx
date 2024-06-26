import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = auth.currentUser; // 로그인 여부 반환
  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
