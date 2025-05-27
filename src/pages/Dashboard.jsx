import { useSearchParams } from "react-router-dom";
import {
  FaUsers,
  FaCarSide,
  FaClipboardList,
  FaCalendarDay,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { getAllCustomers, getAllDrivers, getRides } from "../services/api";
import CustomerInfo from "../components/admin/CustomerInfo";
import DriverInfo from "../components/admin/DriverInfo";
import BookingInfo from "../components/admin/BookingInfo";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view") || "overview";
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalDrivers: 0,
    totalBookings: 0,
    bookingsToday: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [customersRes, driversRes, bookingsRes] = await Promise.all([
          getAllCustomers(),
          getAllDrivers(),
          getRides(),
        ]);

        const today = new Date().toISOString().slice(0, 10);
        const bookingsToday = bookingsRes.data.rides.filter(
          (b) => b.datetime?.slice(0, 10) === today
        ).length;

        setStats({
          totalCustomers: customersRes.data.customers.length,
          totalDrivers: driversRes.data.drivers.length,
          totalBookings: bookingsRes.data.rides.length,
          bookingsToday,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (view === "overview") {
      fetchStats();
    }
  }, [view]);

  if (view === "customer") {
    return <CustomerInfo />;
  }
  if (view === "driver") {
    return <DriverInfo />;
  }
  if (view === "booking") {
    return <BookingInfo />;
  }

  // Bento box overview
  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-emerald-600 mb-8">
        Admin Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
          <FaUsers className="text-4xl text-emerald-500 mb-2" />
          <div className="text-3xl font-bold text-gray-900">
            {loading ? "-" : stats.totalCustomers}
          </div>
          <div className="text-gray-500 font-medium">Customers</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
          <FaCarSide className="text-4xl text-emerald-500 mb-2" />
          <div className="text-3xl font-bold text-gray-900">
            {loading ? "-" : stats.totalDrivers}
          </div>
          <div className="text-gray-500 font-medium">Drivers</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
          <FaClipboardList className="text-4xl text-emerald-500 mb-2" />
          <div className="text-3xl font-bold text-gray-900">
            {loading ? "-" : stats.totalBookings}
          </div>
          <div className="text-gray-500 font-medium">Total Bookings</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
          <FaCalendarDay className="text-4xl text-emerald-500 mb-2" />
          <div className="text-3xl font-bold text-gray-900">
            {loading ? "-" : stats.bookingsToday}
          </div>
          <div className="text-gray-500 font-medium">Bookings Today</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
