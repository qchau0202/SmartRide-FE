import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserRides } from "../../services/api";
import { Card, List, Typography, Button, Tag, Spin } from "antd";
import {
  ClockCircleOutlined,
  EnvironmentOutlined,
  DollarOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const statusColors = {
  pending: "orange",
  accepted: "green",
  rejected: "red",
};

const paymentLabels = {
  cash: "Cash",
  card: "Card",
  banking: "Banking",
};

const BookingHistory = () => {
  const navigate = useNavigate();
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRides = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getUserRides();
        setRides(res.data.rides);
      } catch (err) {
        setError("Failed to load ride history");
        console.error("Error fetching rides:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <div className="text-gray-500 text-center">{error}</div>
        <Button type="primary" onClick={() => navigate("/booking")}>
          Back to Booking
        </Button>
      </div>
    );
  }

  if (rides.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <div className="text-gray-500 text-center">No ride history found</div>
        <Button type="primary" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Booking History</Title>
        <Button type="primary" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
      <List
        className="flex-1 overflow-auto"
        dataSource={rides}
        renderItem={(ride) => (
          <List.Item>
            <Card
              className="w-full cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/booking/booking-history/${ride._id}`)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <EnvironmentOutlined className="text-emerald-600" />
                    <Text strong className="text-emerald-600">
                      {ride.pickup} → {ride.dropoff}
                    </Text>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <ClockCircleOutlined className="text-gray-500" />
                    <Text type="secondary">{ride.datetime}</Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarOutlined className="text-gray-500" />
                    <Text type="secondary">
                      {ride.fare?.toLocaleString()} VND -{" "}
                      {paymentLabels[ride.paymentMethod] || ride.paymentMethod}
                    </Text>
                  </div>
                </div>
                <Tag
                  color={statusColors[ride.status] || "default"}
                  className="text-base font-semibold rounded-full px-4 py-1"
                >
                  {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
                </Tag>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default BookingHistory;
