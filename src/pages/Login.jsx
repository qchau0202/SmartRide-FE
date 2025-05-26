import { Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";

const Login = () => {
  const onFinish = (values) => {
    // Handle login logic here
    console.log("Login values:", values);
  };

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="col-span-1 bg-emerald-500 flex justify-center items-center border-r border-gray-300">
        <div className="w-2/3">
          <img
            src="/bg_login.png"
            alt="login"
            className="w-full h-full object-cover"
          />
          <div>
            <h1 className="text-4xl font-bold text-center text-white">
              Welcome to SmartRide!
            </h1>
            <p className="text-center text-white">
              SmartRide is a platform for booking rides and managing your rides.
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-[450px]">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-center text-emerald-500">
              Login
            </h1>
          </div>

          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            className="space-y-6"
            requiredMark={false}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                size="large"
                className="rounded-md"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                placeholder="Enter your password"
                size="large"
                className="rounded-md"
              />
            </Form.Item>

            <div className="flex items-center justify-between mb-2">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox className="text-gray-700">Remember me</Checkbox>
              </Form.Item>
              <Link
                to="/forgot-password"
                className="text-sm text-emerald-500 hover:text-emerald-600"
              >
                Forgot password?
              </Link>
            </div>

            <Form.Item className="mb-0">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="w-full bg-emerald-500 hover:bg-emerald-600 font-semibold rounded-md"
                style={{ borderRadius: 8 }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-emerald-500 hover:text-emerald-600 font-medium"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
