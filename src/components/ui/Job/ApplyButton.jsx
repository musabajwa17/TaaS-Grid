export default function ApplyButton({
  user,
  selectedJob,
  applied,
  resume,
  onApply,
}) {
  const already = applied.includes(selectedJob?._id);

  return (
    <button
      onClick={onApply}
      disabled={!user || already}
      className={`w-full mt-5 py-3 rounded-xl font-semibold ${
        already
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-green-500 text-white"
      }`}
    >
      {already ? "Applied" : "Apply Now"}
    </button>
  );
}
