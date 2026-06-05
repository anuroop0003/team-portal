import { useRef, useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface LogoUploaderProps {
  value?: File | null;
  onChange?: (file: File | null) => void;
  accept?: string;
  className?: string;
}

export function LogoUploader({
  value,
  onChange,
  accept = "image/jpeg,image/png,image/webp",
  className,
}: LogoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (fileList: FileList | null) => {
    const file = fileList?.[0];

    if (!file) return;

    onChange?.(file);
  };

  const removeFile = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onChange?.(null);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleUpload(e.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-4 transition-colors",
          "hover:border-primary/50 hover:bg-accent/50",
          isDragging && "border-primary bg-primary/5",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />

        <Upload className="mb-2 size-5 text-muted-foreground" />

        <p className="text-xs font-medium">
          Drag & Drop or{" "}
          <span className="text-primary hover:underline">Choose file</span>
        </p>

        <p className="mt-1 text-[10px] text-muted-foreground">JPG, PNG, WEBP</p>
      </div>

      {value && (
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="flex size-7 shrink-0 items-center justify-center rounded border bg-muted">
              <FileText className="size-4 text-muted-foreground" />
            </div>

            <div className="overflow-hidden">
              <p className="truncate text-xs font-medium">{value.name}</p>

              <p className="text-[10px] text-muted-foreground">
                {formatSize(value.size)}
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              removeFile();
            }}
          >
            <X />
          </Button>
        </div>
      )}
    </div>
  );
}
