import { PATHS } from "@/routes/constants/paths";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle global errors here
    if (error.response?.data?.detail) {
      const detail = error.response.data.detail;

      if (Array.isArray(detail)) {
        error.message = detail
          .map((d: any) => d.msg || JSON.stringify(d))
          .join(", ");
      } else if (typeof detail === "string") {
        error.message = detail;
      }
    }

    if (
      error.response?.status === 401 &&
      !error.config?.url?.includes("/auth/sign-in")
    ) {
      sessionStorage.clear();
      localStorage.clear();
      window.location.href = PATHS.AUTH.SIGN_IN;
    }
    return Promise.reject(error);
  },
);

export default api;
