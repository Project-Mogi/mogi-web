import { apiClient } from '@/shared/api/client';
import { type ApiResponse } from '@/shared/api/types';

export type Gender = 'GIRL' | 'BOY';

export interface SignUpRequest {
  username: string;
  password: string;
  email: string;
  name: string;
  gender: Gender;
  roomNumber: number;
  studentNumber: number;
}

export type SignUpResponse = ApiResponse<null>;

export async function signUp(payload: SignUpRequest) {
  const response = await apiClient.post<SignUpResponse>('/auth/signup', payload);

  if (!response.data.success) {
    throw response.data;
  }

  return response.data;
}
