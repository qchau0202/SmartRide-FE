import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMsg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "An error occurred, please try again.";
    console.error("API error:", errorMsg);
    return Promise.reject(new Error(errorMsg));
  }
);

// Auth APIs
export const login = (data) => api.post("/auth/login", data);
export const register = (data) => api.post("/auth/register", data);
export const getCurrentUser = () => api.get("/auth/current");
export const updateProfile = (data) => api.put("/auth/update", data);
export const becomeDriver = (data) => api.post("/auth/become-driver", data);
export const bookRide = (data) => api.post("/rides", data);
export const getRides = () => api.get("/rides");
export const acceptRide = (id) => api.patch(`/rides/${id}/accept`);
export const rejectRide = (id) => api.patch(`/rides/${id}/reject`);
export const getUserRides = () => api.get("/rides/history");
export const getRideById = (id) => api.get(`/rides/${id}`);
export const arriveRide = (id) => api.patch(`/rides/${id}/arrive`);
export const completeRide = (id) => api.patch(`/rides/${id}/complete`);

// Payment APIs
export const createPayment = (data) => api.post("/payments", data);
export const getPaymentById = (id) => api.get(`/payments/${id}`);
export const getPayments = () => api.get("/payments");
export const deletePayment = (id) => api.delete(`/payments/${id}`);

// Admin APIs
export const getAllCustomers = () => api.get("/customers");
export const getAllDrivers = () => api.get("/drivers");
