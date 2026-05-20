import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/";


const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",

  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error("API Error:", error.response.status, error.response.data);
        }
        return Promise.reject(error);
    }
);

export default apiClient;