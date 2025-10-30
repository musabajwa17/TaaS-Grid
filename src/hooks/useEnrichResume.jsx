import { useState } from "react";

export function useEnrichResume() {
  const [loading, setLoading] = useState(false);
  const [enrichedData, setEnrichedData] = useState(null);
  const [error, setError] = useState(null);
  const enrichResume = async (parsedData, selectedFields) => {
    setLoading(true);
    setError(null);
   
    try {
      const response = await fetch("http://localhost:8000/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parsed_data: parsedData || {},
          selected_fields: selectedFields,
        }),
      });

  const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to enrich resume");
      }

      if (data.status === "success") {
        setEnrichedData(data);
        localStorage.setItem("enrichedData", JSON.stringify(data));
      } else {
        throw new Error("API returned unexpected format");
      }
    } catch (err) {
      console.error("❌ Error enriching resume:", err);
      if (err instanceof Error) {
        setError(err.message || "Unknown error");
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  return { enrichResume, enrichedData, loading, error };
}
