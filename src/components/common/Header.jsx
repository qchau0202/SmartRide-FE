import { Link, useNavigate } from "react-router-dom";
import { Popover, Button } from "antd";
import { getCurrentUser } from "../../services/api";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import DriverForm from "../driver/DriverForm";
import BookingHistoryModal from "../booking/BookingHistoryModal";

const Header = () => {
  const [user, setUser] = useState(null);
  const [driverModalOpen, setDriverModalOpen] = useState(false);
  const [rideHistoryModalOpen, setRideHistoryModalOpen] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data.user);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load user info");
      }
    };
    fetchUser();
  }, []);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out!");
    navigate("/login");
  };
  const handleBecomeDriverSuccess = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res.data.user);
    } catch (err) {
      toast.error(err.message || "Failed to become driver");
    }
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
    <div className="grid grid-cols-2 bg-white shadow py-3">
      {/* Logo/Brand Name */}
      <div className="col-span-1 flex items-center pl-2">
        <Link to="/" className="text-2xl font-bold text-emerald-500">
          SmartRide
        </Link>
      </div>
      {/* User Avatar and Name */}
      <div className="col-span-1 flex items-center justify-end space-x-2 pr-2">
        {user?.role === "customer" && (
          <div className="flex items-center gap-2">
            <Button
              type="primary"
              onClick={() => setRideHistoryModalOpen(true)}
            >
              Ride History
            </Button>
          </div>
        )}
        {user?.role === "customer" && (
          <div className="flex items-center gap-2">
            <Button onClick={() => setDriverModalOpen(true)}>
              Become a Driver
            </Button>
          </div>
        )}
        <Popover
          content={popoverContent}
          trigger="click"
          placement="bottomRight"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{user?.name}</span>
            <img
              src={user?.avatar || "https://avatar.iran.liara.run/public/13"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-emerald-500 object-cover cursor-pointer"
            />
          </div>
        </Popover>
      </div>
      <DriverForm
        open={driverModalOpen}
        onClose={() => setDriverModalOpen(false)}
        onSuccess={handleBecomeDriverSuccess}
      />
      <BookingHistoryModal
        open={rideHistoryModalOpen}
        onClose={() => setRideHistoryModalOpen(false)}
      />
    </div>
  );
};

export default Header;
