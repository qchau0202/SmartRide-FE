import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { FaTimesCircle } from "react-icons/fa";

const BookingCanceled = () => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 h-full">
      <div className="col-span-1 flex flex-col items-center justify-center h-full text-center space-y-8">
        <FaTimesCircle className="text-red-500" size={72} />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Booking Canceled
          </h2>
          <p className="text-gray-500">The booking has been canceled.</p>
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
      <div className="col-span-1 flex justify-center items-center bg-emerald-500">
        <img src="./bg_canceled.png" alt="" className="w-3/4" />
      </div>
    </div>
  );
};

export default BookingCanceled;
