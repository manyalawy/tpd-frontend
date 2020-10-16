import axios from "axios";
import { authHeader } from "./";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
  timeout: 60000,
  headers: {
    common: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...authHeader(),
    },
  },
});

axiosInstance.interceptors.response.use((response) => {
  return response.data;
});

export default axiosInstance;
