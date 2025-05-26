import BookingList from "./booking/BookingList";
import Map from "./Map";

const Driver = () => {
  return (
    <div className="grid grid-cols-3 h-full">
      <div className="col-span-2 flex flex-col items-center justify-center">
        <Map />
      </div>
      <div className="col-span-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-emerald-500 mb-2 text-center">
            Driver Dashboard
          </h1>
          <p className="text-gray-500 text-center mb-8">
            Manage your ride requests and bookings below.
          </p>
          <BookingList />
        </div>
      </div>
    </div>
  );
};

export default Driver;
