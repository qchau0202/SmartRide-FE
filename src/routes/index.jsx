import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Booking from "../pages/Booking";
import Profile from "../pages/Profile";
import AppLayout from "../layout/AppLayout";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../pages/Dashboard";
import Payment from "../pages/Payment";
import ProtectedRoute from "./ProtectedRoute";
import RideDetails from "../components/booking/RideDetails";
import BookingHistory from "../components/booking/BookingHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/booking/*",
        element: <Booking />,
        children: [
          {},
          {
            path: "booking-history/:rideId",
            element: <RideDetails />,
          },
          {
            path: "booking-history",
            element: <BookingHistory />,
          },
        ],
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
