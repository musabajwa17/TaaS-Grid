import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../shared/routes";
import { z } from "zod";


// ============================================
// HOOKS
// ============================================

export function useUploadCvs() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (files) => {
      console.log("📤 [API] Uploading to /api/cvs/upload:", files);
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      
      const res = await fetch(api.cvs.upload.path, {
        method: api.cvs.upload.method,
        body: formData,
      });

      console.log("📥 [API] Response status:", res);
      if (!res.ok) {
        const errText = await res.text();
        console.error("❌ [API] Server error:", errText);
        throw new Error("Upload failed: " + errText);
      }
      const data = await res.json();
      console.log("✅ [API] Upload response:", data);
      // Return just the cvs array for backward compatibility
      return (data.cvs || data);
    },
  });
}

export function useAnalyzeCvs() {
  return useMutation({
    mutationFn: async (criteria, options) => {
      console.log("🤖 [API] Analyzing CVs with POST /api/cvs/analyze:", criteria);
      const res = await fetch(api.cvs.analyze.path, {
        method: api.cvs.analyze.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(criteria),
      });

      console.log("📥 [API] Analysis response status:", res.status);
      if (!res.ok) {
        const errText = await res.text();
        console.error("❌ [API] Server error:", errText);
        throw new Error("Analysis failed");
      }

      // Handle NDJSON streaming response
      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      const results = [];
      const decoder = new TextDecoder();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          
          // Process all complete lines
          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i].trim();
            if (line) {
              try {
                const parsed = JSON.parse(line);
                results.push(parsed);
                console.log(`✅ [API] Received result: ${parsed.cv.filename}`);
                // Call progress callback with real file name
                options?.onProgress?.(parsed.cv.filename, results.length, 0);
              } catch (e) {
                console.error(`⚠️ Failed to parse line: ${line}`);
              }
            }
          }
          
          // Keep incomplete last line in buffer
          buffer = lines[lines.length - 1];
        }

        // Process any remaining data in buffer
        if (buffer.trim()) {
          try {
            const parsed = JSON.parse(buffer);
            results.push(parsed);
            console.log(`✅ [API] Received final result: ${parsed.cv.filename}`);
            options?.onProgress?.(parsed.cv.filename, results.length, 0);
          } catch (e) {
            console.error(`⚠️ Failed to parse final buffer: ${buffer}`);
          }
        }
      } finally {
        reader.releaseLock();
      }

      console.log("✅ [API] All analysis results received:", results);
      return results;
    },
  });
}

export function useClearCvs() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(api.cvs.clear.path, {
        method: api.cvs.clear.method,
      });
      if (!res.ok) throw new Error("Failed to clear data");
      return res.json();
    },
    onSuccess: () => {
      // Clear any cached data if we had any query keys
      queryClient.clear(); 
    }
  });
}
