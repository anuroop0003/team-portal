export interface UserResponse {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  is_active: boolean;
  employee_id: string | null;
  designation: string | null;
  department: string | null;
  date_of_joining: string | null;
  gender: string | null;
  date_of_birth: string | null;
  blood_group: string | null;
  emergency_contact: string | null;
  invitation_link?: string;
}

export interface StatutoryResponse {
  id: string;
  user_id: string;
  pan_number: string | null;
  aadhar_number: string | null;
  bank_name: string | null;
  account_number: string | null;
  ifsc_code: string | null;
}

export interface UserDetailResponse extends UserResponse {
  statutory_details: StatutoryResponse | null;
}

export interface CreateUser {
  name: string;
  email: string;
  phone?: string | null;
  password: string;
  role?: string | null;
  organization_id: string;
  designation?: string | null;
  department?: string | null;
  date_of_joining?: string | null;
  gender?: string | null;
  date_of_birth?: string | null;
  blood_group?: string | null;
  emergency_contact?: string | null;
}

export interface UserUpdate {
  name?: string;
  phone?: string;
  role?: string;
  is_active?: boolean;
  designation?: string;
  department?: string;
  date_of_joining?: string;
  gender?: string;
  date_of_birth?: string;
  blood_group?: string;
  emergency_contact?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
