import { Table, Tag, Avatar } from "antd";
import { demoBookings } from "../../mock-data/demoBookings";
import { demoCustomers } from "../../mock-data/demoCustomers";
import { demoDrivers } from "../../mock-data/demoDrivers";

const statusColors = {
  pending: "orange",
  accepted: "green",
  rejected: "red",
  completed: "blue",
  canceled: "volcano",
};

const getUser = (id, users) => users.find((u) => u.id === id) || {};

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 60,
    render: (id) => <span className="font-mono">{id}</span>,
  },
  {
    title: "Customer",
    dataIndex: "customerId",
    key: "customerId",
    render: (customerId) => {
      const c = getUser(customerId, demoCustomers);
      return (
        <div className="flex items-center gap-2">
          <Avatar src={c.avatar} size={32} />
          <span>{c.name}</span>
        </div>
      );
    },
  },
  {
    title: "Driver",
    dataIndex: "driverId",
    key: "driverId",
    render: (driverId) => {
      const d = getUser(driverId, demoDrivers);
      return d.name ? (
        <div className="flex items-center gap-2">
          <Avatar src={d.avatar} size={32} />
          <span>{d.name}</span>
        </div>
      ) : (
        <span className="text-gray-400">-</span>
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
    dataIndex: "date",
    key: "date",
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

const BookingInfo = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-emerald-600 mb-8">
        All Bookings
      </h1>
      <Table
        columns={columns}
        dataSource={demoBookings.map((b) => ({ ...b, key: b.id }))}
        pagination={{ pageSize: 8 }}
        bordered
        className="bg-white rounded-xl shadow"
      />
    </div>
  );
};

export default BookingInfo;
