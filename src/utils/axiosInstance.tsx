import axios, { type AxiosInstance, type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";

const api: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api",
	withCredentials: true, // allows cookies to be sent/received if needed
});

// Attach token if present
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
	try {
		const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
		if (token && config.headers) {
			// only set Authorization if headers object already exists on the request
			(config.headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
		}
	} catch {
		// ignore (SSR or storage access issues)
	}
	return config;
});

export default api;
