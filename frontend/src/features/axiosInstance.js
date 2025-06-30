import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://hrmsdashboard-2ga6.onrender.com",
  withCredentials: true,
});
