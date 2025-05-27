import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaCreditCard,
  FaReceipt,
  FaRegCircle,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";
import { getRideById } from "../../services/api";
import { Spin } from "antd";

const PaymentSummary = () => {
  const [searchParams] = useSearchParams();
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const rideId = searchParams.get("rideId");

  useEffect(() => {
    if (!rideId) return;
    setLoading(true);
    getRideById(rideId)
      .then((res) => setRide(res.data.ride))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [rideId]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (!ride) {
    return (
      <div className="h-full flex items-center justify-center text-red-500">
        Ride not found
      </div>
    );
  }

  // Use fare from ride, and sum up additional fees if present
  const baseFare = ride.fare || 0;
  const additionalFees = Array.isArray(ride.additionalFees)
    ? ride.additionalFees.reduce((sum, fee) => sum + (fee.amount || 0), 0)
    : 0;
  const total = baseFare + additionalFees;

  return (
    <div className="h-full flex justify-end items-center p-6">
      <div className="flex flex-col justify-between bg-white text-gray-900 p-8 rounded-xl shadow-lg border border-gray-100 w-full max-w-lg">
        {/* Ride Details */}
        <div>
          <div className="mb-6">
            <div className="text-xl text-emerald-500 font-semibold mb-4">
              Payment Summary
            </div>
            <div className="flex flex-col gap-4 mb-6">
              <div className="font-bold text-gray-800">Driver Information</div>
              <div className="flex items-center gap-3 shadow-md rounded-lg p-3">
                <img
                  src={
                    ride.driver?.user?.avatar ||
                    "https://avatar.iran.liara.run/public/2"
                  }
                  alt={ride.driver?.user?.name}
                  className="w-12 h-12 rounded-full border-2 border-emerald-500 object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-gray-700 font-medium">
                    {ride.driver?.user?.name}
                  </span>
                  <div className="text-gray-500 text-sm">
                    {ride.driver?.car?.model} • {ride.driver?.car?.licensePlate}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex space-x-6">
                <div className="flex items-center gap-3">
                  <FaRegCircle className="text-emerald-500 text-xl" />
                  <div>
                    <div className="font-bold text-gray-800">Pickup</div>
                    <div className="text-gray-600">{ride.pickup}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-emerald-500 text-xl" />
                  <div>
                    <div className="font-bold text-gray-800">Dropoff</div>
                    <div className="text-gray-600">{ride.dropoff}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaClock className="text-emerald-500 text-xl" />
                <div>
                  <div className="font-bold text-gray-800">Date & Time</div>
                  <div className="text-gray-600">
                    {new Date(ride.createdAt).toLocaleDateString()} at{" "}
                    {new Date(ride.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Fare Breakdown */}
          <div className="mb-6">
            <div className="font-semibold text-lg text-emerald-600 mb-3">
              Fare Breakdown
            </div>
            <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between text-gray-700">
                <span>Base fare:</span>
                <span>{baseFare.toLocaleString()} VND</span>
              </div>
              {Array.isArray(ride.additionalFees) &&
                ride.additionalFees.length > 0 &&
                ride.additionalFees.map((fee, idx) => (
                  <div className="flex justify-between text-gray-700" key={idx}>
                    <span>{fee.label || "Additional fee"}:</span>
                    <span>{(fee.amount || 0).toLocaleString()} VND</span>
                  </div>
                ))}
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between font-bold text-emerald-600">
                <span>Total:</span>
                <span>{total.toLocaleString()} VND</span>
              </div>
            </div>
          </div>
          {/* Payment Method */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              {ride.paymentMethod === "cash" ? (
                <FaMoneyBillWave className="text-emerald-500" />
              ) : (
                <FaCreditCard className="text-emerald-500" />
              )}
              <span className="font-semibold text-gray-700">
                Payment Method:
              </span>
              <span className="text-gray-600 capitalize">
                {ride.paymentMethod}
              </span>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="mt-6 text-xs text-gray-400 text-center">
          Powered By SmartRide. By proceeding with payment you agree to our
          Terms & Conditions and Privacy Policy.
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
