import { Button } from "antd";
import { FaCarSide, FaPhoneAlt, FaStar, FaMapMarkerAlt } from "react-icons/fa";

const BookingFound = ({ driver, ride, onContact }) => {
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
    <div className="grid grid-cols-2 h-full">
      <div className="col-span-1 flex flex-col items-center justify-center h-full text-center space-y-8">
        <FaCarSide className="text-emerald-500" size={72} />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Driver found!
          </h2>
          <p className="text-gray-500">Your driver is on the way.</p>
        </div>
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
        <Button
          type="primary"
          icon={<FaPhoneAlt />}
          size="large"
          className="font-bold px-8"
          style={{ borderRadius: 12 }}
          onClick={onContact}
        >
          Contact Driver
        </Button>
      </div>
      <div className="col-span-1 flex justify-center items-center bg-emerald-500">
        <img src="./bg_found.png" alt="" className="w-3/4" />
      </div>
    </div>
  );
};

export default BookingFound;
