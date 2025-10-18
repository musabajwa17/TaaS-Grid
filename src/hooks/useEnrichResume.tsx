import { useState } from "react";

interface SelectedFields {
  role: string;
  industry: string;
  experience_level: string;
  tone: string;
}

export function useEnrichResume() {
  const [loading, setLoading] = useState(false);
  const [enrichedData, setEnrichedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const enrichResume = async (parsedData: any, selectedFields: SelectedFields) => {
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
      console.log("Raw API Response:", data);

      if (!response.ok) {
        throw new Error(data.detail || "Failed to enrich resume");
      }

      if (data.status === "success") {
        setEnrichedData(data);
        localStorage.setItem("enrichedData", JSON.stringify(data));
      } else {
        throw new Error("API returned unexpected format");
      }
    } catch (err: any) {
      console.error("❌ Error enriching resume:", err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return { enrichResume, enrichedData, loading, error };
}
