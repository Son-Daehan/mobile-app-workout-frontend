import React from "react";
import { useSelector } from "react-redux";

const axiosInstanceSetting = () => {
  const auth = useSelector((state) => state.auth);
  const baseURL = "http://192.168.127.135:8000/api";

  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: baseURL,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      const token = auth.accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Attach token to Authorization header
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default axiosInstanceSetting;
