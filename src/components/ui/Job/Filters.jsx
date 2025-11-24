export default function Filters({ title, setTitle, location, setLocation }) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Search jobs…"
        className="w-full p-3 rounded-xl border"
      />
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location…"
        className="w-full p-3 rounded-xl border"
      />
    </div>
  );
}
