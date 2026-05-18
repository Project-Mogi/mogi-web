import { type PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { getAccessToken } from '@/shared/api/token';

export function ProtectedRoute({ children }: PropsWithChildren) {
  const location = useLocation();
  const accessToken = getAccessToken();

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
