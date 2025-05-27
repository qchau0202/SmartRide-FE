import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PaymentSummary from "../components/payment/PaymentSummary";
import PaymentForm from "../components/payment/PaymentForm";
import PaymentSuccess from "../components/payment/PaymentSuccess";
import { getRideById } from "../services/api";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const rideId = searchParams.get("rideId");
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!rideId) return;
    setLoading(true);
    getRideById(rideId)
      .then((res) => setRide(res.data.ride))
      .catch(() => setRide(null))
      .finally(() => setLoading(false));
  }, [rideId]);

  if (!rideId) {
    return (
      <div className="h-full flex items-center justify-center text-red-500">
        Invalid ride ID
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">Loading...</div>
    );
  }

  if (ride && ride.payment) {
    return <PaymentSuccess />;
  }

  return (
    <div className="h-full grid grid-cols-2">
      <div className="col-span-1">
        <PaymentSummary />
      </div>
      <div className="col-span-1">
        <PaymentForm ride={ride} setRide={setRide} />
      </div>
    </div>
  );
};

export default Payment;
