import { Modal, Form, Input, Button, Select, InputNumber } from "antd";
import { becomeDriver } from "../../services/api";
import { toast } from "react-hot-toast";
const carTypes = [
  { value: "sedan", label: "Sedan" },
  { value: "suv", label: "SUV" },
  { value: "van", label: "Van" },
];

const DriverForm = ({ open, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const handleFinish = async (values) => {
    try {
      await becomeDriver(values);
      toast.success("You are now a driver!");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to become driver");
    }
  };
  return (
    <Modal
      title="Become a Driver"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ seats: 4, type: "sedan" }}
      >
        <Form.Item
          label="Car Model"
          name="model"
          rules={[{ required: true, message: "Please enter your car model" }]}
        >
          <Input placeholder="e.g. Toyota Vios" />
        </Form.Item>
        <Form.Item
          label="Color"
          name="color"
          rules={[{ required: true, message: "Please enter your car color" }]}
        >
          <Input placeholder="e.g. White" />
        </Form.Item>
        <Form.Item
          label="License Plate"
          name="licensePlate"
          rules={[
            { required: true, message: "Please enter your license plate" },
          ]}
        >
          <Input placeholder="e.g. 51A-123.45" />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: "Please select car type" }]}
        >
          <Select options={carTypes} />
        </Form.Item>
        <Form.Item
          label="Seats"
          name="seats"
          rules={[{ required: true, message: "Please enter number of seats" }]}
        >
          <InputNumber min={2} max={7} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Become a Driver
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DriverForm;
