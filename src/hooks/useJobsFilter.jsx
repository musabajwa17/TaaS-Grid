// File: src/hooks/useJobFilters.js
import { useMemo } from "react";
export default function useJobFilters(
  jobs,
  titleFilter,
  locationFilter,
  jobTypeFilter
) {
  return useMemo(() => {
    const t = (titleFilter || "").toLowerCase();
    const l = (locationFilter || "").toLowerCase();
    const jt = jobTypeFilter || "";

    return jobs.filter((job) => {
      if (!job) return false;
      const matchesTitle = (job.title || "").toLowerCase().includes(t);
      const matchesLocation = (job.location || "").toLowerCase().includes(l);
      const matchesType = jt === "" || job.jobType === jt;
      return matchesTitle && matchesLocation && matchesType;
    });
  }, [jobs, titleFilter, locationFilter, jobTypeFilter]);
}
