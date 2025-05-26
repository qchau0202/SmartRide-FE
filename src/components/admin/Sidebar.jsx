import { Link, useLocation } from "react-router-dom";
import { FaCalendar, FaHome, FaUser, FaUserTie } from "react-icons/fa";
import { Popover, Button, message } from "antd";

const menuItems = [
  {
    key: "overview",
    label: "Dashboard",
    icon: <FaHome />,
    to: "/admin/dashboard?view=overview",
  },
  {
    key: "booking",
    label: "Booking",
    icon: <FaCalendar />,
    to: "/admin/dashboard?view=booking",
  },
  {
    key: "customer",
    label: "Customer",
    icon: <FaUser />,
    to: "/admin/dashboard?view=customer",
  },
  {
    key: "driver",
    label: "Driver",
    icon: <FaUserTie />,
    to: "/admin/dashboard?view=driver",
  },
];

const admin = {
  name: "Admin User",
  avatar: "https://avatar.iran.liara.run/public/1",
};

const Sidebar = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const view = params.get("view") || "overview";

  const handleLogout = () => {
    message.success("Logged out!");
    // Add real logout logic here
  };

  const popoverContent = (
    <Button
      type="primary"
      danger
      className="w-full font-bold"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );

  return (
    <div className="flex flex-col h-full bg-white shadow p-3 justify-between">
      <div>
        <h1 className="text-center text-lg text-emerald-500 font-bold mb-1">
          Smart Ride
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Admin Dashboard
        </p>
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive = view === item.key;
            return (
              <Link
                key={item.key}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors
                  ${
                    isActive
                      ? "bg-emerald-50 text-emerald-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <span
                  className={`text-lg ${
                    isActive ? "text-emerald-500" : "text-gray-400"
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      {/* Footer: Admin Info */}
      <Popover content={popoverContent} trigger="click" placement="topLeft">
        <div className="flex items-center gap-3 p-3 border-t border-gray-100 mt-4 cursor-pointer hover:bg-gray-50 rounded-lg transition">
          <img
            src={admin.avatar}
            alt="Admin Avatar"
            className="w-10 h-10 rounded-full border-2 border-emerald-500 object-cover"
          />
          <span className="font-semibold text-gray-800">{admin.name}</span>
        </div>
      </Popover>
    </div>
  );
};

export default Sidebar;
