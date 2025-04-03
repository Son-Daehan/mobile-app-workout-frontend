import axios from "axios";

const baseURL = "http://192.168.127.135:8000/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export const setAuthorizationHeader = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

export default axiosInstance;
