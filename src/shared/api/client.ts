import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

import { clearAuthTokens, getAccessToken, getRefreshToken, setAccessToken } from './token';
import { type ApiResponse } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const tokenRefreshClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let refreshAccessTokenPromise: Promise<string> | null = null;

apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiResponse<unknown>>) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (!shouldRefreshToken(error, originalRequest)) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const accessToken = await refreshAccessToken();

      originalRequest.headers.set('Authorization', `Bearer ${accessToken}`);

      return apiClient(originalRequest);
    } catch (refreshError) {
      clearAuthTokens();

      return Promise.reject(refreshError);
    }
  },
);

function shouldRefreshToken(
  error: AxiosError<ApiResponse<unknown>>,
  originalRequest?: RetryableRequestConfig,
): originalRequest is RetryableRequestConfig {
  if (!originalRequest || originalRequest._retry) {
    return false;
  }

  if (error.response?.status !== 401) {
    return false;
  }

  return Boolean(getRefreshToken());
}

async function refreshAccessToken() {
  refreshAccessTokenPromise ??= requestAccessTokenRefresh().finally(() => {
    refreshAccessTokenPromise = null;
  });

  return refreshAccessTokenPromise;
}

export async function ensureAccessToken() {
  const accessToken = getAccessToken();

  if (accessToken) {
    return accessToken;
  }

  return refreshAccessToken();
}

async function requestAccessTokenRefresh() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error('토큰 재발급 실패');
  }

  const response = await tokenRefreshClient.post<ApiResponse<string>>('/auth/refresh', null, {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error?.message ?? '토큰 재발급 실패');
  }

  setAccessToken(response.data.data);

  return response.data.data;
}
