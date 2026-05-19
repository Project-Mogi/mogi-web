import { type PropsWithChildren, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { ensureAccessToken } from '@/shared/api/client';
import { clearAuthTokens, getAccessToken, getRefreshToken } from '@/shared/api/token';

export function PublicOnlyRoute({ children }: PropsWithChildren) {
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
  }, [accessToken, isRefreshFailed, refreshToken]);

  if (accessToken) {
    return <Navigate to="/conduct" replace />;
  }

  if (refreshToken && !isRefreshFailed) {
    return null;
  }

  return children;
}
