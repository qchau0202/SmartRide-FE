import { useSearchParams, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import BookingPending from "../components/booking/BookingPending";
import BookingFound from "../components/booking/BookingFound";
import BookingArrived from "../components/booking/BookingArrived";
import BookingCompleted from "../components/booking/BookingCompleted";
import BookingCanceled from "../components/booking/BookingCanceled";
import BookingHistory from "../components/booking/BookingHistory";
import RideDetails from "../components/booking/RideDetails";
import { getRideById } from "../services/api";

const Content = () => {
  const [searchParams] = useSearchParams();
  const match = useMatch("/booking/booking-history/:rideId");
  const historyMatch = useMatch("/booking/booking-history");
  const status = searchParams.get("status") || "driver-pending";
  const rideId = searchParams.get("rideId");
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!rideId) return;
    setLoading(true);
    setError(null);
    getRideById(rideId)
      .then((res) => setRide(res.data.ride))
      .catch((err) => setError(err.message || "Failed to load ride"))
      .finally(() => setLoading(false));
  }, [rideId]);

  // Handle booking history routes
  if (match) {
    return <RideDetails />;
  }
  if (historyMatch || status === "history") {
    return <BookingHistory />;
  }

  if (loading && rideId) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }
  if (error && rideId) {
    return (
      <div className="h-full flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  // Customer perspective status flow
  if (status === "driver-pending") {
    return <BookingPending onCancel={() => {}} ride={ride} />;
  } else if (status === "accepted") {
    return (
      <BookingFound driver={ride?.driver} ride={ride} onContact={() => {}} />
    );
  } else if (status === "onGoing") {
    return <BookingArrived driver={ride?.driver} ride={ride} />;
  } else if (status === "completed") {
    return <BookingCompleted driver={ride?.driver} ride={ride} />;
  } else if (status === "canceled") {
    return <BookingCanceled />;
  }
  return <BookingPending onCancel={() => {}} ride={ride} />;
};

const Booking = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <Content />
      </div>
    </div>
  );
};

export default Booking;
