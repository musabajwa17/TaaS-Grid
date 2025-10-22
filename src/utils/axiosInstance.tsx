import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  withCredentials: true, // 🔥 allows cookies to be sent/received
});

export default api;
