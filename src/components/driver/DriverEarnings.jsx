import { useEffect, useState } from "react";
import { Card, Statistic, Spin } from "antd";
import { DollarOutlined, CarOutlined } from "@ant-design/icons";
import { getCurrentUser } from "../../services/api";

const DriverEarnings = () => {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        setDriver(res.data.roleData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spin size="large" />
      </div>
    );
  }

  if (!driver) {
    return (
      <Card
        className="shadow-md rounded-xl text-center"
        style={{ background: "#fff" }}
      >
        <img
          src="https://www.svgrepo.com/show/327408/empty-box.svg"
          alt="No data"
          className="w-24 h-24 mx-auto opacity-60 mb-4"
        />
        <div className="text-gray-500 font-semibold mb-2">No earnings data</div>
        <div className="text-gray-400">
          You have not completed any rides yet.
        </div>
      </Card>
    );
  }

  return (
    <Card
      title={
        <span className="text-emerald-500 font-bold">Earnings Summary</span>
      }
      variant={false}
      className="shadow-md rounded-xl"
    >
      <Statistic
        title="Total Earnings"
        value={driver?.earnings?.total || 0}
        prefix={<DollarOutlined />}
        valueStyle={{ color: "#10b981", fontWeight: 700, fontSize: 28 }}
        suffix="VND"
      />
      <div className="mt-6 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <CarOutlined className="text-emerald-500" />
          <span className="font-semibold text-gray-700">Total Rides:</span>
          <span className="text-gray-900 font-bold">
            {driver?.totalRides || 0}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default DriverEarnings;
