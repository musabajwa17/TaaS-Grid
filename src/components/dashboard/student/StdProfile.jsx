"use client";
import { useEffect } from "react";
import { useResume } from "@/hooks/useStdPreviewResume";

export default function CVPreview({ userId }) {
  const { resume, fetchResume, updateResume, loading } = useResume(userId);
  useEffect(() => {
    fetchResume();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (!resume) return <p>No resume found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded mt-20">
      <h1 className="text-3xl font-bold">{resume.name}</h1>
      <p className="text-xl text-gray-600">{resume.title}</p>

      <button
        onClick={() => updateResume({ title: "Updated Title" })}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Update Title
      </button>
    </div>
  );
}
