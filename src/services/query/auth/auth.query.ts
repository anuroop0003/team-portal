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
import { compressImage } from "@/lib/image-compression";
import { useUploadPublic } from "../upload/upload.query";

export const useSignIn = () => {
  return useMutation<SignInResponse, AxiosError<ApiError>, SignInFormValues>({
    mutationFn: async (user: SignInFormValues) => {
      const formData = new FormData();

      formData.append("username", user.email);
      formData.append("password", user.password);

      const { data } = await api.post<SignInResponse>(
        "/auth/sign-in",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return data;
    },
  });
};

export const useRegisterOrganization = () => {
  const { mutateAsync: uploadPublic } = useUploadPublic();

  return useMutation<
    RegisterOrganizationResponse,
    AxiosError<ApiError>,
    RegisterOrganizationFormValues
  >({
    mutationFn: async (payload) => {
      let logoUrl: string | null = null;

      if (payload.logo) {
        const compressedLogo = await compressImage(payload.logo, 512, 512, 0.8);

        const uploadResult = await uploadPublic({
          file: compressedLogo,
          uploadType: "logo",
        });

        logoUrl = uploadResult.url;
      }

      const { data } = await api.post<RegisterOrganizationResponse>(
        "/auth/register-organization",
        {
          organization: {
            name: payload.organizationName,
            code: payload.companyCode,
            logo_url: logoUrl,
          },
          admin: {
            name: payload.userName,
            email: payload.userEmail,
            password: payload.password,
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
