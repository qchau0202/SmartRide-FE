import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "antd";
import { FaCheckCircle, FaReceipt, FaHome } from "react-icons/fa";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rideId = searchParams.get("rideId");

  useEffect(() => {
    // Auto navigate after 5 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-full flex justify-center items-center p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg border border-gray-100 text-center">
        <div>
          <FaCheckCircle className="text-emerald-500 mx-auto" size={80} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-500 mb-8">
            Thank you for your payment. Your ride has been confirmed.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            type="primary"
            icon={<FaReceipt />}
            size="large"
            className="w-full h-12 text-base font-semibold"
            style={{
              backgroundColor: "#10b981",
              borderColor: "#10b981",
              borderRadius: "8px",
            }}
            onClick={() => navigate(`/booking/booking-history/${rideId}`)}
          >
            View Receipt
          </Button>

          <Button
            type="default"
            icon={<FaHome />}
            size="large"
            className="w-full h-12 text-base font-semibold"
            style={{
              borderRadius: "8px",
            }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>

        <p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-sm text-gray-400"
        >
          You will be redirected to home page in 5 seconds...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
