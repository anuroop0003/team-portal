import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../api.types";
import type {
  UserResponse,
  UserDetailResponse,
  CreateUser,
  UserUpdate,
} from "./user-management.types";

export const useUsers = (orgId: string, options?: any) => {
  return useQuery<UserResponse[], AxiosError<ApiError>>({
    queryKey: ["users", "list", orgId, options],
    queryFn: async () => {
      const { data } = await api.get<UserResponse[]>("/users/", {
        params: {
          organization_id: orgId,
          skip: options?.skip ?? 0,
          limit: options?.limit ?? 100,
          search: options?.search,
        },
      });
      return data;
    },
    enabled: !!orgId,
  });
};

export const useUser = (orgId: string, userId: string) => {
  return useQuery<UserDetailResponse, AxiosError<ApiError>>({
    queryKey: ["users", "detail", userId],
    queryFn: async () => {
      const { data } = await api.get<UserDetailResponse>(`/users/${userId}`, {
        params: { organization_id: orgId },
      });
      return data;
    },
    enabled: !!orgId && !!userId,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<UserDetailResponse, AxiosError<ApiError>, CreateUser>({
    mutationFn: async (user: CreateUser) => {
      const { data } = await api.post<UserDetailResponse>("/users/", user);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useAdmins = (orgId: string, options?: any) => {
  return useQuery<UserDetailResponse[], AxiosError<ApiError>>({
    queryKey: ["users", "admins", orgId, options],
    queryFn: async () => {
      const { data } = await api.get<UserDetailResponse[]>("/admins/", {
        params: {
          organization_id: orgId,
          skip: options?.skip ?? 0,
          limit: options?.limit ?? 100,
          search: options?.search,
        },
      });
      return data;
    },
    enabled: !!orgId,
  });
};

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation<UserDetailResponse, AxiosError<ApiError>, CreateUser>({
    mutationFn: async (admin: CreateUser) => {
      const { data } = await api.post<UserDetailResponse>("/admins/", admin);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<
    UserDetailResponse,
    AxiosError<ApiError>,
    {
      userId: string;
      orgId: string;
      data: UserUpdate;
    }
  >({
    mutationFn: async ({
      userId,
      orgId,
      data: updateData,
    }: {
      userId: string;
      orgId: string;
      data: UserUpdate;
    }) => {
      const { data } = await api.put<UserDetailResponse>(
        `/admins/${userId}`,
        updateData,
        {
          params: { organization_id: orgId },
        },
      );
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({
        queryKey: ["users", "detail", data.id],
      });
    },
  });
};

export const useDeactivateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    AxiosError<ApiError>,
    { userId: string; orgId: string }
  >({
    mutationFn: async ({
      userId,
      orgId,
    }: {
      userId: string;
      orgId: string;
    }) => {
      const { data } = await api.post(`/admins/${userId}/deactivate`, null, {
        params: { organization_id: orgId },
      });
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({
        queryKey: ["users", "detail", variables.userId],
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<
    any,
    AxiosError<ApiError>,
    { userId: string; orgId: string }
  >({
    mutationFn: async ({
      userId,
      orgId,
    }: {
      userId: string;
      orgId: string;
    }) => {
      const { data } = await api.delete(`/admins/${userId}`, {
        params: { organization_id: orgId },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
