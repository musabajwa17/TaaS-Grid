import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// We are using in-memory storage, but defining schema for types is good practice
// and required for the frontend generator to understand the data shape.

export const cvs = pgTable("cvs", {
  id: serial("id").primaryKey(),
  filename: text("filename").notNull(),
  content: text("content").notNull(), // Extracted text
  uploadDate: text("upload_date").notNull(),
});

export const insertCvSchema = createInsertSchema(cvs).omit({ id: true });
export type InsertCv = z.infer<typeof insertCvSchema>;
export type Cv = typeof cvs.$inferSelect;

export const analysisResults = pgTable("analysis_results", {
  id: serial("id").primaryKey(),
  cvId: integer("cv_id").notNull(),
  score: integer("score").notNull(),
  matchDetails: text("match_details").notNull(),
  extractedData: jsonb("extracted_data").notNull(), // { gpa, experience, skills, ... }
});

export type AnalysisResult = typeof analysisResults.$inferSelect;

// Filter Criteria Schema
export const filterCriteriaSchema = z.object({
  jobDescription: z.string().optional(),
  minGpa: z.number().min(0).max(4).optional(),
  minExperience: z.number().min(0).optional(),
  requiredSkills: z.string().optional(), // Comma separated
  degree: z.string().optional(),
  degreeCompletionYear: z.number().min(1950).max(2099).optional(),
  location: z.string().optional(),
});

export type FilterCriteria = z.infer<typeof filterCriteriaSchema>;

export interface ScoredCv extends Cv {
  analysis: AnalysisResult;
}
