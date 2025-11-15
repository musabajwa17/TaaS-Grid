import axios from "axios";

export const authService = {
  signup: (payload) =>
    axios.post("/api/company/register", payload).then((res) => res.data),

  login: (email, password) =>
    axios.post("/api/company/login", { email, password }).then((res) => res.data),

  logout: () =>
    axios.post("/api/company/logout").then((res) => res.data),
};
