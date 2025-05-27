import { useState } from "react";
import { Select, DatePicker, TimePicker, Button, Space } from "antd";
import {
  FaCalendarAlt,
  FaClock,
  FaExchangeAlt,
  FaMoneyBillWave,
  FaCreditCard,
  FaUniversity,
} from "react-icons/fa";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { bookRide } from "../../services/api";
import { toast } from "react-hot-toast";
const locationPairs = [
  { pickup: "District 1", dropoff: "District 3" },
  { pickup: "District 8", dropoff: "Ton Duc Thang University" },
];

const SelectDestination = () => {
  const [pickup, setPickup] = useState(locationPairs[0].pickup);
  const [dropoff, setDropoff] = useState(locationPairs[0].dropoff);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [date, setDate] = useState(dayjs());
  const [time, setTime] = useState(dayjs());
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSwitch = () => {
    setPickup(dropoff);
    setDropoff(pickup);
  };

  const handleBookRide = async () => {
    if (!pickup || !dropoff || !date || !time || !paymentMethod) {
      toast.error("Please select all fields before booking.");
      return;
    }
    setLoading(true);
    try {
      const datetime = date
        .hour(time.hour())
        .minute(time.minute())
        .second(0)
        .toISOString();
      let fare = 0;
      if (
        (pickup === "District 1" && dropoff === "District 3") ||
        (pickup === "District 3" && dropoff === "District 1")
      ) {
        fare = 50000;
      } else if (
        (pickup === "District 8" && dropoff === "Ton Duc Thang University") ||
        (pickup === "Ton Duc Thang University" && dropoff === "District 8")
      ) {
        fare = 80000;
      } else {
        fare = 60000; // fallback
      }
      const data = { pickup, dropoff, datetime, paymentMethod, fare };
      console.log("Booking data sent to backend:", data);
      await bookRide(data);
      toast.success("Ride booked successfully!");
      navigate("/booking?status=driver-pending");
    } catch (err) {
      toast.error(err.message || "Failed to book ride");
    } finally {
      setLoading(false);
    }
  };

  const paymentOptions = [
    {
      value: "cash",
      label: "Cash",
      icon: <FaMoneyBillWave className="text-emerald-500" />,
    },
    {
      value: "card",
      label: "Card",
      icon: <FaCreditCard className="text-emerald-500" />,
    },
    {
      value: "banking",
      label: "Banking",
      icon: <FaUniversity className="text-emerald-500" />,
    },
  ];

  return (
    <div className="flex flex-col space-y-8 p-6 w-4/5">
      <h1 className="text-4xl font-extrabold text-gray-900 text-center leading-tight">
        Go anywhere with <span className="text-emerald-500">SmartRide</span>
      </h1>
      {/* Pickup & Dropoff */}
      <div className="flex flex-col gap-4">
        <div className="relative flex items-center">
          <div className="flex-1">
            <label
              htmlFor="pickup"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Pickup location
            </label>
            <Select
              id="pickup"
              value={pickup}
              onChange={setPickup}
              size="large"
              className="w-full"
              options={locationPairs.map((pair) => ({
                value: pair.pickup,
                label: pair.pickup,
              }))}
            />
          </div>
          <Button
            type="default"
            shape="circle"
            icon={<FaExchangeAlt className="text-emerald-500" />}
            onClick={handleSwitch}
            className="mx-2 mt-6 border-emerald-200 hover:border-emerald-500"
            aria-label="Switch pickup and dropoff"
          />
          <div className="flex-1">
            <label
              htmlFor="dropoff"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Dropoff location
            </label>
            <Select
              id="dropoff"
              value={dropoff}
              onChange={setDropoff}
              size="large"
              className="w-full"
              options={locationPairs.map((pair) => ({
                value: pair.dropoff,
                label: pair.dropoff,
              }))}
            />
          </div>
        </div>
      </div>
      {/* Date & Time */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          When
        </label>
        <div className="flex items-center gap-4">
          <DatePicker
            size="large"
            className="w-1/2"
            suffixIcon={<FaCalendarAlt className="text-emerald-500" />}
            value={date}
            onChange={setDate}
            style={{ width: "100%" }}
            aria-label="Pickup date"
          />
          <TimePicker
            size="large"
            className="w-1/2"
            suffixIcon={<FaClock className="text-emerald-500" />}
            value={time}
            onChange={setTime}
            style={{ width: "100%" }}
            aria-label="Pickup time"
          />
        </div>
        <span className="text-xs text-gray-400 mt-1 block">
          Choose your preferred date and time for pickup
        </span>
      </div>
      {/* Payment Method */}
      <div className="">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Payment Method
        </label>
        <Space.Compact style={{ display: "flex", width: "100%" }}>
          {paymentOptions.map((option) => (
            <Button
              key={option.value}
              type={paymentMethod === option.value ? "primary" : "default"}
              onClick={() => setPaymentMethod(option.value)}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderColor:
                  paymentMethod === option.value ? "#10b981" : undefined,
                color: paymentMethod === option.value ? "#10b981" : undefined,
                fontWeight: paymentMethod === option.value ? 600 : 400,
                background:
                  paymentMethod === option.value ? "#ECFDF5" : undefined,
              }}
            >
              <span style={{ marginRight: 8 }}>{option.icon}</span>
              <span>{option.label}</span>
            </Button>
          ))}
        </Space.Compact>
        <span className="text-xs text-gray-400 mt-1 block">
          Select your preferred payment method
        </span>
      </div>
      {/* Action */}
      <div className="flex items-center space-x-4">
        <Button
          type="primary"
          size="large"
          className="font-bold px-8"
          style={{ borderRadius: 12 }}
          loading={loading}
          onClick={handleBookRide}
        >
          Find a ride
        </Button>
      </div>
    </div>
  );
};

export default SelectDestination;
