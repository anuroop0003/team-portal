import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../api.types";
import type { SignInFormValues } from "@/validations/sign-in.schema";
import type { SignUpFormValues } from "@/validations/sign-up.schema";
import type { ForgotPasswordFormValues } from "@/validations/forgot-password.schema";
import type { ResetPasswordFormValues } from "@/validations/reset-password.schema";
import type {
  SignInResponse,
  SignUpResponse,
  UserMeResponse,
  VerifyEmailResponse,
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

export const useSignUp = () => {
  return useMutation<SignUpResponse, AxiosError<ApiError>, SignUpFormValues>({
    mutationFn: async (user: SignUpFormValues) => {
      const { data } = await api.post<SignUpResponse>(
        "/auth/register-organization",
        {
          organization: {
            name: user.companyName,
            initial: user.orgInitial,
            full_name: user.companyName,
          },
          admin: {
            name: user.fullName,
            email: user.email,
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

export const useVerifyEmail = () => {
  return useMutation<VerifyEmailResponse, AxiosError<ApiError>, string>({
    mutationFn: async (token: string) => {
      const { data } = await api.get(`/auth/verify-email?token=${token}`);
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
