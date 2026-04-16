export interface SignInResponse {
  access_token: string;
  token_type: string;
}

export interface SignUpResponse {
  message: string;
}

export interface VerifyEmailResponse {
  message: string;
}

export interface UserMeResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  organization_id: string;
}
