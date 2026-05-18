import { apiClient } from '@/shared/api/client';
import { type ApiResponse } from '@/shared/api/types';

export interface SignInRequest {
  username: string;
  password: string;
}

export type Role = 'STUDENT' | 'AUTONOMY' | 'HOUSEMASTER';

export interface SignInResponseData {
  id: number;
  username: string;
  email: string;
  name: string;
  role: Role;
  accessToken: string;
  refreshToken: string;
}

export async function signIn(payload: SignInRequest) {
  const response = await apiClient.post<ApiResponse<SignInResponseData>>('/auth/signin', payload);

  if (!response.data.success || !response.data.data) {
    throw response.data;
  }

  return response.data.data;
}
