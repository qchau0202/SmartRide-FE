import { Button } from "antd";
import { FaRegClock } from "react-icons/fa";

const BookingPending = ({ onCancel }) => {
  return (
    <div className="grid grid-cols-2 h-full">
      <div className="col-span-1 flex flex-col items-center justify-center h-full text-center space-y-8">
        <FaRegClock className="text-emerald-500" size={72} />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Looking for a driver…
          </h2>
          <p className="text-gray-500">
            Hang tight! We're finding the best driver for you.
          </p>
        </div>
        <Button
          type="primary"
          danger
          size="large"
          onClick={onCancel}
          className="font-bold px-8"
          style={{ borderRadius: 12 }}
        >
          Cancel Booking
        </Button>
      </div>
      <div className="col-span-1 flex justify-center items-center bg-emerald-500">
        <img src="./bg_pending.png" alt="" className="w-3/4" />
      </div>
    </div>
  );
};

export default BookingPending;
