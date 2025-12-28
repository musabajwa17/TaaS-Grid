import { Express, Request } from "express";
import { createServer, Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { log } from "./index";
import session from "express-session";
import MemoryStore from "memorystore";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const MIN_REQUEST_DELAY = 500; // 500ms minimum delay between API requests
const upload = multer({ storage: multer.memoryStorage() });

// Session store for holding analysis results
const SessionStore = MemoryStore(session);
const sessionStore = new SessionStore({
  checkInterval: 86400000, // 24 hours
});

// Initialize AI API - Use GEMINI_API_KEY from environment
const apiKey = process.env.GEMINI_API_KEY;
log(`AI API Key loaded: ${apiKey ? "✅ YES" : "❌ NO"}`);

if (!apiKey) {
  log("⚠️  WARNING: GEMINI_API_KEY not found in environment. Please add it in Replit Secrets with key 'GEMINI_API_KEY'.", "ERROR");
}

const genAI = new GoogleGenerativeAI(apiKey || "");
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash-lite",
});
log(`✅ AI model initialized: gemini-2.5-flash-lite (API Key: ${apiKey ? "loaded" : "MISSING"})`);

// Utility function to add minimal delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Format experience from decimal years to "X year Y months" format
const formatExperience = (years) => {
  if (!years || years === 0) return "0 months";
  const wholeYears = Math.floor(years);
  const months = Math.round((years - wholeYears) * 12);
  
  if (wholeYears === 0) {
    return `${months} month${months === 1 ? '' : 's'}`;
  }
  if (months === 0) {
    return `${wholeYears} year${wholeYears === 1 ? '' : 's'}`;
  }
  return `${wholeYears} year${wholeYears === 1 ? '' : 's'} ${months} month${months === 1 ? '' : 's'}`;
};

export async function registerRoutes(
  httpServer,
  app
) {

  app.post(api.cvs.upload.path, upload.array('files'), async (req, res) => {
    try {
      const files = req.files;
      log(`Upload request received: ${files?.length || 0} files`, "upload");
      
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const processedCvs = [];
      const errors = [];

      for (const file of files) {
        // Validate file size (5MB max)
        if (file.size > MAX_FILE_SIZE) {
          const sizeMB = (file.size / 1024 / 1024).toFixed(2);
          log(`❌ File too large: ${file.originalname} (${sizeMB}MB > 5MB)`, "upload");
          errors.push(`${file.originalname}: File exceeds 5MB limit (${sizeMB}MB)`);
          continue;
        }

        // Store file as base64 for Gemini File API
        try {
          const base64Content = file.buffer.toString('base64');
          log(`✅ File converted for Gemini API: ${file.originalname} (${file.size} bytes)`, "upload");
          
          const cv = await storage.createCv({
            filename: file.originalname,
            content: base64Content, // Store base64 for fileData API
            uploadDate: new Date().toISOString(),
          });
          processedCvs.push(cv);
          log(`✅ CV stored in memory: ${cv.id} - ${file.originalname}`, "storage");
        } catch (e) {
          log(`❌ Failed to process file ${file.originalname}: ${e}`, "upload");
          errors.push(`${file.originalname}: Processing failed`);
          continue;
        }
      }

      log(`Upload complete: ${processedCvs.length} CVs stored, ${errors.length} errors`, "upload");
      res.json({ 
        cvs: processedCvs,
        errors: errors,
        message: errors.length > 0 ? `Uploaded ${processedCvs.length} files with ${errors.length} error(s)` : "Upload successful"
      });
    } catch (error) {
      log(`❌ Upload error: ${error}`, "error");
      res.status(500).json({ message: "Upload failed" });
    }
  });

  app.post(api.cvs.analyze.path, async (req, res) => {
    try {
      const criteria = req.body;
      const cvs = await storage.getCvs();
      
      log(`Analysis request received. Criteria: ${JSON.stringify(criteria)}`, "analyze");
      log(`CVs to analyze: ${cvs.length}`, "analyze");

      if (cvs.length === 0) {
        log("No CVs to analyze", "analyze");
        return res.json([]);
      }

      // Set headers for streaming
      res.setHeader('Content-Type', 'application/x-ndjson');
      res.setHeader('Transfer-Encoding', 'chunked');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const analyzeCv = async (cv, index) => {
         const prompt = `You are a professional CV/Resume analyzer. Analyze the provided PDF carefully.

CRITERIA FOR SCORING (WEIGHTED):
- Technologies (Required Skills): ${criteria.requiredSkills || 'Not specified'} (Weight: 35%)
- Education (Degree Requirement): ${criteria.degree || 'Not specified'} (Weight: 20%)
- Experience (Min Years): ${criteria.minExperience || 'Not specified'} years (Weight: 25%)
- Academic Excellence (GPA): ${criteria.minGpa || 'Not specified'} (Weight: 10%)
- Graduation Year: ${criteria.degreeCompletionYear || 'Not specified'} (Weight: 5%)
- Job Location: ${criteria.location || 'Not specified'} (Weight: 5%)
- Job Context: ${criteria.jobDescription || 'Not specified'}

SCORING GUIDELINE:
1. Technologies are the most critical factor (35% total score).
2. Relevant Experience and Education are significant (45% combined).
3. GPA and Graduation Year indicate academic merit and freshness.
4. Location is a soft preference (5%).

Extract all information from the resume/CV and score it (0-100) against the criteria. CATEGORIZE EXPERIENCE into domain-related (Professional Job, Internship, Freelancing) and miscellaneous (unrelated). Return ONLY valid JSON (no markdown, no extra text):
{
  "score": <0-100 number>,
  "matchDetails": "<brief 1-2 sentence explanation>",
  "extractedData": {
    "name": "<candidate name or 'N/A'>",
    "email": "<email or 'N/A'>",
    "phone": "<phone or 'N/A'>",
    "location": "<location or 'N/A'>",
    "degree": "<degree or 'N/A'>",
    "university": "<university or 'N/A'>",
    "gpa": <GPA number or null>,
    "experience": {
      "relative": {
        "professionalJob": <years number or 0>,
        "internship": <years number or 0>,
        "freelancing": <years number or 0>
      },
      "miscellaneous": <years number or 0>
    },
    "skills": ["<skill1>", "<skill2>"]
  }
}`;

         try {
           log(`🚀 [${index + 1}/${cvs.length}] Processing: ${cv.filename}`, "analyze");
           
           // Minimal delay for rate limiting
           if (index > 0) {
             await delay(MIN_REQUEST_DELAY);
           }

           // Send PDF file to Gemini as inline data (treats PDF as file, not text)
           const result = await model.generateContent([
             {
               inlineData: {
                 mimeType: "application/pdf",
                 data: cv.content // Base64 encoded PDF data
               }
             },
             {
               text: prompt
             }
           ]);
           const response = await result.response;
           let text = response.text().trim();
           
           // Clean response
           text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
           const jsonMatch = text.match(/\{[\s\S]*\}/);
           const jsonStr = jsonMatch ? jsonMatch[0] : text;
           
           const analysis = JSON.parse(jsonStr);
           log(`✅ [${index + 1}] Complete: ${cv.filename} (Score: ${analysis.score}%)`, "analyze");

           // Format experience data
           const extractedData = analysis.extractedData || {};
           if (extractedData.experience?.relative) {
             extractedData.experience.relative = {
               professionalJob: formatExperience(extractedData.experience.relative.professionalJob || 0),
               internship: formatExperience(extractedData.experience.relative.internship || 0),
               freelancing: formatExperience(extractedData.experience.relative.freelancing || 0),
             };
           }
           if (extractedData.experience) {
             extractedData.experience.miscellaneous = formatExperience(extractedData.experience.miscellaneous || 0);
           }

           return {
             cv,
             analysis: {
               id: cv.id,
               cvId: cv.id,
               score: Math.min(100, Math.max(0, analysis.score || 0)),
               matchDetails: analysis.matchDetails || "Analysis completed",
               extractedData: extractedData,
               locked: false
             }
           };
         } catch (e) {
           const errorMsg = String(e);
           log(`❌ [${index + 1}] Error: ${cv.filename}: ${errorMsg}`, "error");
           return {
             cv,
             analysis: {
               id: cv.id,
               cvId: cv.id,
               score: 0,
               matchDetails: `Analysis failed - please check file format`,
               extractedData: {
                 name: cv.filename,
                 email: "N/A",
                 phone: "N/A",
                 location: "N/A",
                 degree: "N/A",
                 university: "N/A",
                 gpa: null,
                 experience: {
                   relative: { professionalJob: "0 months", internship: "0 months", freelancing: "0 months" },
                   miscellaneous: "0 months"
                 },
                 skills: []
               },
               locked: false
             }
           };
         }
      };

      log(`Starting batch analysis of ${cvs.length} CVs with real-time streaming...`, "analyze");
      
      // Process in optimal batch size for faster response
      const batchSize = Math.min(cvs.length, 5);
      const allResults = [];
      
      for (let i = 0; i < cvs.length; i++) {
        const result = await analyzeCv(cvs[i], i);
        allResults.push(result);
        
        // Stream result immediately for real-time updates
        res.write(JSON.stringify(result) + '\n');
        log(`📤 [${i + 1}/${cvs.length}] Streamed: ${cvs[i].filename}`, "analyze");
        
        // Minimal delay only between batches
        if ((i + 1) % batchSize === 0 && i + 1 < cvs.length) {
          await delay(MIN_REQUEST_DELAY);
        }
      }
      
      // Store in session for later ranking
      if (req.session) {
        req.session.analysisResults = allResults;
        log(`📦 Stored ${allResults.length} results in session for ranking`, "analyze");
      }
      
      log(`✅ Batch analysis complete: ${allResults.length} CVs analyzed`, "analyze");
      res.end();

    } catch (error) {
      log(`❌ Analysis error: ${error}`, "error");
      res.status(500).json({ message: "Analysis failed" });
    }
  });

  // New endpoint for ranking (sorts by score)
  app.post(api.cvs.rank.path, async (req, res) => {
    try {
      if (!req.session?.analysisResults || req.session.analysisResults.length === 0) {
        log("No analysis results to rank", "rank");
        return res.json([]);
      }

      const results = req.session.analysisResults;
      // Sort by score descending
      const ranked = results.sort((a, b) => 
        b.analysis.score - a.analysis.score
      );
      
      log(`✅ Ranked ${ranked.length} CVs by score`, "rank");
      res.json(ranked);
    } catch (error) {
      log(`❌ Ranking error: ${error}`, "error");
      res.status(500).json({ message: "Ranking failed" });
    }
  });

  app.post(api.cvs.clear.path, async (req, res) => {
    await storage.clearCvs();
    res.json({ message: "Cleared" });
  });

  return httpServer;
}
