import axios from "axios";
import { getAccessToken } from "./accessTokenStore"; // simple getter to read current token

export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3001",
  withCredentials: true,
});

// attach access token dynamically on each request
authApi.interceptors.request.use((config) => {
  const token = getAccessToken(); // read from in-memory context; implement getter
  if (token) config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  return config;
});
