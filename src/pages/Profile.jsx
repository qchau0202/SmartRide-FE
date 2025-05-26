import { useState } from "react";
import { Button, Input } from "antd";
import {
  FaEnvelope,
  FaPhone,
  FaIdBadge,
  FaUser,
  FaArrowLeft,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const initialUser = {
  name: "John Doe",
  avatar: "https://avatar.iran.liara.run/public/13",
  email: "john.doe@email.com",
  phone: "+84 901 234 567",
  role: "Customer",
};

const Profile = () => {
  const [user, setUser] = useState(initialUser);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(user);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setForm(user);
    setEditMode(false);
  };

  const handleSave = () => {
    setUser(form);
    setEditMode(false);
  };

  return (
    <div className="h-full flex justify-center items-center ">
      <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-10 w-full max-w-md">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-28 h-28 rounded-full border-4 border-emerald-500 object-cover mb-4 shadow"
        />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{user.name}</h1>
        <div className="w-full space-y-4">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
              <FaUser className="mr-2 text-emerald-400" /> Name
            </label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={!editMode}
              className="rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
              <FaIdBadge className="mr-2 text-emerald-400" /> Role
            </label>
            <Input
              name="role"
              value={form.role}
              onChange={handleChange}
              disabled={!editMode}
              className="rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
              <FaEnvelope className="mr-2 text-emerald-400" /> Email
            </label>
            <Input
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={!editMode}
              className="rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
              <FaPhone className="mr-2 text-emerald-400" /> Phone
            </label>
            <Input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              disabled={!editMode}
              className="rounded-lg"
            />
          </div>
        </div>
        <div className="flex space-x-4 mt-8">
          {!editMode ? (
            <Button
              type="primary"
              size="large"
              className="font-bold px-8"
              style={{ borderRadius: 12 }}
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          ) : (
            <>
              <Button
                type="primary"
                size="large"
                className="font-bold px-8"
                style={{ borderRadius: 12 }}
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                size="large"
                danger
                className="font-bold px-8"
                style={{ borderRadius: 12 }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
