// import axios from "axios";

// const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";

// const api = axios.create({
//   baseURL: API_URL,
//   withCredentials: true,
// });

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;   

//     if (
//       originalRequest.url.includes("/api/auth/refresh") ||
//       originalRequest.url.includes("/api/auth/logout")
//     ) {
//       return Promise.reject(error);
//     }

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         await api.post("/api/auth/refresh");
//         return api(originalRequest);
//       } catch (err) {
//         window.location.href = "/login";
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest.url.includes("/api/auth/refresh") ||
      originalRequest.url.includes("/api/auth/logout")
    ) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/api/auth/refresh");
        return api(originalRequest);
      } catch (err) {
        // DO NOT reload the page here
        // Instead, just reject the promise
        return Promise.reject({ ...err, status: 401 });
      }
    }

    return Promise.reject(error);
  }
);

export default api;
