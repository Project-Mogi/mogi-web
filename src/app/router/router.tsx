import { type ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { SignInPage } from '@/pages/auth/sign-in';
import { SignUpPage } from '@/pages/auth/sign-up';
import { ConductPage } from '@/pages/conduct';
import { DashboardPage } from '@/pages/dashboard';
import { HistoriesPage } from '@/pages/histories';
import { NotFoundPage } from '@/pages/not-found';
import { StatisticsPage } from '@/pages/statistics';
import { StudentDetailPage } from '@/pages/student-detail';
import { StudentsPage } from '@/pages/students';

import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: withAuth(<Navigate to="/conduct" replace />),
  },
  {
    path: '/login',
    element: <SignInPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
  {
    path: '/dashboard',
    element: withAuth(<DashboardPage />),
  },
  {
    path: '/students',
    element: withAuth(<StudentsPage />),
  },
  {
    path: '/students/:studentId',
    element: withAuth(<StudentDetailPage />),
  },
  {
    path: '/conduct',
    element: withAuth(<ConductPage />),
  },
  {
    path: '/histories',
    element: withAuth(<HistoriesPage />),
  },
  {
    path: '/statistics',
    element: withAuth(<StatisticsPage />),
  },
  {
    path: '*',
    element: withAuth(<NotFoundPage />),
  },
]);

function withAuth(element: ReactNode) {
  return <ProtectedRoute>{element}</ProtectedRoute>;
}
