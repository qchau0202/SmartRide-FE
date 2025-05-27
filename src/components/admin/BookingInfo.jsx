import { useEffect, useState } from "react";
import { Table, Tag, Avatar, Spin, message } from "antd";
import { getRides } from "../../services/api";

const statusColors = {
  pending: "orange",
  accepted: "green",
  rejected: "red",
  completed: "blue",
  canceled: "volcano",
};

const BookingInfo = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRides()
      .then((res) => {
        setBookings(res.data.rides);
        console.log(res.data.rides);
      })
      .catch(() => message.error("Failed to fetch bookings"))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: 60,
      render: (id) => <span className="font-mono">{id}</span>,
    },
    {
      title: "Customer",
      dataIndex: ["customer", "user"],
      key: "customer",
      render: (user) => {
        if (!user) return <span className="text-gray-400">-</span>;
        return (
          <div className="flex items-center gap-2">
            <Avatar src={user.avatar} size={32} />
            <span>{user.name}</span>
          </div>
        );
      },
    },
    {
      title: "Driver",
      dataIndex: ["driver", "user"],
      key: "driver",
      render: (user) => {
        if (!user) return <span className="text-gray-400">-</span>;
        return (
          <div className="flex items-center gap-2">
            <Avatar src={user.avatar} size={32} />
            <span>{user.name}</span>
          </div>
        );
      },
    },
    {
      title: "Pickup",
      dataIndex: "pickup",
      key: "pickup",
    },
    {
      title: "Dropoff",
      dataIndex: "dropoff",
      key: "dropoff",
    },
    {
      title: "Date",
      dataIndex: "datetime",
      key: "date",
      render: (datetime) => datetime?.slice(0, 10),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={statusColors[status] || "default"}
          className="font-semibold text-base rounded-full px-4 py-1"
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-emerald-600 mb-8">All Bookings</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={bookings.map((b) => ({ ...b, key: b._id }))}
          pagination={{ pageSize: 8 }}
          bordered
          className="bg-white rounded-xl shadow"
        />
      )}
    </div>
  );
};

export default BookingInfo;
