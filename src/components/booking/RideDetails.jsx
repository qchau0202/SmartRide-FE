import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, Button, Spin, Tag } from "antd";
import { getRideById } from "../../services/api";

const { Title, Text } = Typography;

const RideDetails = () => {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRide = async () => {
      if (!rideId) {
        setError("No ride ID provided");
        setLoading(false);
        return;
      }

      try {
        const response = await getRideById(rideId);
        setRide(response.data.ride);
        console.log(response.data.ride);
      } catch (err) {
        setError("Failed to load ride details");
        console.error("Error fetching ride:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRide();
  }, [rideId]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error || !ride) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <div className="text-gray-500 text-center">
          {error || "Ride not found"}
        </div>
        <Button
          type="primary"
          onClick={() => navigate("/booking/booking-history")}
        >
          Back to History
        </Button>
      </div>
    );
  }

  // Format date/time
  const formattedDateTime = ride.datetime
    ? new Date(ride.datetime).toLocaleString()
    : "-";

  // Helper: get status page path
  const getStatusPath = () => {
    const id = ride._id;
    switch (ride.status) {
      case "pending":
        return `/booking?status=driver-pending&rideId=${id}`;
      case "accepted":
        return `/booking?status=accepted&rideId=${id}`;
      case "onGoing":
        return `/booking?status=onGoing&rideId=${id}`;
      case "completed":
        return `/booking?status=completed&rideId=${id}`;
      case "rejected":
      case "canceled":
        return `/booking?status=canceled&rideId=${id}`;
      default:
        return "/booking";
    }
  };

  return (
    <div className="h-full flex flex-col items-center p-4">
      <div className="w-1/3">
        <div className="flex justify-between items-center mb-4">
          <Title level={4}>Ride Details</Title>
          <div className="flex gap-2">
            <Button
              type="primary"
              onClick={() => navigate("/booking/booking-history")}
            >
              Back to History
            </Button>
            <Button
              type="primary"
              className="bg-emerald-500 border-emerald-500 font-bold"
              style={{ borderRadius: 12 }}
              onClick={() => navigate(getStatusPath())}
            >
              Go to Current Status
            </Button>
          </div>
        </div>
        <Card className="flex-1">
          <div className="space-y-4">
            <div>
              <Text type="secondary">Pickup Location</Text>
              <div className="font-medium">{ride.pickup}</div>
            </div>
            <div>
              <Text type="secondary">Dropoff Location</Text>
              <div className="font-medium">{ride.dropoff}</div>
            </div>
            <div>
              <Text type="secondary">Date & Time</Text>
              <div className="font-medium">{formattedDateTime}</div>
            </div>
            <div>
              <Text type="secondary">Fare</Text>
              <div className="font-medium">
                {ride.fare?.toLocaleString()} VND
              </div>
            </div>
            <div>
              <Text type="secondary">Payment Method</Text>
              <div className="font-medium">{ride.paymentMethod}</div>
            </div>
            <div>
              <Text type="secondary">Status</Text>
              <div>
                <Tag
                  color={
                    ride.status === "completed"
                      ? "green"
                      : ride.status === "cancelled"
                      ? "red"
                      : "blue"
                  }
                >
                  {ride.status}
                </Tag>
              </div>
            </div>
            {/* Customer Info */}
            {ride.customer && ride.customer.user && (
              <div>
                <Text type="secondary">Customer</Text>
                <div className="flex items-center gap-2 mt-1">
                  <img
                    src={ride.customer.user.avatar}
                    alt={ride.customer.user.name}
                    className="w-8 h-8 rounded-full border border-emerald-400 object-cover"
                  />
                  <span className="font-medium">{ride.customer.user.name}</span>
                  <span className="text-gray-500 text-xs">
                    {ride.customer.user.email}
                  </span>
                </div>
              </div>
            )}
            {/* Driver Info */}
            <div className="w-full">
              <Text type="secondary">Driver</Text>
              {ride.driver && ride.driver.user ? (
                <div className="flex items-center gap-4 mt-2 bg-gray-50 rounded-xl p-4 shadow w-full">
                  <img
                    src={ride.driver.user.avatar}
                    alt={ride.driver.user.name}
                    className="w-14 h-14 rounded-full border-2 border-emerald-500 object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-lg font-semibold text-gray-800">
                      {ride.driver.user.name}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {ride.driver.user.email}
                    </span>
                    {ride.driver.phone && (
                      <span className="text-gray-500 text-sm">
                        Phone: {ride.driver.phone}
                      </span>
                    )}
                    {/* Car details */}
                    {ride.driver.car && (
                      <div className="mt-2 text-sm text-gray-700">
                        <div>
                          <span className="font-semibold">Car Model:</span>{" "}
                          {ride.driver.car.model}
                        </div>
                        <div>
                          <span className="font-semibold">Color:</span>{" "}
                          {ride.driver.car.color}
                        </div>
                        <div>
                          <span className="font-semibold">License Plate:</span>{" "}
                          {ride.driver.car.licensePlate}
                        </div>
                        <div>
                          <span className="font-semibold">Type:</span>{" "}
                          {ride.driver.car.type}
                        </div>
                        <div>
                          <span className="font-semibold">Seats:</span>{" "}
                          {ride.driver.car.seats}
                        </div>
                      </div>
                    )}
                    {ride.driver.license && (
                      <span className="text-gray-500 text-sm">
                        License: {ride.driver.license}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-gray-400 italic mt-2">
                  No driver assigned yet.
                </div>
              )}
            </div>
            {/* Payment Info */}
            {ride.payment && (
              <div>
                <Text type="secondary">Payment</Text>
                <div className="font-medium">{ride.payment.status}</div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RideDetails;
