import { useMutation } from '@tanstack/react-query';

import { signInWithMock } from '../api/signInWithMock';
import { useAuthStore } from './authStore';

export function useSignIn() {
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: signInWithMock,
    onSuccess: setSession,
  });
}
