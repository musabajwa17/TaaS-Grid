export default function JobDetails({ job }) {
  if (!job)
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-400">Select a job to view details</p>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-3">{job.title}</h1>
      <p className="text-gray-500 mb-3">{job.location}</p>
      <p className="text-gray-700">{job.description}</p>
    </div>
  );
}
