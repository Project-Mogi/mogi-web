import { type PropsWithChildren, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { ensureAccessToken } from '@/shared/api/client';
import { clearAuthTokens, getAccessToken, getRefreshToken } from '@/shared/api/token';

export function ProtectedRoute({ children }: PropsWithChildren) {
  const location = useLocation();
  const [, refreshRoute] = useState(0);
  const [isRefreshFailed, setIsRefreshFailed] = useState(false);
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  useEffect(() => {
    let isMounted = true;

    if (accessToken || !refreshToken || isRefreshFailed) {
      return;
    }

    ensureAccessToken()
      .then(() => {
        if (isMounted) {
          refreshRoute((version) => version + 1);
        }
      })
      .catch(() => {
        clearAuthTokens();

        if (isMounted) {
          setIsRefreshFailed(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [accessToken, isRefreshFailed, location.key, refreshToken]);

  if (accessToken) {
    return children;
  }

  if (!refreshToken || isRefreshFailed) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return null;
}
