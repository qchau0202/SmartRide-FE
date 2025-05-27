import BookingList from "./booking/BookingList";
import DriverEarnings from "./driver/DriverEarnings";

const Driver = () => {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      <div className="p-6">
        <h1 className="text-3xl font-bold text-emerald-500 mb-1 text-center">
          Driver Dashboard
        </h1>
        <p className="text-gray-500 text-center">
          Manage your ride requests and bookings below.
        </p>
      </div>
      <div className="flex flex-1 gap-8 p-8">
        <div className="w-2/3">
          <BookingList />
        </div>
        <div className="w-1/3">
          <DriverEarnings />
        </div>
      </div>
    </div>
  );
};

export default Driver;
