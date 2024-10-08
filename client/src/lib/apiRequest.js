import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://real-estateapp-2333.onrender.com/api",
  withCredentials: true,
});

export default apiRequest;