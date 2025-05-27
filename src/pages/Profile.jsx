import { useState, useEffect } from "react";
import { Button, Input, Tag, Modal, Tabs, Upload } from "antd";
import { toast } from "react-hot-toast";
import {
  FaEnvelope,
  FaPhone,
  FaIdBadge,
  FaUser,
  FaArrowLeft,
  FaCamera,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getCurrentUser, updateProfile } from "../services/api";

const roleColors = {
  customer: "green",
  driver: "blue",
  admin: "red",
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({});
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [avatarTab, setAvatarTab] = useState("url");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data.user);
        setForm(res.data.user);
        setAvatarUrl(res.data.user.avatar || "");
      } catch {
        toast.error("Failed to load user info");
      }
    };
    fetchUser();
  }, []);

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

  const handleSave = async () => {
    try {
      const res = await updateProfile(form);
      setUser(res.data.user);
      setForm(res.data.user);
      setEditMode(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    }
  };

  // Avatar modal handlers
  const openAvatarModal = () => {
    setAvatarModalOpen(true);
    setAvatarTab("url");
    setAvatarUrl(form.avatar || "");
    setAvatarFile(null);
    setAvatarPreview("");
  };

  const handleAvatarTabChange = (key) => {
    setAvatarTab(key);
    setAvatarPreview("");
    setAvatarFile(null);
  };

  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
    setAvatarPreview(e.target.value);
  };

  const handleAvatarUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target.result);
      setAvatarFile(e.target.result);
    };
    reader.readAsDataURL(file);
    return false; // Prevent upload
  };

  const handleAvatarSave = async () => {
    let newAvatar = avatarTab === "url" ? avatarUrl : avatarFile;
    if (!newAvatar) {
      toast.error("Please provide an avatar image.");
      return;
    }
    // Save to localStorage if uploaded
    if (avatarTab === "upload") {
      localStorage.setItem("avatar", newAvatar);
    }
    try {
      await updateProfile({ avatar: newAvatar });
      setUser((prev) => ({ ...prev, avatar: newAvatar }));
      setForm((prev) => ({ ...prev, avatar: newAvatar }));
      setAvatarModalOpen(false);
      toast.success("Avatar updated!");
    } catch {
      toast.error("Failed to update avatar");
    }
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );

  return (
    <div className="h-full flex justify-center items-center ">
      <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-10 w-full max-w-md">
        <div className="relative mb-4">
          <img
            src={form.avatar}
            alt="User Avatar"
            className="w-28 h-28 rounded-full border-4 border-emerald-500 object-cover shadow cursor-pointer"
            onClick={openAvatarModal}
            style={{ objectFit: "cover" }}
          />
          <FaCamera className="absolute bottom-2 right-2 text-emerald-500 bg-white rounded-full p-1 text-xl border" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{user.name}</h1>
        <div className="mb-2">
          <Tag
            color={roleColors[user.role] || "default"}
            style={{ fontSize: 16, padding: "0 12px" }}
          >
            {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
          </Tag>
        </div>
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
              disabled
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
      <Modal
        title="Update Avatar"
        open={avatarModalOpen}
        onCancel={() => setAvatarModalOpen(false)}
        onOk={handleAvatarSave}
        okText="Save"
      >
        <Tabs
          activeKey={avatarTab}
          onChange={handleAvatarTabChange}
          items={[
            {
              key: "url",
              label: "Image URL",
              children: (
                <>
                  <Input
                    placeholder="Paste image URL here"
                    value={avatarUrl}
                    onChange={handleAvatarUrlChange}
                  />
                  {avatarPreview && (
                    <img
                      src={avatarPreview}
                      alt="Preview"
                      className="mt-4 w-24 h-24 object-cover rounded-full mx-auto"
                    />
                  )}
                </>
              ),
            },
            {
              key: "upload",
              label: "Upload",
              children: (
                <>
                  <Upload
                    beforeUpload={handleAvatarUpload}
                    showUploadList={false}
                    accept="image/*"
                  >
                    <Button type="primary">Select Image</Button>
                  </Upload>
                  {avatarPreview && (
                    <img
                      src={avatarPreview}
                      alt="Preview"
                      className="mt-4 w-24 h-24 object-cover rounded-full mx-auto"
                    />
                  )}
                </>
              ),
            },
          ]}
        />
      </Modal>
    </div>
  );
};

export default Profile;
