import { useEffect, useState } from "react";
import BookingCard from "./BookingCard";
import { getRides, acceptRide, rejectRide } from "../../services/api";
import { Empty, Spin } from "antd";
import { toast } from "react-hot-toast";
const BookingList = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRides = async () => {
      setLoading(true);
      try {
        const res = await getRides();
        setRides(res.data.rides);
      } catch (err) {
        toast.error(err.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchRides();
  }, []);

  const handleAccept = async (id) => {
    try {
      const res = await acceptRide(id);
      setRides((prev) =>
        prev.map((ride) =>
          ride._id === id ? { ...ride, ...res.data.ride } : ride
        )
      );
      toast.success("Ride accepted");
    } catch (err) {
      toast.error(err.message || "Failed to accept ride");
    }
  };
  const handleReject = async (id) => {
    try {
      const res = await rejectRide(id);
      setRides((prev) =>
        prev.map((ride) =>
          ride._id === id ? { ...ride, ...res.data.ride } : ride
        )
      );
      toast.success("Ride rejected");
    } catch (err) {
      toast.error(err.message || "Failed to reject ride");
    }
  };

  if (loading) {
    return (
      <div className="h-[70vh] flex items-center justify-center bg-white rounded-xl shadow p-8">
        <Spin size="large" />
      </div>
    );
  }
  if (rides.length === 0) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center bg-white rounded-xl shadow p-8">
        <Empty description="No bookings found" />
      </div>
    );
  }

  return (
    <div className="h-[70vh] overflow-y-auto custom-scrollbar bg-white rounded-xl shadow p-8">
      {rides.map((ride) => (
        <BookingCard
          key={ride._id}
          booking={{
            ...ride,
            customer: ride.customer?.user || {},
            datetime: ride.datetime,
          }}
          onAccept={() => handleAccept(ride._id)}
          onReject={() => handleReject(ride._id)}
        />
      ))}
    </div>
  );
};

export default BookingList;
