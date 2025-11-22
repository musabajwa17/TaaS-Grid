export default function normalizeJob(raw, category) {
return {
_id: raw._id,
title: raw.title || raw.name || "Untitled",
description: raw.description || "",
location: raw.location || "",
salary: raw.salary || "Not specified",
jobType: raw.jobType || raw.type || category || "Unknown",
category,
postedBy: raw.postedBy || null,
createdAt: raw.createdAt || new Date().toISOString(),
status: raw.status || "Pending",
};
}