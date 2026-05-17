import { createBrowserRouter, Navigate } from 'react-router-dom';

import { DashboardPage } from '@/pages/dashboard';
import { LoginPage } from '@/pages/login';

import { ProtectedRoute, PublicOnlyRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: (
      <PublicOnlyRoute>
        <LoginPage />
      </PublicOnlyRoute>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
]);
