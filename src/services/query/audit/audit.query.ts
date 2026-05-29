import { useQuery } from "@tanstack/react-query";
import api from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../api.types";
import type { AuditLogResponse } from "./audit.types";

export const useAuditLogs = (
  orgId: string,
  options?: { targetId?: string; skip?: number; limit?: number },
) => {
  return useQuery<AuditLogResponse[], AxiosError<ApiError>>({
    queryKey: ["audit-logs", "list", orgId, options],
    queryFn: async () => {
      const { data } = await api.get<AuditLogResponse[]>("/audit-logs/", {
        params: {
          organization_id: orgId,
          target_id: options?.targetId,
          skip: options?.skip ?? 0,
          limit: options?.limit ?? 100,
        },
      });
      return data;
    },
    enabled: !!orgId,
  });
};
