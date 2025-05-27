import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/api";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res.data.user.role !== "admin") {
          navigate("/", { replace: true });
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) return null;

  return (
    <div className="grid grid-cols-8 h-screen">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-7">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
