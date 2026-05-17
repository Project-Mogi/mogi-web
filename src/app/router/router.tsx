import { createBrowserRouter, Navigate } from 'react-router-dom';

import { DashboardPage } from '@/pages/dashboard';
import { LoginPage } from '@/pages/login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
]);
