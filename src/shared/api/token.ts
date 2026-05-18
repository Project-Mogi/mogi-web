const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export function getAccessToken() {
  return getStorageItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return getStorageItem(REFRESH_TOKEN_KEY);
}

export function setAccessToken(accessToken: string) {
  setStorageItem(ACCESS_TOKEN_KEY, accessToken);
}

export function setAuthTokens({ accessToken, refreshToken }: AuthTokens) {
  setStorageItem(ACCESS_TOKEN_KEY, accessToken);
  setStorageItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearAuthTokens() {
  removeStorageItem(ACCESS_TOKEN_KEY);
  removeStorageItem(REFRESH_TOKEN_KEY);
}

function getStorageItem(key: string) {
  if (!isBrowser()) {
    return null;
  }

  return window.localStorage.getItem(key);
}

function setStorageItem(key: string, value: string) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(key, value);
}

function removeStorageItem(key: string) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(key);
}

function isBrowser() {
  return typeof window !== 'undefined';
}
