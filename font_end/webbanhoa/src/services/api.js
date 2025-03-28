import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080"; // Mặc định nếu không có biến môi trường

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
