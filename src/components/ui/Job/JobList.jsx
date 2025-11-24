import JobCard from "./JobCard";

export default function JobList({ jobs, selected, setSelected }) {
  if (!jobs.length)
    return <div className="p-10 text-center text-gray-500">No active opportunities found</div>;

  return (
    <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2">
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
    </div>
  );
}
