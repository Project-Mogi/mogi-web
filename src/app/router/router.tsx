import { createBrowserRouter, Navigate } from 'react-router-dom';

import { SignInPage } from '@/pages/auth/sign-in';
import { SignUpPage } from '@/pages/auth/sign-up';
import { ConductCreatePage } from '@/pages/conduct-create';
import { DashboardPage } from '@/pages/dashboard';
import { HistoriesPage } from '@/pages/histories';
import { NotFoundPage } from '@/pages/not-found';
import { StatisticsPage } from '@/pages/statistics';
import { StudentDetailPage } from '@/pages/student-detail';
import { StudentsPage } from '@/pages/students';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
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
    element: <DashboardPage />,
  },
  {
    path: '/students',
    element: <StudentsPage />,
  },
  {
    path: '/students/:studentId',
    element: <StudentDetailPage />,
  },
  {
    path: '/conduct/new',
    element: <ConductCreatePage />,
  },
  {
    path: '/histories',
    element: <HistoriesPage />,
  },
  {
    path: '/statistics',
    element: <StatisticsPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
