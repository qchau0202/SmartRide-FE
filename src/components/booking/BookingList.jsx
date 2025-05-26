import BookingCard from "./BookingCard";
import { demoBookings } from "../../mock-data/demoBookings";
const BookingList = () => {
  const handleAccept = (id) => {
    alert(`Accepted booking ${id}`);
  };
  const handleReject = (id) => {
    alert(`Rejected booking ${id}`);
  };
  return (
    <>
      <div className="w-full flex flex-col items-center ">
        <div className="w-full max-w-2xl h-[80vh] overflow-y-auto custom-scrollbar p-4">
          {demoBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onAccept={() => handleAccept(booking.id)}
              onReject={() => handleReject(booking.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BookingList;
