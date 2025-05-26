import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Input, Popover, Button, message } from "antd";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    message.success("Logged out!");
    // Add real logout logic here
  };

  const popoverContent = (
    <div className="flex flex-col gap-2 min-w-[120px]">
      <Button
        type="primary"
        className="text-left text-emerald-600 font-semibold hover:bg-emerald-50"
        onClick={() => navigate("/profile")}
      >
        Profile
      </Button>
      <Button
        type="primary"
        danger
        className="w-full font-bold"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );

  return (
    <header className="grid grid-cols-2 bg-white shadow px-8 py-3">
      {/* Logo/Brand Name */}
      <div className="col-span-1 flex items-center space-x-2">
        <Link to="/" className="text-2xl font-bold text-emerald-500">
          SmartRide
        </Link>
      </div>

      {/* User Avatar and Name */}
      <div className="col-span-1 flex justify-end items-center space-x-2">
        <Popover
          content={popoverContent}
          trigger="click"
          placement="bottomRight"
        >
          <img
            src="https://avatar.iran.liara.run/public/13"
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-emerald-500 object-cover cursor-pointer"
          />
        </Popover>
      </div>
    </header>
  );
};

export default Header;
