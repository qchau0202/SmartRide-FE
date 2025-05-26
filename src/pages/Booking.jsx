import { useSearchParams } from "react-router-dom";
import DriverPending from "../components/booking/DriverPending";
import DriverFound from "../components/booking/DriverFound";
import DriverArrived from "../components/booking/DriverArrived";
import BookingCanceled from "../components/booking/BookingCanceled";

const Content = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || "driver-pending";

  // Demo handlers
  const handleCancel = () => {
    alert("Booking canceled!");
  };
  const handleContact = () => {
    alert("Contacting driver...");
  };
  const handleConfirm = () => {
    alert("Driver confirmed!");
  };

  if (status === "driver-found") {
    return <DriverFound onContact={handleContact} />;
  } else if (status === "driver-arrived") {
    return <DriverArrived onConfirm={handleConfirm} />;
  } else if (status === "canceled") {
    return <BookingCanceled />;
  }
  // Default: pending
  return <DriverPending onCancel={handleCancel} />;
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
