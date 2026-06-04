export interface UploadResponse {
  url: string;
  filename: string;
  status: string;
}

export interface UploadPublicPayload {
  file: File;
  uploadType: "logo" | "profile";
}
