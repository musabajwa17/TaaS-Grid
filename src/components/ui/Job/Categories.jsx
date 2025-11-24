const categories = [
  { id: "all", label: "All" },
  { id: "job", label: "Jobs" },
  { id: "internship", label: "Internships" },
  { id: "fyp", label: "FYP Ideas" },
];

export default function Categories({ active, setActive }) {
  return (
    <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => setActive(c.id)}
          className={`px-6 py-3 rounded-xl ${
            active === c.id ? "bg-green-500 text-white" : "bg-white border"
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
