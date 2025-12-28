// import React from "react";
// import { useState, useEffect, useMemo } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useEffect, useState } from "react";
// import { Link, useLocation } from "wouter";
// import { ScoredCv } from "@/hooks/use-cvs";
// import { ChevronDown, ChevronUp, Star, Download, ExternalLink, ArrowLeft, Eye, X, FileText } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { clsx } from "clsx";
// import jsPDF from "jspdf";
// import { analysisStorage } from "@/lib/storage";
// import { useState, useEffect, useMemo } from "react";
// import { useLocation } from "wouter";
// import { FileUploader } from "@/components/FileUploader";
// import { useUploadCvs, useAnalyzeCvs } from "@/hooks/use-cvs";
// import { ArrowRight, Sparkles, Loader2, CheckCircle2, Clock, PlayCircle, Layers, Send } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useToast } from "@/hooks/use-toast";
// import { analysisStorage } from "@/lib/storage";
// import { Button } from "@/components/ui/button";
// import { clsx } from "clsx";
// import { fileStore } from "@/lib/idb-store";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useLocation } from "wouter";
// import { filterCriteriaSchema } from "@shared/schema";
// import { Briefcase, GraduationCap, MapPin, Award, Zap, Settings, AlertCircle } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
// import { motion } from "framer-motion";
// import { useState, useEffect } from "react";
// import { analysisStorage } from "@/lib/storage";
// import { Button } from "@/components/ui/button";
// import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { clsx } from "clsx";
// export default function BundleAnalyzer() {

// const form = useForm({
//     resolver: zodResolver(filterCriteriaSchema),
//     defaultValues: {
//       minGpa: 3.0,
//       minExperience: 1,
//     }
//   });

//   const [, setLocation] = useLocation();
//   const { toast } = useToast();
//   const [isLocked, setIsLocked] = useState(false);

//   useEffect(() => {
//     const savedCriteria = analysisStorage.getCriteria();
//     if (savedCriteria) {
//       form.reset(savedCriteria);
//       setIsLocked(true);
//     }
//   }, []);

//   const handleReset = () => {
//     if (confirm("WARNING: This will purge all your old records and reset the session. Continue?")) {
//       analysisStorage.clearCriteria();
//       analysisStorage.clearResults();
//       form.reset({
//         jobDescription: "",
//         requiredSkills: "",
//         location: "",
//         minGpa: 3.0,
//         minExperience: 1,
//         degree: "",
//         degreeCompletionYear: 2024
//       });
//       setIsLocked(false);
//       window.location.reload(); // Hard reset to clear all states
//     }
//   };

//   const onSubmit = (data) => {
//     analysisStorage.saveCriteria(data);
//     setIsLocked(true);
//     toast({
//       title: "Criteria Locked",
//       description: "You can now proceed to upload and process CVs with these settings.",
//     });
//     // Use setTimeout to ensure state updates before navigation
//     setTimeout(() => {
//       setLocation("/upload");
//     }, 100);
//   };





// const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  
//   // Colors and styling
//   const primaryColor = [59, 130, 246]; // Blue
//   const accentColor = [100, 116, 139]; // Slate
//   const darkText = [15, 23, 42]; // Dark slate
//   const lightText = [100, 116, 139]; // Gray
//   const headerBg = [240, 244, 250]; // Light blue
  
//   let yPosition = 20;
//   const pageHeight = doc.internal.pageSize.getHeight();
//   const margin = 15;
//   const contentWidth = 180;
  
//   // Header
//   doc.setTextColor(...primaryColor);
//   doc.setFontSize(28);
//   doc.setFont("helvetica", "bold");
//   doc.text("CV INSIGHT ENGINE", margin, yPosition);
  
//   yPosition += 10;
//   doc.setTextColor(...lightText);
//   doc.setFontSize(12);
//   doc.setFont("helvetica", "normal");
//   doc.text("Analysis Results Report", margin, yPosition);
  
//   // Summary line
//   yPosition += 12;
//   doc.setTextColor(...accentColor);
//   doc.setFontSize(10);
//   doc.text(`Generated: ${new Date().toLocaleDateString()} | Total Candidates: ${results.length}`, margin, yPosition);
  
//   // Line separator
//   yPosition += 5;
//   doc.setDrawColor(...primaryColor);
//   doc.line(margin, yPosition, margin + contentWidth, yPosition);
  
//   yPosition += 10;
  
//   // Results
//   results.forEach((item, idx) => {
//     const extracted = item.analysis.extractedData;
//     const score = item.analysis.score;
    
//     // Check if we need a new page
//     if (yPosition > pageHeight - 50) {
//       doc.addPage();
//       yPosition = 20;
//     }
    
//     // Rank and score header
//     doc.setTextColor(...darkText);
//     doc.setFontSize(13);
//     doc.setFont("helvetica", "bold");
//     doc.text(`${idx + 1}. ${extracted?.name || item.cv.filename}`, margin, yPosition);
    
//     // Score badge
//     const scoreColor = score >= 80 ? [22, 163, 74] : score >= 60 ? [202, 138, 4] : [220, 38, 38];
//     doc.setTextColor(...scoreColor);
//     doc.setFontSize(11);
//     doc.setFont("helvetica", "bold");
//     doc.text(`${score}/100`, margin + contentWidth - 15, yPosition);
    
//     yPosition += 8;
    
//     // Table structure
//     doc.setTextColor(...darkText);
//     doc.setFontSize(9);
//     doc.setFont("helvetica", "normal");
    
//     const tableData = [
//       ["Email", extracted?.email || "N/A"],
//       ["Location", extracted?.location || "N/A"],
//       ["Degree", extracted?.degree || "N/A"],
//       ["GPA", extracted?.gpa || "N/A"],
//     ];
    
//     const colWidths = [40, 125];
//     let tableY = yPosition;
    
//     tableData.forEach(([label, value]) => {
//       // Background alternation
//       if (tableData.indexOf([label, value]) % 2 === 0) {
//         doc.setFillColor(245, 248, 252);
//         doc.rect(margin, tableY - 4, contentWidth, 6, "F");
//       }
      
//       doc.setTextColor(...darkText);
//       doc.setFont("helvetica", "bold");
//       doc.text(label, margin + 3, tableY);
      
//       doc.setTextColor(...lightText);
//       doc.setFont("helvetica", "normal");
//       doc.text(String(value), margin + colWidths[0] + 3, tableY);
      
//       tableY += 7;
//     });
    
//     yPosition = tableY + 3;
    
//     // Experience breakdown with subheadings
//     doc.setTextColor(...darkText);
//     doc.setFontSize(9);
//     doc.setFont("helvetica", "bold");
//     doc.text("Experience Breakdown", margin, yPosition);
//     yPosition += 6;
    
//     // Relative Experience
//     doc.setTextColor(...primaryColor);
//     doc.setFontSize(8);
//     doc.setFont("helvetica", "bold");
//     doc.text("Domain-Related (Relative)", margin + 3, yPosition);
//     yPosition += 4;
    
//     doc.setTextColor(...lightText);
//     doc.setFont("helvetica", "normal");
//     doc.setFontSize(8);
//     const profJob = extracted?.experience?.relative?.professionalJob || 0;
//     const internship = extracted?.experience?.relative?.internship || 0;
//     const freelance = extracted?.experience?.relative?.freelancing || 0;
    
//     doc.text(`• Professional Job: ${profJob} years`, margin + 6, yPosition);
//     yPosition += 4;
//     doc.text(`• Internship: ${internship} years`, margin + 6, yPosition);
//     yPosition += 4;
//     doc.text(`• Freelancing: ${freelance} years`, margin + 6, yPosition);
//     yPosition += 5;
    
//     // Other Experience
//     doc.setTextColor(...primaryColor);
//     doc.setFont("helvetica", "bold");
//     doc.text("Other", margin + 3, yPosition);
//     yPosition += 4;
    
//     doc.setTextColor(...lightText);
//     doc.setFont("helvetica", "normal");
//     const misc = extracted?.experience?.miscellaneous || 0;
//     doc.text(`• Miscellaneous: ${misc} years`, margin + 6, yPosition);
//     yPosition += 6;
    
//     // Separator
//     doc.setDrawColor(220, 220, 220);
//     doc.line(margin, yPosition, margin + contentWidth, yPosition);
    
//     yPosition += 8;
//   });
  
//   // Save the PDF
//   doc.save("CV_Analysis_Report.pdf");
// };

// export default function ResultsPage() {
//   const [results, setResults] = useState([]);
//   const [expandedId, setExpandedId] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedResult, setSelectedResult] = useState(null);
//   const [, setLocation] = useLocation();
//   const [isRanked, setIsRanked] = useState(false);
//   const [isRanking, setIsRanking] = useState(false);

//   const openModal = (result) => {
//     setSelectedResult(result);
//     setModalOpen(true);
//   };

//   const handleRank = () => {
//     // Sort results by score locally - no API call needed
//     const ranked = [...results].sort((a, b) => {
//       // Prioritize un-locked (new) records first if they have same score, 
//       // otherwise standard score sort
//       if (b.analysis.score === a.analysis.score) {
//         return (a.analysis).locked ? -1 : 1;
//       }
//       return b.analysis.score - a.analysis.score;
//     });
//     setResults(ranked);
//     setIsRanked(true);
//     // Save ranked version to storage
//     analysisStorage.saveResults(ranked);
//   };

//   useEffect(() => {
//     // Load from safe storage
//     const stored = analysisStorage.getResults();
//     if (stored && stored.length > 0) {
//       setResults(stored);
//       setIsRanked(false);
//       console.log(`✅ Loaded ${stored.length} results from storage`);
//     } else {
//       // Redirect if no data
//       console.log("No analysis results found, redirecting to upload");
//       setLocation("/upload");
//     }

//     // Listen for changes from other tabs (cross-tab sync)
//     const unsubscribe = analysisStorage.onResultsChange((newResults) => {
//       if (newResults && newResults.length > 0) {
//         console.log("📡 Syncing results from another tab");
//         setResults(newResults);
//         setIsRanked(false);
//       }
//     });

//     return () => unsubscribe();
//   }, [setLocation]);

//   const markPreviousAsLocked = () => {
//     setResults(prev => prev.map(r => ({ ...r, analysis: { ...r.analysis, locked: true } })));
//   };

//   const toggleExpand = (id) => {
//     setExpandedId(expandedId === id ? null : id);
//   };

//   if (results.length === 0) return null;









//       const [selectedFiles, setSelectedFiles] = useState([]);
//   const [restoredFileMetadata, setRestoredFileMetadata] = useState([]);
//   const { mutateAsync: upload, isPending: isUploading } = useUploadCvs();
//   const { mutate: analyze } = useAnalyzeCvs();
//   const [, setLocation] = useLocation();
//   const { toast } = useToast();
  
//   const [isCriteriaLocked, setIsCriteriaLocked] = useState(false);
//   const [batchStatus, setBatchStatus] = useState({});
  
//   const [processing, setProcessing] = useState({
//     isProcessing: false,
//     currentFile: "",
//     progress: 0,
//     completedFiles: [],
//     batchId: null
//   });

//   const BATCH_SIZE = 10;

//   useEffect(() => {
//     const criteria = analysisStorage.getCriteria();
//     setIsCriteriaLocked(!!criteria);

//     // Restore metadata and status
//     const savedMetadata = analysisStorage.getSelectedFilesMetadata();
//     if (savedMetadata.length > 0) {
//       setRestoredFileMetadata(savedMetadata);
//     }
//     const savedStatus = analysisStorage.getBatchStatus();
//     if (Object.keys(savedStatus).length > 0) {
//       setBatchStatus(savedStatus);
//     }

//     // Restore actual files from IDB
//     const restoreFiles = async () => {
//       try {
//         const files = await fileStore.getAllFiles();
//         if (files.length > 0) {
//           setSelectedFiles(files);
//         }
//       } catch (err) {
//         console.error("Failed to restore files from IndexedDB:", err);
//       }
//     };
//     restoreFiles();
//   }, []);

//   const handleFilesSelected = async (files) => {
//     // Correctly append new files to existing ones instead of overwriting
//     const updatedFiles = [...selectedFiles, ...files];
//     setSelectedFiles(updatedFiles);
    
//     const metadata = updatedFiles.map(f => ({ name: f.name, size: f.size, type: f.type }));
//     analysisStorage.saveSelectedFilesMetadata(metadata);
    
//     try {
//       // Save only new files to IndexedDB to be efficient
//       await fileStore.saveFiles(files);
//     } catch (err) {
//       console.error("Failed to save files to IndexedDB:", err);
//       toast({ 
//         variant: "destructive", 
//         title: "Persistence Error", 
//         description: "Could not save files for cross-tab sessions." 
//       });
//     }
//   };

//   const batches = useMemo(() => {
//     const jobs = [];
//     const uploadedCvs = analysisStorage.getUploadedCvs() || [];
//     const results = analysisStorage.getResults() || [];
    
//     // Improved restoration: Use selectedFiles if available, otherwise restored metadata
//     const filesToUse = selectedFiles.length > 0 ? selectedFiles : restoredFileMetadata.map(m => {
//       // Temporary fallback while IDB restores
//       return new File([], m.name, { type: m.type });
//     });

//     for (let i = 0; i < filesToUse.length; i += BATCH_SIZE) {
//       const batchFiles = filesToUse.slice(i, i + BATCH_SIZE);
//       const batchId = `Batch-${Math.floor(i / BATCH_SIZE) + 1}`;
      
//       // Crucial: Check uploaded status against filenames precisely
//       const isUploaded = batchFiles.every(f => uploadedCvs.some((cv) => cv.filename === f.name));
//       const isProcessed = batchFiles.every(f => results.some((r) => r.cv.filename === f.name));

//       jobs.push({
//         id: batchId,
//         files: batchFiles,
//         isUploaded,
//         isProcessed
//       });
//     }
//     return jobs;
//   }, [selectedFiles, restoredFileMetadata, batchStatus]); // Added batchStatus to deps to force re-render on status change

//   const updateBatchStatus = (id, status) => {
//     setBatchStatus(prev => {
//       const next = { ...prev, [id]: status };
//       analysisStorage.saveBatchStatus(next);
//       return next;
//     });
//   };

//   const handleUploadBatch = async (job) => {
//     // Only block if we truly have no file object and it's a dummy from restoration
//     if (job.files.some(f => f.size === 0 && !selectedFiles.find(sf => sf.name === f.name))) {
//       toast({ variant: "destructive", title: "Files not in memory", description: "Please re-select files to upload." });
//       return;
//     }
//     try {
//       updateBatchStatus(job.id, 'uploading');
//       const data = await upload(job.files);
//       const currentUploaded = analysisStorage.getUploadedCvs() || [];
//       analysisStorage.saveUploadedCvs([...currentUploaded, ...data]);
//       updateBatchStatus(job.id, 'uploaded');
//       toast({ title: `${job.id} Uploaded`, description: "Batch uploaded successfully." });
//     } catch (error) {
//       updateBatchStatus(job.id, 'idle');
//       toast({ variant: "destructive", title: "Upload Failed" });
//     }
//   };

//   const startBatchProcessing = (job) => {
//     const criteria = analysisStorage.getCriteria();
//     if (!criteria) {
//       toast({ title: "Rules Missing", variant: "destructive" });
//       setLocation("/");
//       return;
//     }

//     updateBatchStatus(job.id, 'processing');
//     setProcessing(prev => ({ ...prev, isProcessing: true, batchId: job.id, progress: 0 }));
    
//     // Simulate progress
//     const interval = setInterval(() => {
//       setProcessing(prev => {
//         if (prev.progress >= 95) return prev;
//         return { ...prev, progress: prev.progress + 2 };
//       });
//     }, 300);

//     analyze(criteria, {
//       onSuccess: (results) => {
//         clearInterval(interval);
//         const previous = analysisStorage.getResults() || [];
//         const updatedResults = [...previous, ...results];
//         analysisStorage.saveResults(updatedResults);
//         updateBatchStatus(job.id, 'done');
        
//         // Clear files from memory store once fully processed if needed
//         // For now keep them for the session but we could clear IDB here
        
//         setProcessing(prev => ({ ...prev, isProcessing: false, batchId: null, progress: 100 }));
//         toast({ 
//           title: "AI Analysis Complete", 
//           description: "Results are ready in the results section.",
//           action: (
//             <Button variant="outline" size="sm" onClick={() => setLocation("/results")}>
//               View Results
//             </Button>
//           )
//         });
//       },
//       onError: () => {
//         clearInterval(interval);
//         updateBatchStatus(job.id, 'uploaded');
//         setProcessing(prev => ({ ...prev, isProcessing: false, batchId: null, progress: 0 }));
//         toast({ variant: "destructive", title: "AI Error", description: "Something went wrong during analysis." });
//       }
//     });
//   };

//   const statusMessages = [
//     "Reading the resumes...",
//     "Extracting key skills and experience...",
//     "Scoring candidates based on your rules...",
//     "Comparing degrees and locations...",
//     "Finalizing the rank list...",
//     "Almost there, polishing results..."
//   ];

//   const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

//   useEffect(() => {
//     let msgInterval;
//     if (processing.isProcessing) {
//       msgInterval = setInterval(() => {
//         setCurrentMessageIndex(prev => (prev + 1) % statusMessages.length);
//       }, 3000);
//     }
//     return () => clearInterval(msgInterval);
//   }, [processing.isProcessing]);

//   if (!isCriteriaLocked) {
//     return (
//       <div className="max-w-2xl mx-auto text-center space-y-8 pt-20">
//         <div className="p-10 bg-card rounded-3xl border border-dashed border-primary/30 space-y-6">
//           <Clock className="w-16 h-16 text-primary mx-auto animate-pulse" />
//           <h2 className="text-2xl font-bold">Rules Required</h2>
//           <Button onClick={() => setLocation("/")} size="lg" className="rounded-xl px-10">Set Filter Rules</Button>
//         </div>
//       </div>
//     );
//   }


//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">Bundle Analyzer</h2>
      
//       <Tabs defaultValue="criteria" className="w-full">
//         <TabsList>
//           <TabsTrigger value="criteria">Criteria Filter</TabsTrigger>
//           <TabsTrigger value="upload">Upload and Process</TabsTrigger>
//           <TabsTrigger value="results">Results</TabsTrigger>
//         </TabsList>

//         <TabsContent value="criteria">
//            <div className="max-w-4xl mx-auto space-y-8">
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex items-center justify-between"
//       >
//         <div>
//           <h1 className="text-3xl font-bold font-display">Criteria Filter</h1>
//           <p className="text-muted-foreground mt-1">Set recruitment criteria for this session. Locked for consistency.</p>
//         </div>
//         {isLocked && (
//           <Button variant="outline" onClick={handleReset} className="text-destructive border-destructive hover:bg-destructive/10 gap-2">
//             <AlertCircle className="w-4 h-4" />
//             Reset All & Purge
//           </Button>
//         )}
//       </motion.div>

//       <div className={clsx("transition-all duration-500", isLocked && "opacity-75 pointer-events-none")}>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//             <div className="bg-card rounded-2xl p-8 border border-border shadow-sm space-y-8">
//               <div className="space-y-4">
//                 <FormField
//                   control={form.control}
//                   name="jobDescription"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="flex items-center gap-2">
//                         <Briefcase className="w-4 h-4 text-primary" />
//                         Job Description / Key Focus
//                       </FormLabel>
//                       <FormControl>
//                         <Textarea {...field} placeholder="e.g. Senior React Developer with focus on performance..." className="min-h-[120px] rounded-xl" />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <div className="grid md:grid-cols-2 gap-6">
//                   <FormField
//                     control={form.control}
//                     name="requiredSkills"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="flex items-center gap-2">
//                           <Zap className="w-4 h-4 text-accent" />
//                           Technologies (Required Skills)
//                         </FormLabel>
//                         <FormControl>
//                           <Input {...field} placeholder="React, Node.js, TypeScript" className="rounded-xl h-12" />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="location"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="flex items-center gap-2">
//                           <MapPin className="w-4 h-4 text-green-500" />
//                           Job Location
//                         </FormLabel>
//                         <FormControl>
//                           <Input {...field} placeholder="e.g., Remote, Islamabad" className="rounded-xl h-12" />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <div className="grid md:grid-cols-3 gap-6">
//                   <FormField
//                     control={form.control}
//                     name="minGpa"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="flex items-center gap-2">
//                           <Award className="w-4 h-4 text-yellow-500" />
//                           Academic Merit (Min GPA)
//                         </FormLabel>
//                         <FormControl>
//                           <Input type="number" step="0.1" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} className="rounded-xl h-12" />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="minExperience"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="flex items-center gap-2">
//                           <Briefcase className="w-4 h-4 text-blue-500" />
//                           Experience (Min Years)
//                         </FormLabel>
//                         <FormControl>
//                           <Input type="number" step="0.5" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} className="rounded-xl h-12" />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="degreeCompletionYear"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel className="flex items-center gap-2">
//                           <GraduationCap className="w-4 h-4 text-purple-500" />
//                           Graduation Year
//                         </FormLabel>
//                         <FormControl>
//                           <Input type="number" min="1950" max="2099" {...field} onChange={e => field.onChange(parseInt(e.target.value))} className="rounded-xl h-12" />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>

//                 <FormField
//                   control={form.control}
//                   name="degree"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="flex items-center gap-2">
//                         <GraduationCap className="w-4 h-4 text-purple-500" />
//                         Education (Degree Requirement)
//                       </FormLabel>
//                       <FormControl>
//                         <Input {...field} placeholder="Bachelor's in Computer Science, Master's, etc." className="rounded-xl h-12" />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>

//               {!isLocked && (
//                 <div className="flex justify-end pt-4">
//                   <Button type="submit" size="lg" className="px-10 rounded-xl font-bold bg-gradient-to-r from-primary to-accent text-white shadow-lg">
//                     Lock & Proceed
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </form>
//         </Form>
//       </div>

//       {isLocked && (
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4 shadow-sm"
//         >
//           <div className="p-3 bg-blue-100 rounded-xl">
//             <Settings className="w-6 h-6 text-blue-600" />
//           </div>
//           <div>
//             <p className="text-lg font-bold text-blue-900">Criteria is Locked</p>
//             <p className="text-sm text-blue-700 leading-relaxed">
//               This ensures fair and consistent scoring for all candidates in this recruitment session. 
//               To change settings, you must reset the session, which will <span className="font-bold underline">purge all current results</span>.
//             </p>
//           </div>
//         </motion.div>
//       )}
//     </div>
//         </TabsContent>

//         <TabsContent value="upload">
//           <div className="max-w-6xl mx-auto space-y-8 pb-20">
//       <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4 mb-10">
//         <h1 className="text-3xl font-bold font-display">TaaS Bulk Engine</h1>
//         <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Cater your candidate in Bulk. High-speed analysis Fast & Smart.</p>
//       </motion.div>

//       <div className="grid lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-1">
//           <div className="bg-card rounded-3xl p-6 border border-border shadow-sm sticky top-8">
//             <h3 className="text-lg font-bold mb-4 flex items-center gap-2">Capture Files</h3>
//             <FileUploader onFilesSelected={handleFilesSelected} isUploading={isUploading} uploadProgress={{}} />
//           </div>
//         </div>

//         <div className="lg:col-span-2 space-y-4">
//           <AnimatePresence mode="popLayout">
//             {batches.map((job, idx) => {
//               const status = batchStatus[job.id] || (job.isProcessed ? 'done' : job.isUploaded ? 'uploaded' : 'idle');
//               const isCurrentProcessing = processing.batchId === job.id;
              
//               const canAnalyze = (status === 'uploaded' || job.isUploaded) && !job.isProcessed && !processing.isProcessing;

//               return (
//                 <motion.div key={job.id} layout initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} 
//                   className={clsx(
//                     "bg-card rounded-2xl p-5 border shadow-sm flex flex-col md:flex-row items-center gap-6 relative overflow-hidden transition-colors", 
//                     status === 'done' ? "border-green-200 bg-green-50/10" : "border-border"
//                   )}
//                 >
//                   <div className="flex-1 min-w-0 w-full relative z-10">
//                     <div className="flex items-center gap-3 mb-2">
//                       <h4 className="font-bold text-md">{job.id}</h4>
//                       {status === 'done' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
//                     </div>
//                     <div className="flex flex-wrap gap-1.5">
//                       {job.files.map((f, i) => (
//                         <span key={i} className="px-2 py-0.5 rounded text-[9px] truncate max-w-[100px] bg-muted text-muted-foreground">
//                           {f.name}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="flex gap-2 w-full md:w-auto relative z-10">
//                     <Button 
//                       onClick={() => handleUploadBatch(job)} 
//                       disabled={status === 'uploaded' || job.isUploaded || isUploading || status === 'uploading'} 
//                       variant={(status === 'uploaded' || job.isUploaded) ? "secondary" : "outline"} 
//                       size="sm" 
//                       className="rounded-xl h-9 text-xs"
//                     >
//                       {status === 'uploading' ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : (status === 'uploaded' || job.isUploaded ? "Ready" : "Upload")}
//                     </Button>
//                     <Button 
//                       onClick={() => startBatchProcessing(job)} 
//                       disabled={!canAnalyze} 
//                       size="sm" 
//                       className={clsx(
//                         "rounded-xl h-9 text-xs", 
//                         status === 'done' ? "bg-green-600 hover:bg-green-700" : "bg-primary hover:bg-primary/90"
//                       )}
//                     >
//                       {status === 'processing' ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : "Analyze AI"}
//                     </Button>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </AnimatePresence>
//         </div>
//       </div>

//       <AnimatePresence>
//         {processing.isProcessing && (
//           <motion.div 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             exit={{ opacity: 0 }} 
//             className="fixed inset-0 bg-white z-[100] flex items-center justify-center p-6 select-none touch-none"
//             onPointerDown={(e) => e.stopPropagation()}
//           >
//             <div className="max-w-md w-full space-y-8 text-center bg-white p-12 rounded-3xl border border-border shadow-none">
//               <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto" />
//               <div className="space-y-4">
//                 <h3 className="text-2xl font-bold text-primary uppercase tracking-tight">{statusMessages[currentMessageIndex]}</h3>
//                 <div className="h-2 bg-muted rounded-full overflow-hidden">
//                   <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${processing.progress}%` }} />
//                 </div>
//                 <p className="text-sm text-muted-foreground font-medium">Analyzing {processing.batchId}...</p>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//         </TabsContent>

//         <TabsContent value="results">
//           <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold font-display">Analysis Results</h1>
//           <p className="text-muted-foreground mt-1">{isRanked ? `Ranked ${results.length} candidates by relevance score (0-100).` : `Analyzed ${results.length} CVs. Click RANK to sort by score.`}</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => {
//               try {
//                 handleRank();
//               } catch (error) {
//                 console.error("Ranking error:", error);
//               }
//             }}
//             disabled={isRanking || results.length === 0}
//             className={clsx(
//               "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
//               isRanked 
//                 ? "bg-blue-600 text-white hover:bg-blue-700" 
//                 : "bg-green-600 text-white hover:bg-green-700",
//               "disabled:opacity-50"
//             )}
//           >
//             {isRanking ? "Ranking..." : isRanked ? "✓ RANKED" : "RANK NOW"}
//           </button>
//           <button
//             onClick={() => generatePDF(results)}
//             className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
//           >
//             <FileText className="w-4 h-4" />
//             Export Report
//           </button>
//           <Link href="/" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
//             <ArrowLeft className="w-4 h-4" />
//             Modify Filters
//           </Link>
//         </div>
//       </div>

//       {/* Table View for Desktop */}
//       <div className="hidden lg:block bg-card rounded-lg border border-border overflow-x-auto shadow-sm">
//         <table className="w-full min-w-[1200px]">
//           <thead className="bg-muted/50 border-b border-border">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">SR.NO</th>
//               <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Score (/100)</th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Name</th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Email</th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Location</th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Degree</th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Experience</th>
//               <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">GPA</th>
//               <th className="px-6 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Report</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-border">
//             {results.map((item, index) => {
//               const extracted = item.analysis.extractedData;
//               const score = item.analysis.score;
//               const isLocked = (item.analysis).locked;
//               const scoreColor = score >= 80 ? "text-green-600" : score >= 60 ? "text-yellow-600" : "text-red-600";
              
//               return (
//                 <motion.tr
//                   key={`${item.cv.id}-${index}`}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: index * 0.03 }}
//                   onClick={() => !isLocked && setExpandedId(expandedId === item.cv.id ? null : item.cv.id)}
//                   className={clsx(
//                     "transition-colors",
//                     isLocked ? "bg-muted/20 opacity-75 cursor-not-allowed" : "hover:bg-muted/30 cursor-pointer"
//                   )}
//                 >
//                   <td className="px-6 py-4 text-sm font-semibold text-primary">{index + 1}</td>
//                   <td className={clsx("px-6 py-4 text-right text-sm font-bold", scoreColor)}>
//                     <div className="flex items-center justify-end gap-2">
//                       <Star className="w-4 h-4 fill-current" />
//                       {score}/100
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">{extracted?.name || item.cv.filename}</td>
//                   <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">{extracted?.email || "N/A"}</td>
//                   <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">{extracted?.location || "N/A"}</td>
//                   <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">{extracted?.degree || "N/A"}</td>
//                   <td className="px-6 py-4 text-sm text-muted-foreground min-w-[200px]">
//                     <div className="space-y-1">
//                       <p className="text-xs font-semibold text-primary">Experience Breakdown</p>
//                       <p className="text-xs">Professional Job: {extracted?.experience?.relative?.professionalJob || "0 months"}</p>
//                       <p className="text-xs">Internship: {extracted?.experience?.relative?.internship || "0 months"}</p>
//                       <p className="text-xs">Freelancing: {extracted?.experience?.relative?.freelancing || "0 months"}</p>
//                       <p className="text-xs font-semibold text-accent mt-1">Miscellaneous: {extracted?.experience?.miscellaneous || "0 months"}</p>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-muted-foreground">{extracted?.gpa || 0}</td>
//                   <td className="px-6 py-4 text-center">
//                     <div className="flex items-center justify-center gap-2">
//                       {isLocked && <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">LOCKED</span>}
//                       <button
//                         onClick={() => openModal(item)}
//                         className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors"
//                       >
//                         <Eye className="w-4 h-4" />
//                         View Report
//                       </button>
//                     </div>
//                   </td>
//                 </motion.tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Card View for Mobile */}
//       <div className="lg:hidden space-y-4">
//         {results.map((item, index) => {
//           const isExpanded = expandedId === item.cv.id;
//           const score = item.analysis.score;
//           const scoreColor = score >= 80 ? "text-green-600 bg-green-500/10 border-green-500/20" : 
//                              score >= 60 ? "text-yellow-600 bg-yellow-500/10 border-yellow-500/20" :
//                              "text-red-600 bg-red-500/10 border-red-500/20";
          
//           const extracted = item.analysis.extractedData;
//           const totalRelative = (extracted?.experience?.relative?.professionalJob || 0) + 
//                                (extracted?.experience?.relative?.internship || 0) + 
//                                (extracted?.experience?.relative?.freelancing || 0);

//           return (
//             <motion.div
//               key={`${item.cv.id}-${index}`}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.05 }}
//               className={clsx(
//                 "bg-card rounded-xl border transition-all duration-300 overflow-hidden",
//                 isExpanded ? "ring-2 ring-primary/10 border-primary shadow-lg" : "border-border hover:border-primary/50"
//               )}
//             >
//               <div 
//                 className="p-6 cursor-pointer flex items-center gap-6"
//                 onClick={() => toggleExpand(item.cv.id)}
//               >
//                 {/* Rank Badge - Only show when ranked */}
//                 {isRanked && (
//                   <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center">
//                     <span className="font-display font-bold text-xl text-primary">{index + 1}</span>
//                   </div>
//                 )}

//                 {/* Main Info */}
//                 <div className="flex-1 min-w-0">
//                   <h3 className="text-lg font-bold truncate">{extracted?.name || item.cv.filename}</h3>
//                   <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
//                     <span className="flex items-center gap-1">
//                       <ExternalLink className="w-3 h-3" />
//                       {extracted?.email || "No email"}
//                     </span>
//                     <span className="hidden md:inline text-border">|</span>
//                     <span className="hidden md:inline">{extracted?.location || "Location N/A"}</span>
//                   </div>
//                 </div>

//                 {/* Key Stats (Desktop) */}
//                 <div className="hidden md:flex items-center gap-8 text-sm">
//                   <div className="text-right">
//                     <p className="text-muted-foreground text-xs">Exp (Relative)</p>
//                     <p className="font-medium">{(extracted?.experience?.relative?.professionalJob || "0 months")}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-muted-foreground text-xs">GPA</p>
//                     <p className="font-medium">{extracted?.gpa || "N/A"}</p>
//                   </div>
//                 </div>

//                 {/* Score */}
//                 <div className={clsx("flex-shrink-0 px-4 py-2 rounded-lg border font-bold text-lg flex items-center gap-2", scoreColor)}>
//                   <Star className={clsx("w-5 h-5 fill-current", score < 60 && "opacity-50")} />
//                   {score}%
//                 </div>

//                 <div className="text-muted-foreground">
//                   {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
//                 </div>
//               </div>

//               <AnimatePresence>
//                 {isExpanded && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     className="border-t border-border/50 bg-muted/30"
//                   >
//                     <div className="p-6 grid md:grid-cols-2 gap-8">
//                       <div>
//                         <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">AI Analysis</h4>
//                         <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">
//                           {item.analysis.matchDetails}
//                         </p>
                        
//                         <div className="mt-6">
//                            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Detected Skills</h4>
//                            <div className="flex flex-wrap gap-2">
//                              {extracted?.skills && (Array.isArray(extracted.skills) ? extracted.skills : extracted.skills.split(',')).map((skill, i) => (
//                                <span key={i} className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-border text-xs font-medium">
//                                  {String(skill).trim()}
//                                </span>
//                              )) || <span className="text-xs text-muted-foreground italic">No skills detected</span>}
//                            </div>
//                         </div>
//                       </div>

//                       <div className="space-y-6">
//                         <div className="bg-background rounded-lg p-4 border border-border space-y-4">
//                           <div>
//                             <h4 className="font-semibold text-sm mb-3">Candidate Details</h4>
//                             <dl className="grid grid-cols-[100px_1fr] gap-y-2 text-sm">
//                               <dt className="text-muted-foreground">Degree:</dt>
//                               <dd className="font-medium">{extracted?.degree || "Not specified"}</dd>
//                               <dt className="text-muted-foreground">University:</dt>
//                               <dd className="font-medium">{extracted?.university || "Not specified"}</dd>
//                               <dt className="text-muted-foreground">Phone:</dt>
//                               <dd className="font-medium">{extracted?.phone || "Not specified"}</dd>
//                             </dl>
//                           </div>
                          
//                           <div className="border-t border-border/50 pt-4">
//                             <h4 className="font-semibold text-sm mb-2">Experience Breakdown</h4>
//                             <div className="text-xs space-y-1">
//                               <p className="font-semibold text-primary mb-2">Domain-Related</p>
//                               <p>• Professional: {extracted?.experience?.relative?.professionalJob || 0}y</p>
//                               <p>• Internship: {extracted?.experience?.relative?.internship || 0}y</p>
//                               <p>• Freelancing: {extracted?.experience?.relative?.freelancing || 0}y</p>
//                               <p className="font-semibold text-accent mt-2">Miscellaneous: {extracted?.experience?.miscellaneous || 0}y</p>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="flex justify-end">
//                            <button className="flex items-center gap-2 text-primary text-sm font-semibold hover:underline">
//                              <Download className="w-4 h-4" />
//                              Download Full Report
//                            </button>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* Report Modal */}
//       <AnimatePresence>
//         {modalOpen && selectedResult && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-background flex items-center justify-center p-4 z-50"
//             onClick={() => setModalOpen(false)}
//           >
//             <motion.div
//               initial={{ scale: 0.95, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.95, opacity: 0 }}
//               onClick={(e) => e.stopPropagation()}
//               className="bg-card rounded-2xl border border-border max-w-2xl w-full max-h-[80vh] overflow-y-auto"
//             >
           

//               <div className="p-6 space-y-8">
//                 {/* Header */}
//                 <div className="space-y-2">
//                   <h3 className="text-xl font-bold text-foreground">{(selectedResult.analysis.extractedData)?.name || selectedResult.cv.filename}</h3>
//                   <p className="text-muted-foreground text-sm">File: {selectedResult.cv.filename}</p>
//                 </div>

//                 {/* Score Section */}
//                 <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-muted-foreground mb-2">Matching Score</p>
//                       <p className="text-4xl font-bold text-primary">{selectedResult.analysis.score}/100</p>
//                     </div>
//                     <Star className="w-16 h-16 text-primary fill-primary opacity-20" />
//                   </div>
//                 </div>

//                 {/* AI Analysis */}
//                 <div className="space-y-3">
//                   <h4 className="text-sm uppercase font-semibold text-muted-foreground tracking-wider">AI Analysis</h4>
//                   <p className="text-base text-foreground leading-relaxed">{selectedResult.analysis.matchDetails}</p>
//                 </div>

//                 {/* Skills */}
//                 <div className="space-y-3">
//                   <h4 className="text-sm uppercase font-semibold text-muted-foreground tracking-wider">Detected Skills</h4>
//                   <div className="flex flex-wrap gap-2">
//                     {((selectedResult.analysis.extractedData)?.skills || []).map((skill, i) => (
//                       <span key={i} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium">
//                         {String(skill).trim()}
//                       </span>
//                     )) || <p className="text-sm text-muted-foreground italic">No skills detected</p>}
//                   </div>
//                 </div>

//                 {/* Candidate Details */}
//                 <div className="bg-muted/50 rounded-xl p-6 space-y-4">
//                   <h4 className="text-sm uppercase font-semibold text-muted-foreground tracking-wider">Candidate Details</h4>
//                   <dl className="grid grid-cols-2 gap-6">
//                     <div>
//                       <dt className="text-xs text-muted-foreground mb-1">Name</dt>
//                       <dd className="font-semibold">{(selectedResult.analysis.extractedData)?.name || "N/A"}</dd>
//                     </div>
//                     <div>
//                       <dt className="text-xs text-muted-foreground mb-1">Email</dt>
//                       <dd className="font-semibold">{(selectedResult.analysis.extractedData)?.email || "N/A"}</dd>
//                     </div>
//                     <div>
//                       <dt className="text-xs text-muted-foreground mb-1">Phone</dt>
//                       <dd className="font-semibold">{(selectedResult.analysis.extractedData)?.phone || "N/A"}</dd>
//                     </div>
//                     <div>
//                       <dt className="text-xs text-muted-foreground mb-1">Location</dt>
//                       <dd className="font-semibold">{(selectedResult.analysis.extractedData)?.location || "N/A"}</dd>
//                     </div>
//                     <div className="col-span-2">
//                       <dt className="text-xs text-muted-foreground mb-3">Experience Breakdown</dt>
//                       <dd className="space-y-2">
//                         <div className="bg-background rounded-lg p-3 space-y-2">
//                           <p className="text-xs font-semibold text-primary">Domain-Related Experience</p>
//                           <div className="text-xs space-y-1">
//                             <p>• Professional Job: {(selectedResult.analysis.extractedData)?.experience?.relative?.professionalJob || "0 months"}</p>
//                             <p>• Internship: {(selectedResult.analysis.extractedData)?.experience?.relative?.internship || "0 months"}</p>
//                             <p>• Freelancing: {(selectedResult.analysis.extractedData)?.experience?.relative?.freelancing || "0 months"}</p>
//                           </div>
//                         </div>
//                         <div className="bg-background rounded-lg p-3">
//                           <p className="text-xs font-semibold text-accent">Miscellaneous Experience: {(selectedResult.analysis.extractedData)?.experience?.miscellaneous || "0 months"}</p>
//                         </div>
//                       </dd>
//                     </div>
//                     <div>
//                       <dt className="text-xs text-muted-foreground mb-1">GPA</dt>
//                       <dd className="font-semibold">{(selectedResult.analysis.extractedData)?.gpa || 0}</dd>
//                     </div>
//                     <div className="col-span-2">
//                       <dt className="text-xs text-muted-foreground mb-1">Degree</dt>
//                       <dd className="font-semibold">{(selectedResult.analysis.extractedData)?.degree || "N/A"}</dd>
//                     </div>
//                     <div className="col-span-2">
//                       <dt className="text-xs text-muted-foreground mb-1">University</dt>
//                       <dd className="font-semibold">{(selectedResult.analysis.extractedData)?.university || "N/A"}</dd>
//                     </div>
//                   </dl>
//                 </div>

//                 {/* Close Button */}
//                 <div className="flex justify-end pt-4 border-t border-border">
//                   <button
//                     onClick={() => setModalOpen(false)}
//                     className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
//                   >
//                     Close Report
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }













"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import jsPDF from "jspdf";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// UI Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

// Icons
import {
  ChevronDown,
  ChevronUp,
  Star,
  Download,
  ExternalLink,
  ArrowLeft,
  Eye,
  FileText,
  Clock,
  Briefcase,
  GraduationCap,
  MapPin,
  Award,
  Zap,
  Settings,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";

// Hooks & Storage
import { useToast } from "@/hooks/use-toast";
import { useUploadCvs, useAnalyzeCvs } from "@/hooks/use-cvs";
import { analysisStorage } from "@/lib/storage";
import { fileStore } from "@/lib/idb-store";

// Components
import { FileUploader } from "@/components/FileUploader";

// Schema
import { filterCriteriaSchema } from "@/shared/schema";

// ============================================
// PDF Generation Function
// ============================================
const generatePDF = (results) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const primaryColor = [59, 130, 246]; // Blue
  const accentColor = [100, 116, 139]; // Slate
  const darkText = [15, 23, 42]; // Dark slate
  const lightText = [100, 116, 139]; // Gray

  let yPosition = 20;
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = 180;

  // Header
  doc.setTextColor(...primaryColor);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("CV INSIGHT ENGINE", margin, yPosition);

  yPosition += 10;
  doc.setTextColor(...lightText);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Analysis Results Report", margin, yPosition);

  // Summary line
  yPosition += 12;
  doc.setTextColor(...accentColor);
  doc.setFontSize(10);
  doc.text(
    `Generated: ${new Date().toLocaleDateString()} | Total Candidates: ${results.length}`,
    margin,
    yPosition
  );

  // Line separator
  yPosition += 5;
  doc.setDrawColor(...primaryColor);
  doc.line(margin, yPosition, margin + contentWidth, yPosition);

  yPosition += 10;

  // Results
  results.forEach((item, idx) => {
    const extracted = item.analysis.extractedData;
    const score = item.analysis.score;

    // Check if we need a new page
    if (yPosition > pageHeight - 50) {
      doc.addPage();
      yPosition = 20;
    }

    // Rank and score header
    doc.setTextColor(...darkText);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text(`${idx + 1}. ${extracted?.name || item.cv.filename}`, margin, yPosition);

    // Score badge
    const scoreColor =
      score >= 80 ? [22, 163, 74] : score >= 60 ? [202, 138, 4] : [220, 38, 38];
    doc.setTextColor(...scoreColor);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(`${score}/100`, margin + contentWidth - 15, yPosition);

    yPosition += 8;

    // Table structure
    doc.setTextColor(...darkText);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");

    const tableData = [
      ["Email", extracted?.email || "N/A"],
      ["Location", extracted?.location || "N/A"],
      ["Degree", extracted?.degree || "N/A"],
      ["GPA", extracted?.gpa || "N/A"],
    ];

    const colWidths = [40, 125];
    let tableY = yPosition;

    tableData.forEach(([label, value]) => {
      if (tableData.indexOf([label, value]) % 2 === 0) {
        doc.setFillColor(245, 248, 252);
        doc.rect(margin, tableY - 4, contentWidth, 6, "F");
      }

      doc.setTextColor(...darkText);
      doc.setFont("helvetica", "bold");
      doc.text(label, margin + 3, tableY);

      doc.setTextColor(...lightText);
      doc.setFont("helvetica", "normal");
      doc.text(String(value), margin + colWidths[0] + 3, tableY);

      tableY += 7;
    });

    yPosition = tableY + 3;

    // Experience breakdown
    doc.setTextColor(...darkText);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Experience Breakdown", margin, yPosition);
    yPosition += 6;

    // Relative Experience
    doc.setTextColor(...primaryColor);
    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Domain-Related (Relative)", margin + 3, yPosition);
    yPosition += 4;

    doc.setTextColor(...lightText);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    const profJob = extracted?.experience?.relative?.professionalJob || 0;
    const internship = extracted?.experience?.relative?.internship || 0;
    const freelance = extracted?.experience?.relative?.freelancing || 0;

    doc.text(`• Professional Job: ${profJob} years`, margin + 6, yPosition);
    yPosition += 4;
    doc.text(`• Internship: ${internship} years`, margin + 6, yPosition);
    yPosition += 4;
    doc.text(`• Freelancing: ${freelance} years`, margin + 6, yPosition);
    yPosition += 5;

    // Other Experience
    doc.setTextColor(...primaryColor);
    doc.setFont("helvetica", "bold");
    doc.text("Other", margin + 3, yPosition);
    yPosition += 4;

    doc.setTextColor(...lightText);
    doc.setFont("helvetica", "normal");
    const misc = extracted?.experience?.miscellaneous || 0;
    doc.text(`• Miscellaneous: ${misc} years`, margin + 6, yPosition);
    yPosition += 6;

    // Separator
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, yPosition, margin + contentWidth, yPosition);

    yPosition += 8;
  });

  doc.save("CV_Analysis_Report.pdf");
};

// ============================================
// Criteria Filter Component
// ============================================
function CriteriaFilter() {
  const form = useForm({
    resolver: zodResolver(filterCriteriaSchema),
    defaultValues: {
      minGpa: 3.0,
      minExperience: 1,
    },
  });

  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const savedCriteria = analysisStorage.getCriteria();
    if (savedCriteria) {
      form.reset(savedCriteria);
      setIsLocked(true);
    }
  }, [form]);

  const handleReset = () => {
    if (
      confirm(
        "WARNING: This will purge all your old records and reset the session. Continue?"
      )
    ) {
      analysisStorage.clearCriteria();
      analysisStorage.clearResults();
      form.reset({
        jobDescription: "",
        requiredSkills: "",
        location: "",
        minGpa: 3.0,
        minExperience: 1,
        degree: "",
        degreeCompletionYear: 2024,
      });
      setIsLocked(false);
      window.location.reload();
    }
  };

  const onSubmit = (data) => {
    analysisStorage.saveCriteria(data);
    setIsLocked(true);
    toast({
      title: "Criteria Locked",
      description: "You can now proceed to upload and process CVs with these settings.",
    });
    setTimeout(() => {
      setLocation("/upload");
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold font-display">Criteria Filter</h1>
          <p className="text-muted-foreground mt-1">
            Set recruitment criteria for this session. Locked for consistency.
          </p>
        </div>
        {isLocked && (
          <Button
            variant="outline"
            onClick={handleReset}
            className="text-destructive border-destructive hover:bg-destructive/10 gap-2"
          >
            <AlertCircle className="w-4 h-4" />
            Reset All & Purge
          </Button>
        )}
      </motion.div>

      <div
        className={clsx(
          "transition-all duration-500",
          isLocked && "opacity-75 pointer-events-none"
        )}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-card rounded-2xl p-8 border border-border shadow-sm space-y-8">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="jobDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-primary" />
                        Job Description / Key Focus
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="e.g. Senior React Developer with focus on performance..."
                          className="min-h-[120px] rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="requiredSkills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-accent" />
                          Technologies (Required Skills)
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="React, Node.js, TypeScript"
                            className="rounded-xl h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-green-500" />
                          Job Location
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="e.g., Remote, Islamabad"
                            className="rounded-xl h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="minGpa"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-500" />
                          Academic Merit (Min GPA)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.1"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            className="rounded-xl h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="minExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-blue-500" />
                          Experience (Min Years)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.5"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                            className="rounded-xl h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="degreeCompletionYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-purple-500" />
                          Graduation Year
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min="1950"
                            max="2099"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                            className="rounded-xl h-12"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-purple-500" />
                        Education (Degree Requirement)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Bachelor's in Computer Science, Master's, etc."
                          className="rounded-xl h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {!isLocked && (
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="px-10 rounded-xl font-bold bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                  >
                    Lock & Proceed
                  </Button>
                </div>
              )}
            </div>
          </form>
        </Form>
      </div>

      {isLocked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4 shadow-sm"
        >
          <div className="p-3 bg-blue-100 rounded-xl">
            <Settings className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-lg font-bold text-blue-900">Criteria is Locked</p>
            <p className="text-sm text-blue-700 leading-relaxed">
              This ensures fair and consistent scoring for all candidates in this recruitment
              session. To change settings, you must reset the session, which will{" "}
              <span className="font-bold underline">purge all current results</span>.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// ============================================
// Upload Component
// ============================================
function UploadComponent() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [restoredFileMetadata, setRestoredFileMetadata] = useState([]);
  const { mutateAsync: upload, isPending: isUploading } = useUploadCvs();
  const { mutate: analyze } = useAnalyzeCvs();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [isCriteriaLocked, setIsCriteriaLocked] = useState(false);
  const [batchStatus, setBatchStatus] = useState({});

  const [processing, setProcessing] = useState({
    isProcessing: false,
    currentFile: "",
    progress: 0,
    completedFiles: [],
    batchId: null,
  });

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const BATCH_SIZE = 10;

  const statusMessages = [
    "Reading the resumes...",
    "Extracting key skills and experience...",
    "Scoring candidates based on your rules...",
    "Comparing degrees and locations...",
    "Finalizing the rank list...",
    "Almost there, polishing results...",
  ];

  useEffect(() => {
    const criteria = analysisStorage.getCriteria();
    setIsCriteriaLocked(!!criteria);

    const savedMetadata = analysisStorage.getSelectedFilesMetadata();
    if (savedMetadata.length > 0) {
      setRestoredFileMetadata(savedMetadata);
    }
    const savedStatus = analysisStorage.getBatchStatus();
    if (Object.keys(savedStatus).length > 0) {
      setBatchStatus(savedStatus);
    }

    const restoreFiles = async () => {
      try {
        const files = await fileStore.getAllFiles();
        if (files.length > 0) {
          setSelectedFiles(files);
        }
      } catch (err) {
        console.error("Failed to restore files from IndexedDB:", err);
      }
    };
    restoreFiles();
  }, []);

  useEffect(() => {
    let msgInterval;
    if (processing.isProcessing) {
      msgInterval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % statusMessages.length);
      }, 3000);
    }
    return () => clearInterval(msgInterval);
  }, [processing.isProcessing, statusMessages.length]);

  const handleFilesSelected = async (files) => {
    const updatedFiles = [...selectedFiles, ...files];
    setSelectedFiles(updatedFiles);

    const metadata = updatedFiles.map((f) => ({ name: f.name, size: f.size, type: f.type }));
    analysisStorage.saveSelectedFilesMetadata(metadata);

    try {
      await fileStore.saveFiles(files);
    } catch (err) {
      console.error("Failed to save files to IndexedDB:", err);
      toast({
        variant: "destructive",
        title: "Persistence Error",
        description: "Could not save files for cross-tab sessions.",
      });
    }
  };

  const batches = useMemo(() => {
    const jobs = [];
    const uploadedCvs = analysisStorage.getUploadedCvs() || [];
    const results = analysisStorage.getResults() || [];

    const filesToUse =
      selectedFiles.length > 0
        ? selectedFiles
        : restoredFileMetadata.map((m) => new File([], m.name, { type: m.type }));

    for (let i = 0; i < filesToUse.length; i += BATCH_SIZE) {
      const batchFiles = filesToUse.slice(i, i + BATCH_SIZE);
      const batchId = `Batch-${Math.floor(i / BATCH_SIZE) + 1}`;

      const isUploaded = batchFiles.every((f) =>
        uploadedCvs.some((cv) => cv.filename === f.name)
      );
      const isProcessed = batchFiles.every((f) =>
        results.some((r) => r.cv.filename === f.name)
      );

      jobs.push({
        id: batchId,
        files: batchFiles,
        isUploaded,
        isProcessed,
      });
    }
    return jobs;
  }, [selectedFiles, restoredFileMetadata, batchStatus]);

  const updateBatchStatus = (id, status) => {
    setBatchStatus((prev) => {
      const next = { ...prev, [id]: status };
      analysisStorage.saveBatchStatus(next);
      return next;
    });
  };

  const handleUploadBatch = async (job) => {
    if (job.files.some((f) => f.size === 0 && !selectedFiles.find((sf) => sf.name === f.name))) {
      toast({
        variant: "destructive",
        title: "Files not in memory",
        description: "Please re-select files to upload.",
      });
      return;
    }
    try {
      updateBatchStatus(job.id, "uploading");
      const data = await upload(job.files);
      const currentUploaded = analysisStorage.getUploadedCvs() || [];
      analysisStorage.saveUploadedCvs([...currentUploaded, ...data]);
      updateBatchStatus(job.id, "uploaded");
      toast({ title: `${job.id} Uploaded`, description: "Batch uploaded successfully." });
    } catch (error) {
      updateBatchStatus(job.id, "idle");
      toast({ variant: "destructive", title: "Upload Failed" });
    }
  };

  const startBatchProcessing = (job) => {
    const criteria = analysisStorage.getCriteria();
    if (!criteria) {
      toast({ title: "Rules Missing", variant: "destructive" });
      setLocation("/");
      return;
    }

    updateBatchStatus(job.id, "processing");
    setProcessing((prev) => ({ ...prev, isProcessing: true, batchId: job.id, progress: 0 }));

    const interval = setInterval(() => {
      setProcessing((prev) => {
        if (prev.progress >= 95) return prev;
        return { ...prev, progress: prev.progress + 2 };
      });
    }, 300);

    analyze(criteria, {
      onSuccess: (results) => {
        clearInterval(interval);
        const previous = analysisStorage.getResults() || [];
        const updatedResults = [...previous, ...results];
        analysisStorage.saveResults(updatedResults);
        updateBatchStatus(job.id, "done");

        setProcessing((prev) => ({
          ...prev,
          isProcessing: false,
          batchId: null,
          progress: 100,
        }));
        toast({
          title: "AI Analysis Complete",
          description: "Results are ready in the results section.",
          action: (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLocation("/results")}
            >
              View Results
            </Button>
          ),
        });
      },
      onError: () => {
        clearInterval(interval);
        updateBatchStatus(job.id, "uploaded");
        setProcessing((prev) => ({
          ...prev,
          isProcessing: false,
          batchId: null,
          progress: 0,
        }));
        toast({
          variant: "destructive",
          title: "AI Error",
          description: "Something went wrong during analysis.",
        });
      },
    });
  };

  if (!isCriteriaLocked) {
    return (
      <div className="max-w-2xl mx-auto text-center space-y-8 pt-20">
        <div className="p-10 bg-card rounded-3xl border border-dashed border-primary/30 space-y-6">
          <Clock className="w-16 h-16 text-primary mx-auto animate-pulse" />
          <h2 className="text-2xl font-bold">Rules Required</h2>
          <Button onClick={() => setLocation("/")} size="lg" className="rounded-xl px-10">
            Set Filter Rules
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 mb-10"
      >
        <h1 className="text-3xl font-bold font-display">TaaS Bulk Engine</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Cater your candidate in Bulk. High-speed analysis Fast & Smart.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-card rounded-3xl p-6 border border-border shadow-sm sticky top-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              Capture Files
            </h3>
            <FileUploader
              onFilesSelected={handleFilesSelected}
              isUploading={isUploading}
              uploadProgress={{}}
            />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence mode="popLayout">
            {batches.map((job) => {
              const status =
                batchStatus[job.id] ||
                (job.isProcessed ? "done" : job.isUploaded ? "uploaded" : "idle");
              const canAnalyze =
                (status === "uploaded" || job.isUploaded) &&
                !job.isProcessed &&
                !processing.isProcessing;

              return (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={clsx(
                    "bg-card rounded-2xl p-5 border shadow-sm flex flex-col md:flex-row items-center gap-6 relative overflow-hidden transition-colors",
                    status === "done" ? "border-green-200 bg-green-50/10" : "border-border"
                  )}
                >
                  <div className="flex-1 min-w-0 w-full relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-md">{job.id}</h4>
                      {status === "done" && (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.files.map((f, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[9px] truncate max-w-[100px] bg-muted text-muted-foreground"
                        >
                          {f.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto relative z-10">
                    <Button
                      onClick={() => handleUploadBatch(job)}
                      disabled={
                        status === "uploaded" || job.isUploaded || isUploading || status === "uploading"
                      }
                      variant={status === "uploaded" || job.isUploaded ? "secondary" : "outline"}
                      size="sm"
                      className="rounded-xl h-9 text-xs"
                    >
                      {status === "uploading" ? (
                        <Loader2 className="w-3 h-3 animate-spin mr-1" />
                      ) : status === "uploaded" || job.isUploaded ? (
                        "Ready"
                      ) : (
                        "Upload"
                      )}
                    </Button>
                    <Button
                      onClick={() => startBatchProcessing(job)}
                      disabled={!canAnalyze}
                      size="sm"
                      className={clsx(
                        "rounded-xl h-9 text-xs",
                        status === "done"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-primary hover:bg-primary/90"
                      )}
                    >
                      {status === "processing" ? (
                        <Loader2 className="w-3 h-3 animate-spin mr-1" />
                      ) : (
                        "Analyze AI"
                      )}
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {processing.isProcessing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[100] flex items-center justify-center p-6 select-none touch-none"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div className="max-w-md w-full space-y-8 text-center bg-white p-12 rounded-3xl border border-border shadow-none">
              <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto" />
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary uppercase tracking-tight">
                  {statusMessages[currentMessageIndex]}
                </h3>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${processing.progress}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  Analyzing {processing.batchId}...
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// Results Component
// ============================================
function ResultsComponent() {
  const [results, setResults] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [, setLocation] = useLocation();
  const [isRanked, setIsRanked] = useState(false);
  const [isRanking, setIsRanking] = useState(false);

  const openModal = (result) => {
    setSelectedResult(result);
    setModalOpen(true);
  };

  const handleRank = () => {
    const ranked = [...results].sort((a, b) => {
      if (b.analysis.score === a.analysis.score) {
        return a.analysis.locked ? -1 : 1;
      }
      return b.analysis.score - a.analysis.score;
    });
    setResults(ranked);
    setIsRanked(true);
    analysisStorage.saveResults(ranked);
  };

  useEffect(() => {
    const stored = analysisStorage.getResults();
    if (stored && stored.length > 0) {
      setResults(stored);
      setIsRanked(false);
      console.log(`✅ Loaded ${stored.length} results from storage`);
    } else {
      console.log("No analysis results found, redirecting to upload");
      setLocation("/upload");
    }

    const unsubscribe = analysisStorage.onResultsChange((newResults) => {
      if (newResults && newResults.length > 0) {
        console.log("📡 Syncing results from another tab");
        setResults(newResults);
        setIsRanked(false);
      }
    });

    return () => unsubscribe();
  }, [setLocation]);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (results.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display">Analysis Results</h1>
          <p className="text-muted-foreground mt-1">
            {isRanked
              ? `Ranked ${results.length} candidates by relevance score (0-100).`
              : `Analyzed ${results.length} CVs. Click RANK to sort by score.`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              try {
                handleRank();
              } catch (error) {
                console.error("Ranking error:", error);
              }
            }}
            disabled={isRanking || results.length === 0}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
              isRanked
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-green-600 text-white hover:bg-green-700",
              "disabled:opacity-50"
            )}
          >
            {isRanking ? "Ranking..." : isRanked ? "✓ RANKED" : "RANK NOW"}
          </button>
          <button
            onClick={() => generatePDF(results)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Export Report
          </button>
          <button
            onClick={() => setLocation("/")}
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" />
            Modify Filters
          </button>
        </div>
      </div>

      {/* Table View for Desktop */}
      <div className="hidden lg:block bg-card rounded-lg border border-border overflow-x-auto shadow-sm">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                SR.NO
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                Score (/100)
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                Degree
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                Experience
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                GPA
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                Report
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {results.map((item, index) => {
              const extracted = item.analysis.extractedData;
              const score = item.analysis.score;
              const isLocked = item.analysis.locked;
              const scoreColor =
                score >= 80
                  ? "text-green-600"
                  : score >= 60
                    ? "text-yellow-600"
                    : "text-red-600";

              return (
                <motion.tr
                  key={`${item.cv.id}-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() =>
                    !isLocked && setExpandedId(expandedId === item.cv.id ? null : item.cv.id)
                  }
                  className={clsx(
                    "transition-colors",
                    isLocked
                      ? "bg-muted/20 opacity-75 cursor-not-allowed"
                      : "hover:bg-muted/30 cursor-pointer"
                  )}
                >
                  <td className="px-6 py-4 text-sm font-semibold text-primary">{index + 1}</td>
                  <td className={clsx("px-6 py-4 text-right text-sm font-bold", scoreColor)}>
                    <div className="flex items-center justify-end gap-2">
                      <Star className="w-4 h-4 fill-current" />
                      {score}/100
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                    {extracted?.name || item.cv.filename}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                    {extracted?.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                    {extracted?.location || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground whitespace-nowrap">
                    {extracted?.degree || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground min-w-[200px]">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-primary">Experience Breakdown</p>
                      <p className="text-xs">
                        Professional Job: {extracted?.experience?.relative?.professionalJob || "0 months"}
                      </p>
                      <p className="text-xs">
                        Internship: {extracted?.experience?.relative?.internship || "0 months"}
                      </p>
                      <p className="text-xs">
                        Freelancing: {extracted?.experience?.relative?.freelancing || "0 months"}
                      </p>
                      <p className="text-xs font-semibold text-accent mt-1">
                        Miscellaneous: {extracted?.experience?.miscellaneous || "0 months"}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{extracted?.gpa || 0}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {isLocked && (
                        <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-1 rounded">
                          LOCKED
                        </span>
                      )}
                      <button
                        onClick={() => openModal(item)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View Report
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Card View for Mobile */}
      <div className="lg:hidden space-y-4">
        {results.map((item, index) => {
          const isExpanded = expandedId === item.cv.id;
          const score = item.analysis.score;
          const scoreColor =
            score >= 80
              ? "text-green-600 bg-green-500/10 border-green-500/20"
              : score >= 60
                ? "text-yellow-600 bg-yellow-500/10 border-yellow-500/20"
                : "text-red-600 bg-red-500/10 border-red-500/20";

          const extracted = item.analysis.extractedData;

          return (
            <motion.div
              key={`${item.cv.id}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={clsx(
                "bg-card rounded-xl border transition-all duration-300 overflow-hidden",
                isExpanded
                  ? "ring-2 ring-primary/10 border-primary shadow-lg"
                  : "border-border hover:border-primary/50"
              )}
            >
              <div
                className="p-6 cursor-pointer flex items-center gap-6"
                onClick={() => toggleExpand(item.cv.id)}
              >
                {isRanked && (
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/5 border border-primary/10 flex items-center justify-center">
                    <span className="font-display font-bold text-xl text-primary">{index + 1}</span>
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold truncate">
                    {extracted?.name || item.cv.filename}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" />
                      {extracted?.email || "No email"}
                    </span>
                    <span className="hidden md:inline text-border">|</span>
                    <span className="hidden md:inline">{extracted?.location || "Location N/A"}</span>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm">
                  <div className="text-right">
                    <p className="text-muted-foreground text-xs">Exp (Relative)</p>
                    <p className="font-medium">
                      {extracted?.experience?.relative?.professionalJob || "0 months"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground text-xs">GPA</p>
                    <p className="font-medium">{extracted?.gpa || "N/A"}</p>
                  </div>
                </div>

                <div
                  className={clsx(
                    "flex-shrink-0 px-4 py-2 rounded-lg border font-bold text-lg flex items-center gap-2",
                    scoreColor
                  )}
                >
                  <Star className={clsx("w-5 h-5 fill-current", score < 60 && "opacity-50")} />
                  {score}%
                </div>

                <div className="text-muted-foreground">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-border/50 bg-muted/30"
                  >
                    <div className="p-6 grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                          AI Analysis
                        </h4>
                        <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">
                          {item.analysis.matchDetails}
                        </p>

                        <div className="mt-6">
                          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                            Detected Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {extracted?.skills &&
                            (Array.isArray(extracted.skills)
                              ? extracted.skills
                              : extracted.skills.split(","
                              )
                            ).map((skill, i) => (
                              <span
                                key={i}
                                className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-border text-xs font-medium"
                              >
                                {String(skill).trim()}
                              </span>
                            )) || (
                              <span className="text-xs text-muted-foreground italic">
                                No skills detected
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-background rounded-lg p-4 border border-border space-y-4">
                          <div>
                            <h4 className="font-semibold text-sm mb-3">Candidate Details</h4>
                            <dl className="grid grid-cols-[100px_1fr] gap-y-2 text-sm">
                              <dt className="text-muted-foreground">Degree:</dt>
                              <dd className="font-medium">{extracted?.degree || "Not specified"}</dd>
                              <dt className="text-muted-foreground">University:</dt>
                              <dd className="font-medium">{extracted?.university || "Not specified"}</dd>
                              <dt className="text-muted-foreground">Phone:</dt>
                              <dd className="font-medium">{extracted?.phone || "Not specified"}</dd>
                            </dl>
                          </div>

                          <div className="border-t border-border/50 pt-4">
                            <h4 className="font-semibold text-sm mb-2">Experience Breakdown</h4>
                            <div className="text-xs space-y-1">
                              <p className="font-semibold text-primary mb-2">Domain-Related</p>
                              <p>• Professional: {extracted?.experience?.relative?.professionalJob || 0}y</p>
                              <p>• Internship: {extracted?.experience?.relative?.internship || 0}y</p>
                              <p>• Freelancing: {extracted?.experience?.relative?.freelancing || 0}y</p>
                              <p className="font-semibold text-accent mt-2">
                                Miscellaneous: {extracted?.experience?.miscellaneous || 0}y
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button className="flex items-center gap-2 text-primary text-sm font-semibold hover:underline">
                            <Download className="w-4 h-4" />
                            Download Full Report
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Report Modal */}
      <AnimatePresence>
        {modalOpen && selectedResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background flex items-center justify-center p-4 z-50"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl border border-border max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6 space-y-8">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {selectedResult.analysis.extractedData?.name || selectedResult.cv.filename}
                  </h3>
                  <p className="text-muted-foreground text-sm">File: {selectedResult.cv.filename}</p>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Matching Score</p>
                      <p className="text-4xl font-bold text-primary">
                        {selectedResult.analysis.score}/100
                      </p>
                    </div>
                    <Star className="w-16 h-16 text-primary fill-primary opacity-20" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm uppercase font-semibold text-muted-foreground tracking-wider">
                    AI Analysis
                  </h4>
                  <p className="text-base text-foreground leading-relaxed">
                    {selectedResult.analysis.matchDetails}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm uppercase font-semibold text-muted-foreground tracking-wider">
                    Detected Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(selectedResult.analysis.extractedData?.skills || []).map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium"
                      >
                        {String(skill).trim()}
                      </span>
                    )) || (
                      <p className="text-sm text-muted-foreground italic">No skills detected</p>
                    )}
                  </div>
                </div>

                <div className="bg-muted/50 rounded-xl p-6 space-y-4">
                  <h4 className="text-sm uppercase font-semibold text-muted-foreground tracking-wider">
                    Candidate Details
                  </h4>
                  <dl className="grid grid-cols-2 gap-6">
                    <div>
                      <dt className="text-xs text-muted-foreground mb-1">Name</dt>
                      <dd className="font-semibold">
                        {selectedResult.analysis.extractedData?.name || "N/A"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground mb-1">Email</dt>
                      <dd className="font-semibold">
                        {selectedResult.analysis.extractedData?.email || "N/A"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground mb-1">Phone</dt>
                      <dd className="font-semibold">
                        {selectedResult.analysis.extractedData?.phone || "N/A"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground mb-1">Location</dt>
                      <dd className="font-semibold">
                        {selectedResult.analysis.extractedData?.location || "N/A"}
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-xs text-muted-foreground mb-3">Experience Breakdown</dt>
                      <dd className="space-y-2">
                        <div className="bg-background rounded-lg p-3 space-y-2">
                          <p className="text-xs font-semibold text-primary">
                            Domain-Related Experience
                          </p>
                          <div className="text-xs space-y-1">
                            <p>
                              • Professional Job:{" "}
                              {selectedResult.analysis.extractedData?.experience?.relative
                                ?.professionalJob || "0 months"}
                            </p>
                            <p>
                              • Internship:{" "}
                              {selectedResult.analysis.extractedData?.experience?.relative
                                ?.internship || "0 months"}
                            </p>
                            <p>
                              • Freelancing:{" "}
                              {selectedResult.analysis.extractedData?.experience?.relative
                                ?.freelancing || "0 months"}
                            </p>
                          </div>
                        </div>
                        <div className="bg-background rounded-lg p-3">
                          <p className="text-xs font-semibold text-accent">
                            Miscellaneous Experience:{" "}
                            {selectedResult.analysis.extractedData?.experience?.miscellaneous ||
                              "0 months"}
                          </p>
                        </div>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-muted-foreground mb-1">GPA</dt>
                      <dd className="font-semibold">
                        {selectedResult.analysis.extractedData?.gpa || 0}
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-xs text-muted-foreground mb-1">Degree</dt>
                      <dd className="font-semibold">
                        {selectedResult.analysis.extractedData?.degree || "N/A"}
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-xs text-muted-foreground mb-1">University</dt>
                      <dd className="font-semibold">
                        {selectedResult.analysis.extractedData?.university || "N/A"}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="flex justify-end pt-4 border-t border-border">
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-6 py-2.5 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Close Report
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================
// Main BundleAnalyzer Component
// ============================================
export default function BundleAnalyzer() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Bundle Analyzer</h2>

      <Tabs defaultValue="criteria" className="w-full">
        <TabsList>
          <TabsTrigger value="criteria">Criteria Filter</TabsTrigger>
          <TabsTrigger value="upload">Upload and Process</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="criteria">
          <CriteriaFilter />
        </TabsContent>

        <TabsContent value="upload">
          <UploadComponent />
        </TabsContent>

        <TabsContent value="results">
          <ResultsComponent />
        </TabsContent>
      </Tabs>
    </div>
  );
}