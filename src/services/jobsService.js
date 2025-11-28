import api from "../lib/api";

// const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

// if (!baseURL) {
//   console.error("❌ NEXT_PUBLIC_BASE_URL is missing! Check your .env file.");
// }

// const api = axios.create({ baseURL });

// ========== JOBS ==========
export const getJobs = async () => {
  try {
    const res = await api.get(`/api/jobs`);
    return res.data;
  } catch (err) {
    console.error("❌ Error fetching jobs:", err);
    return [];
  }
};

// ========== INTERNSHIPS ==========
export const getInternships = async () => {
  try {
    const res = await api.get(`/api/jobs/internships`);
    return res.data;
  } catch (err) {
    console.error("❌ Error fetching internships:", err);
    return [];
  }
};

// ========== FYPs ==========
export const getFyps = async () => {
  try {
    const res = await api.get(`/api/fyps`);
    return res.data;
  } catch (err) {
    console.error("❌ Error fetching FYPs:", err);
    return [];
  }
};

// ========== UPDATE JOB ==========
export const updateJobStatusRequest = async (id, status) => {
  try {
    const res = await api.put(`/api/jobs/${id}`, { status });
    return res.data;
  } catch (err) {
    console.error(`❌ Error updating job ${id}:`, err);
    throw err;
  }
};

// ========== DELETE JOB ==========
export const deleteJobRequest = async (id) => {
  try {
    const res = await api.delete(`/api/jobs/${id}`);
    return res.data;
  } catch (err) {
    console.error(`❌ Error deleting job ${id}:`, err);
    throw err;
  }
};

export default api;
