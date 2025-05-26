import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";

const AdminLayout = () => {
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
