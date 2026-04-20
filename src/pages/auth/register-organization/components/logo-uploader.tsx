import { useState, useCallback } from "react";
import { Upload, FileText, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface UploadingFile {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "completed" | "failed";
  errorMessage?: string;
}

interface LogoUploaderProps {
  label?: string;
  maxFiles?: number;
  maxSizeMB?: number;
  className?: string;
  onFilesChange?: (files: File[]) => void;
}

export function LogoUploader({
  label = "Upload file",
  maxFiles = 1,
  maxSizeMB = 5,
  className,
  onFilesChange,
}: LogoUploaderProps) {
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleUpload = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const newFiles = Array.from(files).slice(0, maxFiles);

      const preparedFiles = newFiles.map((file) => {
        const isTooLarge = file.size > maxSizeMB * 1024 * 1024;
        const id = Math.random().toString(36).substring(7);

        const newFile: UploadingFile = {
          id,
          file,
          progress: 0,
          status: isTooLarge ? "failed" : "uploading",
          errorMessage: isTooLarge
            ? `The file exceeds the ${maxSizeMB} MB size limit.`
            : undefined,
        };

        if (!isTooLarge) {
          // Simulate upload
          let progress = 0;
          const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
              progress = 100;
              clearInterval(interval);
              setUploadingFiles((prev) => {
                const updated = prev.map((f) =>
                  f.id === id
                    ? { ...f, progress: 100, status: "completed" as const }
                    : f,
                );
                onFilesChange?.(
                  updated
                    .filter((f) => f.status === "completed")
                    .map((f) => f.file),
                );
                return updated;
              });
            } else {
              setUploadingFiles((prev) =>
                prev.map((f) => (f.id === id ? { ...f, progress } : f)),
              );
            }
          }, 300);
        }

        return newFile;
      });

      setUploadingFiles((prev) => {
        const updated = [...prev, ...preparedFiles].slice(-maxFiles);
        onFilesChange?.(
          updated.filter((f) => f.status === "completed").map((f) => f.file),
        );
        return updated;
      });
    },
    [maxFiles, maxSizeMB, onFilesChange],
  );

  const removeFile = (id: string) => {
    setUploadingFiles((prev) => {
      const updated = prev.filter((f) => f.id !== id);
      onFilesChange?.(
        updated.filter((f) => f.status === "completed").map((f) => f.file),
      );
      return updated;
    });
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleUpload(e.dataTransfer.files);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-4 transition-colors",
          isDragging && "border-primary bg-primary/5",
          "hover:border-primary/50 hover:bg-accent/50 cursor-pointer",
        )}
        onClick={() => document.getElementById(`file-input-${label}`)?.click()}
      >
        <input
          type="file"
          id={`file-input-${label}`}
          className="sr-only"
          onChange={(e) => handleUpload(e.target.files)}
          multiple={maxFiles > 1}
          accept="image/*"
        />
        <Upload className="mb-2 size-5 text-muted-foreground" />
        <p className="text-xs font-medium text-foreground">
          Drag & Drop or{" "}
          <span className="text-primary hover:underline">Choose file</span> to
          upload
        </p>
        <p className="mt-1 text-[10px] text-muted-foreground">
          Max {maxFiles} files · Up to {maxSizeMB}MB
        </p>
      </div>

      {uploadingFiles.length > 0 && (
        <div className="space-y-3">
          {uploadingFiles.map((file) => (
            <div key={file.id} className="relative space-y-1.5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="flex size-7 shrink-0 items-center justify-center rounded border bg-muted">
                    <FileText className="size-4 text-muted-foreground" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="truncate text-xs font-medium">
                      {file.file.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {formatSize(file.file.size)}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-6 text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.id);
                  }}
                >
                  <X className="size-3" />
                </Button>
              </div>

              {file.status === "failed" ? (
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-destructive">
                    <AlertCircle className="size-3" />
                    <span>{file.errorMessage}</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-destructive/10">
                    <div className="h-full w-full bg-destructive" />
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex justify-end text-[10px] font-medium text-muted-foreground">
                    {Math.round(file.progress)}%
                  </div>
                  <Progress value={file.progress} className="h-1" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
