import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../api.types";
import type { SignInFormValues } from "@/validations/sign-in.schema";
import type { RegisterOrganizationFormValues } from "@/validations/register-organization.schema";
import type { ForgotPasswordFormValues } from "@/validations/forgot-password.schema";
import type { ResetPasswordFormValues } from "@/validations/reset-password.schema";
import type {
  SignInResponse,
  RegisterOrganizationResponse,
  UserMeResponse,
} from "./auth.types";

export const useSignIn = () => {
  return useMutation<SignInResponse, AxiosError<ApiError>, SignInFormValues>({
    mutationFn: async (user: SignInFormValues) => {
      const { data } = await api.post<SignInResponse>("/auth/sign-in", {
        email: user.email,
        password: user.password,
      });
      return data;
    },
  });
};

export const useRegisterOrganization = () => {
  return useMutation<
    RegisterOrganizationResponse,
    AxiosError<ApiError>,
    RegisterOrganizationFormValues
  >({
    mutationFn: async (user: RegisterOrganizationFormValues) => {
      const { data } = await api.post<RegisterOrganizationResponse>(
        "/auth/register-organization",
        {
          organization: {
            name: user.organizationName,
            code: user.companyCode,
          },
          admin: {
            name: user.userName,
            email: user.userEmail,
            password: user.password,
          },
        },
      );
      return data;
    },
  });
};

export const useMe = () => {
  return useQuery<UserMeResponse, AxiosError<ApiError>>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const response = await api.get<UserMeResponse>("/auth/me");
      return response.data;
    },
  });
};

export const useForgotPassword = () => {
  return useMutation<any, AxiosError<ApiError>, ForgotPasswordFormValues>({
    mutationFn: async (payload: ForgotPasswordFormValues) => {
      const { data } = await api.post("/auth/forgot-password", payload);
      return data;
    },
  });
};

export const useSendVerification = () => {
  return useMutation<any, AxiosError<ApiError>, { email: string }>({
    mutationFn: async (payload: { email: string }) => {
      const { data } = await api.post("/auth/send-verification", payload);
      return data;
    },
  });
};

export const useResetPassword = () => {
  return useMutation<
    any,
    AxiosError<ApiError>,
    {
      token: string;
      data: ResetPasswordFormValues;
    }
  >({
    mutationFn: async (payload: {
      token: string;
      data: ResetPasswordFormValues;
    }) => {
      const { data } = await api.post("/auth/reset-password", {
        token: payload.token,
        new_password: payload.data.password,
      });
      return data;
    },
  });
};

export const useVerifyEmail = () => {
  return useMutation<any, AxiosError<ApiError>, string>({
    mutationFn: async (token: string) => {
      const { data } = await api.get(`/auth/verify-email`, {
        params: { token },
      });
      return data;
    },
  });
};

export const useVerifyTokenInfoQuery = (token: string | null) => {
  return useQuery<any, AxiosError<ApiError>>({
    queryKey: ["auth", "verify-token-info", token],
    queryFn: async () => {
      const { data } = await api.get(`/auth/verify-token-info`, {
        params: { token },
      });
      return data;
    },
    enabled: !!token,
  });
};

export const useVerifyEmailQuery = (token: string | null) => {
  return useQuery<any, AxiosError<ApiError>>({
    queryKey: ["auth", "verify-email", token],
    queryFn: async () => {
      const { data } = await api.get(`/auth/verify-email`, {
        params: { token },
      });
      return data;
    },
    enabled: !!token,
  });
};
