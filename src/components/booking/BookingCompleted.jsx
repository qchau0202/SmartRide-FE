import {
  FaCheckCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStar,
} from "react-icons/fa";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const BookingCompleted = ({ driver, ride }) => {
  const navigate = useNavigate();
  const d = driver?.user || {
    name: "Alex Nguyen",
    avatar: "https://avatar.iran.liara.run/public/2",
    phone: "0901 234 567",
  };
  const car = driver?.car || {
    model: "Toyota Vios (White)",
    licensePlate: "51A-123.45",
  };
  const rating = driver?.rating || 4.9;
  const pickup = ride?.pickup || "-";
  const dropoff = ride?.dropoff || "-";

  return (
    <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
      <FaCheckCircle className="text-emerald-500" size={72} />
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Ride Completed!
        </h2>
        <p className="text-gray-500">
          Thank you for riding with SmartRide. We hope you had a great journey!
        </p>
        <div className="flex items-center justify-center mt-4">
          <div className="flex flex-col items-center space-y-2 bg-gray-50 rounded-xl p-6 shadow">
            <img
              src={d.avatar}
              alt="Driver Avatar"
              className="w-16 h-16 rounded-full border-2 border-emerald-500 object-cover mb-2"
            />
            <div className="text-lg font-semibold text-gray-800">{d.name}</div>
            <div className="flex items-center text-yellow-500 text-base font-semibold">
              <FaStar className="mr-1" /> {rating}
            </div>
            <div className="text-gray-600">{car.model}</div>
            <div className="text-gray-500">{car.licensePlate}</div>
            <div className="flex items-center gap-2 text-gray-500">
              <FaPhoneAlt className="mr-1" /> {d.phone}
            </div>
            <div className="flex items-center gap-2 text-gray-500 mt-2">
              <FaMapMarkerAlt className="text-emerald-500" />
              <span className="font-medium">
                {pickup} → {dropoff}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        {["card", "banking"].includes(ride?.paymentMethod) && (
          <Button
            type="primary"
            size="large"
            className="font-bold px-8"
            style={{
              borderRadius: 12,
              backgroundColor: "#2563eb",
              borderColor: "#2563eb",
            }}
            onClick={() => navigate(`/payment?rideId=${ride?._id || ""}`)}
          >
            Go to Payment
          </Button>
        )}
        {
          ride?.paymentMethod === "cash" && (
            <Button
              type="primary"
              size="large"
              className="font-bold px-8"
              onClick={() => navigate("/")}
            >
              Go to Home
            </Button>
          )
        }
      </div>
    </div>
  );
};

export default BookingCompleted;
