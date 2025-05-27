import { Button, Tag } from "antd";
import { FaMapMarkerAlt, FaRegCalendarAlt, FaRegCircle } from "react-icons/fa";
import { arriveRide, completeRide } from "../../services/api";

const statusColors = {
  pending: "#f59e42", // orange
  accepted: "#10b981", // emerald
  rejected: "#ef4444", // red
};

const paymentLabels = {
  cash: "Cash",
  card: "Card",
  banking: "Banking",
};

const BookingCard = ({ booking, onAccept, onReject }) => {
  const {
    customer = {},
    pickup,
    dropoff,
    datetime,
    status,
    fare,
    paymentMethod,
    _id,
  } = booking;

  // Driver actions
  const handleArrive = async () => {
    try {
      await arriveRide(_id);
      window.location.reload(); // Or trigger a state update
    } catch (err) {
      alert(err.message || "Failed to mark as arrived");
    }
  };
  const handleComplete = async () => {
    try {
      await completeRide(_id);
      window.location.reload(); // Or trigger a state update
    } catch (err) {
      alert(err.message || "Failed to complete ride");
    }
  };

  return (
    <div className="flex bg-white rounded-lg shadow-md p-5 mb-4 hover:shadow-lg transition-all group">
      {/* Avatar */}
      <img
        src={customer.avatar || "https://avatar.iran.liara.run/public/3"}
        alt="Customer Avatar"
        className="w-14 h-14 rounded-full border-2 border-emerald-500 object-cover mr-4 mt-2"
      />
      {/* Main Info */}
      <div className="flex-1 flex flex-col justify-between space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Name & Date */}
          <div>
            <div className="font-semibold text-gray-900 text-lg">
              {customer.name || "Customer"}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <FaRegCalendarAlt className="mr-1 text-emerald-400" />
              {datetime}
            </div>
          </div>
          {/* Status & Actions */}
          <div className="flex items-center space-x-2">
            <Tag
              color={statusColors[status] || "#d1d5db"}
              className="text-base font-semibold rounded-full px-4 py-1"
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Tag>
          </div>
        </div>
        {/* Pickup/Dropoff Stepper */}
        <div className="flex items-start">
          <div className="flex flex-col items-center mr-4">
            <FaRegCircle className="text-emerald-500 text-lg" />
            <div className="h-6 w-px bg-gray-300" />
            <FaMapMarkerAlt className="text-emerald-500 text-lg" />
          </div>
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="font-medium text-gray-800">{pickup}</span>
            </div>
            <div>
              <span className="font-medium text-gray-800">{dropoff}</span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              <span className="font-semibold">Fare:</span>{" "}
              {fare?.toLocaleString()} VND
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-semibold">Payment:</span>{" "}
              {paymentLabels[paymentMethod] || paymentMethod}
            </div>
          </div>
        </div>
        {/* Driver action buttons */}
        {status === "pending" && (
          <div className="flex items-center space-x-2">
            <Button
              type="primary"
              className="bg-emerald-500 border-emerald-500 font-bold w-20"
              style={{ borderRadius: 12 }}
              onClick={onAccept}
            >
              Accept
            </Button>
            <Button
              danger
              className="font-bold w-20"
              style={{ borderRadius: 12 }}
              onClick={onReject}
            >
              Reject
            </Button>
          </div>
        )}
        {status === "accepted" && (
          <div className="flex items-center space-x-2">
            <Button
              type="primary"
              className="bg-blue-500 border-blue-500 font-bold w-28"
              style={{ borderRadius: 12 }}
              onClick={handleArrive}
            >
              Arrived
            </Button>
          </div>
        )}
        {status === "onGoing" && (
          <div className="flex items-center space-x-2">
            <Button
              type="primary"
              className="bg-green-500 border-green-500 font-bold w-32"
              style={{ borderRadius: 12 }}
              onClick={handleComplete}
            >
              Complete Ride
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;
