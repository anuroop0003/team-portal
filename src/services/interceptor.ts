import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can inject auth tokens here in the future
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
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

    if (error.response?.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error);
  },
);

export default api;
