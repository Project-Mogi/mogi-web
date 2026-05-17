import { create } from 'zustand';

import { type AuthUser, type SignInData } from '@/entities/auth/model';
import { clearAuthTokens, getAccessToken, setAuthTokens } from '@/shared/api/token';

const AUTH_USER_KEY = 'mogi.authUser';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setSession: (signInData: SignInData) => void;
  signOut: () => void;
}

const initialUser = getStoredAuthUser();

export const useAuthStore = create<AuthState>((set) => ({
  user: initialUser,
  isAuthenticated: Boolean(initialUser && getAccessToken()),
  setSession: ({ accessToken, refreshToken, ...user }) => {
    setAuthTokens({ accessToken, refreshToken });
    setStoredAuthUser(user);
    set({ user, isAuthenticated: true });
  },
  signOut: () => {
    clearAuthTokens();
    removeStoredAuthUser();
    set({ user: null, isAuthenticated: false });
  },
}));

function getStoredAuthUser() {
  if (!isBrowser()) {
    return null;
  }

  const value = window.localStorage.getItem(AUTH_USER_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as AuthUser;
  } catch {
    window.localStorage.removeItem(AUTH_USER_KEY);
    return null;
  }
}

function setStoredAuthUser(user: AuthUser) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

function removeStoredAuthUser() {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(AUTH_USER_KEY);
}

function isBrowser() {
  return typeof window !== 'undefined';
}
