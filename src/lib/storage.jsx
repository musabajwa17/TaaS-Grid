

const STORAGE_KEY = "cv_analysis_results";
const STORAGE_VERSION_KEY = "cv_analysis_version";
const CRITERIA_KEY = "cv_filter_criteria";

const UPLOADED_CVS_KEY = "cv_uploaded_files";

export const analysisStorage = {
  getCriteria() {
    try {
      const data = localStorage.getItem(CRITERIA_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  saveCriteria(criteria) {
    localStorage.setItem(CRITERIA_KEY, JSON.stringify(criteria));
  },

  clearCriteria() {
    localStorage.removeItem(CRITERIA_KEY);
  },

  getUploadedCvs() {
    try {
      const data = localStorage.getItem(UPLOADED_CVS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveUploadedCvs(cvs) {
    localStorage.setItem(UPLOADED_CVS_KEY, JSON.stringify(cvs));
  },

  getResults() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return []; // Return empty array instead of null for easier mapping
      
      const parsed = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];
      
      return parsed;
    } catch (e) {
      console.error("Failed to read analysis results:", e);
      return [];
    }
  },

  /**
   * SAFE save - only call after successful API response
   * Returns true only if save was successful
   */
  saveResults(results) {
    try {
      if (!Array.isArray(results)) {
        console.error("Invalid results format for saving");
        return false;
      }

      // Validate at least one valid result
      if (results.length > 0) {
        const first = results[0];
        if (!first.cv?.id || !first.analysis?.score) {
          console.error("Invalid result structure");
          return false;
        }
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
      localStorage.setItem(STORAGE_VERSION_KEY, new Date().toISOString());
      console.log(`✅ [STORAGE] Saved ${results.length} results to localStorage`);
      return true;
    } catch (e) {
      console.error("Failed to save analysis results:", e);
      return false;
    }
  },

  /**
   * Clear results - only on explicit user action
   */
  clearResults() {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_VERSION_KEY);
    localStorage.removeItem(UPLOADED_CVS_KEY);
    localStorage.removeItem("cv_selected_files_metadata");
    localStorage.removeItem("cv_batch_status");
    console.log("✅ [STORAGE] Cleared analysis results and uploaded CVs");
  },

  saveSelectedFilesMetadata(files) {
    localStorage.setItem("cv_selected_files_metadata", JSON.stringify(files));
  },

  getSelectedFilesMetadata() {
    try {
      const data = localStorage.getItem("cv_selected_files_metadata");
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  saveBatchStatus(status) {
    localStorage.setItem("cv_batch_status", JSON.stringify(status));
  },

  getBatchStatus() {
    try {
      const data = localStorage.getItem("cv_batch_status");
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  /**
   * Listen for changes from other tabs
   */
  onResultsChange(callback) {
    const handler = (e) => {
      if (e.key === STORAGE_KEY) {
        try {
          const newResults = e.newValue ? JSON.parse(e.newValue) : null;
          console.log("📡 [STORAGE] Results updated from another tab");
          callback(newResults);
        } catch (error) {
          console.error("Failed to parse cross-tab message:", error);
        }
      }
    };

    window.addEventListener("storage", handler);
    
    // Return unsubscribe function
    return () => window.removeEventListener("storage", handler);
  }
};
