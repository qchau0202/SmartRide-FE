import { useState } from "react";
import { Input, DatePicker, TimePicker, Button } from "antd";
import { FaCalendarAlt, FaClock, FaExchangeAlt } from "react-icons/fa";
import dayjs from "dayjs";

const SelectDestination = () => {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const handleSwitch = () => {
    setPickup(dropoff);
    setDropoff(pickup);
  };

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
            <Input
              id="pickup"
              placeholder="Enter your pickup location"
              size="large"
              className="font-medium"
              aria-label="Pickup location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
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
            <Input
              id="dropoff"
              placeholder="Enter your dropoff location"
              size="large"
              className="font-medium"
              aria-label="Dropoff location"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
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
            defaultValue={dayjs()}
            style={{ width: "100%" }}
            aria-label="Pickup date"
          />
          <TimePicker
            size="large"
            className="w-1/2"
            suffixIcon={<FaClock className="text-emerald-500" />}
            defaultValue={dayjs()}
            style={{ width: "100%" }}
            aria-label="Pickup time"
          />
        </div>
        <span className="text-xs text-gray-400 mt-1 block">
          Choose your preferred date and time for pickup
        </span>
      </div>
      {/* Action */}
      <div className="flex items-center space-x-4">
        <Button
          type="primary"
          size="large"
          className="font-bold px-8"
          style={{ borderRadius: 12 }}
        >
          See prices
        </Button>
        <span className="text-gray-500 text-sm border-b border-gray-300 pb-1 cursor-pointer hover:text-emerald-500 transition-colors">
          Book a ride instantly!
        </span>
      </div>
    </div>
  );
};

export default SelectDestination;
