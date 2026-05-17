export type Role = 'STUDENT' | 'AUTONOMY' | 'HOUSEMASTER';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  name: string;
  role: Role;
}

export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignInData extends AuthUser {
  accessToken: string;
  refreshToken: string;
}
