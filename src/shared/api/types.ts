import { isAxiosError } from 'axios';

export interface ApiResponse<T> {
  data: T | null;
  success: boolean;
  message: string | null;
  error: ApiError | null;
}

export interface ApiError {
  code: ApiErrorCode;
  message: string;
  timestamp: string;
  details?: Record<string, string>;
}

export type ApiErrorCode =
  | 'INVALID_INPUT'
  | 'UNAUTHORIZED'
  | 'TOKEN_EXPIRED'
  | 'TOKEN_INVALID'
  | 'FORBIDDEN'
  | 'USER_NOT_FOUND'
  | 'CONDUCT_NOT_FOUND'
  | 'DUPLICATE_USERNAME'
  | 'DUPLICATE_EMAIL';

export function getApiErrorMessage(error: unknown, fallbackMessage = '요청 실패') {
  if (isApiErrorResponse(error)) {
    return error.error?.message ?? fallbackMessage;
  }

  if (isAxiosError<ApiResponse<unknown>>(error) && isApiErrorResponse(error.response?.data)) {
    return error.response.data.error?.message ?? fallbackMessage;
  }

  return fallbackMessage;
}

export function isApiErrorResponse(error: unknown): error is ApiResponse<null> {
  if (!error || typeof error !== 'object') {
    return false;
  }

  return 'success' in error && 'error' in error;
}
