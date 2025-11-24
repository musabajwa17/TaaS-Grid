export default function JobCard({ job, selected, setSelected }) {
  const active = selected?._id === job._id;

  return (
    <div
      onClick={() => setSelected(job)}
      className={`p-5 rounded-2xl border cursor-pointer ${
        active ? "border-green-500 shadow-lg" : "border-gray-200"
      }`}
    >
      <h3 className="font-bold">{job.title}</h3>
      <p className="text-sm text-gray-500">{job.location}</p>
    </div>
  );
}
