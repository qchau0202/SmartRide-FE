import { FaMapMarkerAlt, FaPhoneAlt, FaStar } from "react-icons/fa";
import Map from "../Map";

const DriverArrived = ({ driver }) => {
  // Demo driver data if not provided
  const demoDriver = {
    name: "Alex Nguyen",
    avatar: "https://avatar.iran.liara.run/public/2",
    car: "Toyota Vios (White)",
    license: "51A-123.45",
    phone: "0901 234 567",
    rating: 4.9,
  };
  const d = driver || demoDriver;

  return (
    <div className="grid grid-cols-4 h-full">
      <div className="col-span-1 flex flex-col items-center justify-center h-full text-center space-y-8">
        <FaMapMarkerAlt className="text-emerald-500" size={72} />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your driver has arrived!
          </h2>
          <p className="text-gray-500">
            Please meet your driver at the pickup location.
          </p>
        </div>
        <div className="flex flex-col items-center space-y-2 bg-gray-50 rounded-xl p-6 shadow w-full max-w-xs">
          <img
            src={d.avatar}
            alt="Driver Avatar"
            className="w-16 h-16 rounded-full border-2 border-emerald-500 object-cover mb-2"
          />
          <div className="text-lg font-semibold text-gray-800">{d.name}</div>
          <div className="flex items-center text-yellow-500 text-base font-semibold">
            <FaStar className="mr-1" /> {d.rating}
          </div>
          <div className="text-gray-600">{d.car}</div>
          <div className="text-gray-500">{d.license}</div>
          <div className="flex items-center gap-2 text-gray-500">
            <FaPhoneAlt className="mr-1" /> {d.phone}
          </div>
        </div>
      </div>
      <div className="col-span-3 flex justify-center items-center h-full w-full">
        <div className="h-full w-full">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default DriverArrived;
