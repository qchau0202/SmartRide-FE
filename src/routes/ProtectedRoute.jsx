import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../services/api";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    getCurrentUser()
      .then((res) => setUser(res.data.user))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  // If not logged in, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // If admin and not already on /admin, redirect to /admin/dashboard
  if (user.role === "admin" && !location.pathname.startsWith("/admin")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If not admin but trying to access /admin, redirect to /
  if (user.role !== "admin" && location.pathname.startsWith("/admin")) {
    return <Navigate to="/" replace />;
  }

  // Otherwise, render the children
  return children;
};

export default ProtectedRoute;
