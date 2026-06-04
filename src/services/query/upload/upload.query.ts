import { useMutation } from "@tanstack/react-query";
import api from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../api.types";
import type { UploadResponse, UploadPublicPayload } from "./upload.types";

/**
 * React Query mutation hook for uploading a public file.
 */
export const useUploadPublic = () => {
  return useMutation<UploadResponse, AxiosError<ApiError>, UploadPublicPayload>(
    {
      mutationFn: async ({ file, uploadType }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_type", uploadType);

        const { data } = await api.post<UploadResponse>(
          "/storage/upload-public",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        return data;
      },
    },
  );
};
