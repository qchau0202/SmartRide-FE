import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
const AppLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
