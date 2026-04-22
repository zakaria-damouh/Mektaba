import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: auto logout if unauthorized
    if (error.response?.status === 401) {
      console.log("Unauthorized - redirecting...");
      // you can redirect here if needed
    }

    return Promise.reject(error);
  }
);