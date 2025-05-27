import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, Spin } from "antd";
import { FaCreditCard, FaUniversity } from "react-icons/fa";
import { getRideById, createPayment } from "../../services/api";
import { toast } from "react-hot-toast";

const { Option } = Select;

const PaymentForm = ({ ride, setRide }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const rideId = searchParams.get("rideId");

  useEffect(() => {
    if (!rideId) return;
    setFetching(true);
    getRideById(rideId)
      .then((res) => setRide(res.data.ride))
      .catch(() => setRide(null))
      .finally(() => setFetching(false));
  }, [rideId, setRide]);

  const paymentMethod = ride?.paymentMethod || "card";

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const baseData = {
        booking: rideId,
        amount: ride.fare,
        paymentMethod,
      };
      let paymentData = { ...baseData };
      if (paymentMethod === "card") {
        paymentData = {
          ...paymentData,
          cardNumber: values.cardNumber,
          expiry: values.expiry,
          cvv: values.cvv,
          cardHolder: values.cardHolder,
        };
      } else {
        paymentData = {
          ...paymentData,
          bank: values.bank,
          accountNumber: values.accountNumber,
          accountName: values.accountName,
          transferAmount: values.transferAmount,
        };
      }
      await createPayment(paymentData);
      setRide({ ...ride, payment: true });
      toast.success("Payment successful!");
      navigate("/");
    } catch {
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="h-full flex items-center p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="mb-6">
          <div className="text-xl text-emerald-500 font-semibold mb-2">
            {paymentMethod === "card" ? "Card Payment" : "Bank Transfer"}
          </div>
          <p className="text-gray-500">
            Please enter your {paymentMethod === "card" ? "card" : "bank"}{" "}
            details to complete the payment
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-4"
        >
          {paymentMethod === "card" ? (
            <>
              <Form.Item
                name="cardNumber"
                label="Card Number"
                rules={[
                  { required: true, message: "Please enter card number" },
                  {
                    pattern: /^[\d\s]{19}$/,
                    message: "Invalid card number format",
                  },
                ]}
              >
                <Input
                  prefix={<FaCreditCard className="text-gray-400" />}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    const formatted = value.replace(/(\d{4})/g, "$1 ").trim();
                    form.setFieldsValue({ cardNumber: formatted });
                  }}
                />
              </Form.Item>

              <div className="grid grid-cols-2 gap-4">
                <Form.Item
                  name="expiry"
                  label="Expiry Date"
                  rules={[
                    { required: true, message: "Please enter expiry date" },
                    {
                      pattern: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                      message: "Invalid expiry date format",
                    },
                  ]}
                >
                  <Input
                    placeholder="MM/YY"
                    maxLength={5}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length >= 2) {
                        const formatted = `${value.slice(0, 2)}/${value.slice(
                          2,
                          4
                        )}`;
                        form.setFieldsValue({ expiry: formatted });
                      }
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="cvv"
                  label="CVV"
                  rules={[
                    { required: true, message: "Please enter CVV" },
                    { pattern: /^\d{3}$/, message: "CVV must be 3 digits" },
                  ]}
                >
                  <Input placeholder="123" maxLength={3} type="password" />
                </Form.Item>
              </div>

              <Form.Item
                name="cardHolder"
                label="Card Holder Name"
                rules={[
                  { required: true, message: "Please enter card holder name" },
                  { min: 3, message: "Name must be at least 3 characters" },
                ]}
              >
                <Input placeholder="John Doe" />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item
                name="bank"
                label="Select Bank"
                rules={[{ required: true, message: "Please select a bank" }]}
              >
                <Select
                  placeholder="Select your bank"
                  prefix={<FaUniversity className="text-gray-400" />}
                >
                  <Option value="vietcombank">Vietcombank</Option>
                  <Option value="techcombank">Techcombank</Option>
                  <Option value="acb">ACB Bank</Option>
                  <Option value="mbbank">MBBank</Option>
                  <Option value="sacombank">Sacombank</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="accountNumber"
                label="Account Number"
                rules={[
                  { required: true, message: "Please enter account number" },
                  {
                    pattern: /^\d{10,16}$/,
                    message: "Account number must be 10-16 digits",
                  },
                ]}
              >
                <Input
                  prefix={<FaUniversity className="text-gray-400" />}
                  placeholder="Enter your account number"
                />
              </Form.Item>

              <Form.Item
                name="accountName"
                label="Account Holder Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter account holder name",
                  },
                  { min: 3, message: "Name must be at least 3 characters" },
                ]}
              >
                <Input placeholder="Enter account holder name" />
              </Form.Item>

              <Form.Item
                name="transferAmount"
                label="Transfer Amount"
                rules={[
                  { required: true, message: "Please enter transfer amount" },
                  { pattern: /^\d+$/, message: "Amount must be a number" },
                ]}
              >
                <Input
                  prefix="VND"
                  placeholder="Enter amount to transfer"
                  type="number"
                />
              </Form.Item>
            </>
          )}

          <Form.Item className="mt-8">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full h-12 text-base font-semibold"
              style={{
                backgroundColor: "#10b981",
                borderColor: "#10b981",
                borderRadius: "8px",
              }}
            >
              {paymentMethod === "card" ? "Pay Now" : "Confirm Transfer"}
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-6 text-xs text-gray-400 text-center">
          Your payment information is secure and encrypted
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
