import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { FaTimesCircle } from "react-icons/fa";

const BookingCanceled = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const role = searchParams.get("role") || "customer";
  // You can also add a ?by=driver or ?by=customer for more detail
  const canceledBy =
    searchParams.get("by") || (role === "customer" ? "customer" : "driver");

  let message = "";
  if (role === "customer") {
    message =
      canceledBy === "customer"
        ? "You have canceled the booking."
        : "The driver has canceled your booking.";
  } else {
    message =
      canceledBy === "driver"
        ? "You have canceled the booking."
        : "The customer has canceled the booking.";
  }

  return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
        <FaTimesCircle className="text-red-500" size={72} />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Booking Canceled
          </h2>
          <p className="text-gray-500">{message}</p>
        </div>
        <Button
          type="primary"
          size="large"
          className="font-bold px-8"
          style={{
            borderRadius: 12,
            backgroundColor: "#10b981",
            borderColor: "#10b981",
          }}
          onClick={() => navigate("/")}
        >
          Go to Home
        </Button>
      </div>
  );
};

export default BookingCanceled;
