import { demoPayment } from "../../mock-data/demoPayment";
import {
  FaCarSide,
  FaMapMarkerAlt,
  FaCreditCard,
  FaReceipt,
  FaRegCircle,
  FaClock,
} from "react-icons/fa";

const PaymentSummary = () => {
  const { ride, fare, paymentMethod, delivery } = demoPayment;
  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-col justify-between bg-white text-gray-900 p-8 rounded-xl shadow-lg border border-gray-100">
        {/* Ride Details */}
        <div>
          <div className="mb-4">
            <div className="text-lg text-emerald-500 font-semibold mb-2">
              Ride Summary
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <div className="font-bold text-gray-800">Driver</div>
              <div className="flex items-center gap-2 shadow-md rounded-lg p-2">
                <img
                  src={ride.driver.avatar}
                  alt={ride.driver.name}
                  className="w-8 h-8 rounded-full border-2 border-emerald-500 object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-gray-700 font-medium">
                    {ride.driver.name}
                  </span>
                  <div className="text-gray-500 text-sm">
                    {ride.driver.car} • {ride.driver.license}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex space-x-4">
                <div className="flex items-center gap-4">
                  <FaRegCircle className="text-emerald-500 text-xl" />
                  <div>
                    <div className="font-bold text-gray-800">Pickup</div>
                    <div className="text-gray-600">{ride.pickup}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <FaMapMarkerAlt className="text-emerald-500 text-xl" />
                  <div>
                    <div className="font-bold text-gray-800">Dropoff</div>
                    <div className="text-gray-600">{ride.dropoff}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaClock className="text-emerald-500 text-xl" />
                <div>
                  <div className="font-bold text-gray-800">Date & Time</div>
                  <div className="text-gray-600">
                    {ride.date} at {ride.time}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Fare Breakdown */}
          <div className="mb-6">
            <div className="font-semibold text-lg text-emerald-600">
              Fare Breakdown
            </div>
            <div className="space-y-1">
              {fare.breakdown.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex justify-between ${
                    item.label === "Total"
                      ? "font-bold text-emerald-600 mt-2"
                      : "text-gray-700"
                  }`}
                >
                  <span>{item.label}:</span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Payment Method & Delivery */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <FaCreditCard className="text-emerald-500" />
              <span className="font-semibold text-gray-700">
                Payment Method:
              </span>
              <span className="text-gray-600">{paymentMethod}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaReceipt className="text-emerald-500" />
              <span className="font-semibold text-gray-700">
                {delivery.method}
              </span>
              <span className="ml-2 text-gray-400">{delivery.note}</span>
            </div>
          </div>
        </div>
        {/* Footer (optional) */}
        <div className="mt-10 text-xs text-gray-400 text-center opacity-80">
          Powered By SmartRide. By clicking pay you agree to our T&amp;C,
          Privacy.
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
