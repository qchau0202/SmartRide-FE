import PaymentSummary from "../components/payment/PaymentSummary";

const Payment = () => {
  return (
    <div className="h-full grid grid-cols-2">
      <div className="col-span-1">
        <PaymentSummary />
      </div>
      <div className="col-span-1">
        {/* Steps and forms will go here */}
      </div>
    </div>
  );
};

export default Payment;
