import { useEffect, useState } from "react";
import { Modal, List, Spin, Button } from "antd";
import { getUserRides } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const BookingHistoryModal = ({ open, onClose }) => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    getUserRides()
      .then((res) => setRides(res.data.rides))
      .catch((err) => toast.error(err.message || "Failed to load history"))
      .finally(() => setLoading(false));
  }, [open]);

  const handleClick = (rideId) => {
    onClose();
    navigate(`/booking/booking-history/${rideId}`);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Your Ride History"
    >
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <Spin size="large" />
        </div>
      ) : (
        <List
          dataSource={rides}
          renderItem={(ride) => (
            <List.Item
              className="cursor-pointer hover:bg-gray-100 rounded-lg px-2"
              onClick={() => handleClick(ride._id)}
            >
              <div className="flex flex-col w-full px-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-800">
                    {ride.pickup} → {ride.dropoff}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(ride.datetime).toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  Status:{" "}
                  {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                </div>
              </div>
            </List.Item>
          )}
        />
          )}
          <Button
              type="primary"
              className="mt-4 w-full"
            onClick={() => navigate("/booking/booking-history")}
          >
            View History
          </Button>
    </Modal>
  );
};

export default BookingHistoryModal;
