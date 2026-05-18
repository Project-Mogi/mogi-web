import { type Gender } from '@/features/auth/sign-up/api';

export type SignUpStep = 'account' | 'profile';

export type SignUpFormState = {
  username: string;
  password: string;
  email: string;
  name: string;
  gender: Gender | '';
  roomNumber: string;
  studentNumber: string;
};

export const signUpFormFields = [
  'username',
  'password',
  'email',
  'name',
  'roomNumber',
  'studentNumber',
] as const;
