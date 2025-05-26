import { useState } from "react";
import {
  Table,
  Avatar,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  message,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { demoCustomers as initialCustomers } from "../../mock-data/demoCustomers";

const CustomerInfo = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  const handleAdd = () => {
    setEditing(null);
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditing(record);
    form.setFieldsValue(record);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    message.success("Customer deleted");
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      if (editing) {
        setCustomers((prev) =>
          prev.map((c) => (c.id === editing.id ? { ...c, ...values } : c))
        );
        message.success("Customer updated");
      } else {
        setCustomers((prev) => [
          ...prev,
          {
            ...values,
            id: Date.now(),
            avatar: values.avatar || "https://avatar.iran.liara.run/public/4",
            createdAt: new Date().toISOString().slice(0, 10),
          },
        ]);
        message.success("Customer added");
      }
      setModalOpen(false);
    });
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => <Avatar src={avatar} size={36} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => <span className="font-semibold">{name}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            className="border-emerald-500 text-emerald-500"
            style={{ borderRadius: 8 }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete this customer?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              icon={<DeleteOutlined />}
              danger
              style={{ borderRadius: 8 }}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-emerald-600">Customers</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="bg-emerald-500 border-emerald-500 font-bold"
          style={{ borderRadius: 12 }}
          onClick={handleAdd}
        >
          Add Customer
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={customers.map((c) => ({ ...c, key: c.id }))}
        pagination={{ pageSize: 8 }}
        bordered
        className="bg-white rounded-xl shadow"
      />
      <Modal
        title={editing ? "Edit Customer" : "Add Customer"}
        open={modalOpen}
        onOk={handleModalOk}
        onCancel={() => setModalOpen(false)}
        okText={editing ? "Save" : "Add"}
        cancelText="Cancel"
        okButtonProps={{
          style: { backgroundColor: "#10b981", borderColor: "#10b981" },
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter the email" }]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter the phone number" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Avatar URL" name="avatar">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerInfo;
