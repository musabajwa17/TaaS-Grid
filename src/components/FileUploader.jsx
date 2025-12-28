import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, File, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB


export function FileUploader({ onFilesSelected, isUploading, uploadProgress }) {
  const [files, setFiles] = useState([]);
  const [sizeErrors, setSizeErrors] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const validFiles = [];
    const errors = [];

    acceptedFiles.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        const sizeMB = (file.size / 1024 / 1024).toFixed(2);
        errors.push(`${file.name}: ${sizeMB}MB (max 5MB)`);
      } else {
        validFiles.push(file);
      }
    });

    setSizeErrors(errors);
    const updatedFiles = [...files, ...validFiles];
    setFiles(updatedFiles);
    onFilesSelected(updatedFiles);
    
    console.log(`Files added: ${validFiles.length}, Rejected: ${errors.length}`, errors);
  }, [files, onFilesSelected]);

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesSelected(newFiles);
    setSizeErrors([]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    disabled: isUploading
  });

  return (
    <div className="w-full space-y-6">
      <div
        {...getRootProps()}
        className={clsx(
          "relative group cursor-pointer border-2 border-dashed rounded-3xl p-10 transition-all duration-300 ease-out text-center overflow-hidden",
          isDragActive
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border hover:border-primary/50 hover:bg-muted/30",
          isUploading && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className={clsx(
            "p-4 rounded-full transition-colors duration-300",
            isDragActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
          )}>
            <UploadCloud className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold font-display">
              {isDragActive ? "Drop files here" : "Drag & Drop CVs"}
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Upload PDF CVs in bulk (max 5MB each). We'll analyze with AI and rank Best Candidates based on your criteria.
            </p>
          </div>
        </div>
        
        {/* Decorative gradient blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0 pointer-events-none" />
      </div>
    </div>
  );
}
