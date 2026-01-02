import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// Using relative paths to ensure resolution in all environments
const HomePage = lazy(() => import('@/components/HomePage'));
const PlaceholderPage = lazy(() => import('@/components/PlaceholderPage'));
const ConsultationPage = lazy(() => import('@/components/ConsultationPage'));
const ConsultationDetailPage = lazy(() => import('@/components/ConsultationDetailPage'));
const AskDoctorPage = lazy(() => import('@/components/AskDoctorPage'));
const FeedbackPage = lazy(() => import('@/components/FeedbackPage'));
const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: '/consultation',
    element: <ConsultationPage />,
  },
  {
    path: '/consultation/:id',
    element: <ConsultationDetailPage />,
  },
  {
    path: '/ask-doctor',
    element: <AskDoctorPage />,
  },
  {
    path: "/overview",
    children: [
      {
        path: "about",
        element: <PlaceholderPage title="医院简介" />,
      },
    ],
  },
  {
    path: "/services",
    element: <PlaceholderPage title="医疗服务" />,
  },
  {
    path: "/research",
    element: <PlaceholderPage title="科研创新" />,
  },
  {
    path: "/education",
    element: <PlaceholderPage title="教学培训" />,
  },
  {
    path: '/patient-services',
    children:[
      {
        path: 'feedback',
        element: <FeedbackPage />,
      }
    ]
  },
  {
    path: "/announcements",
    element: <PlaceholderPage title="医院公告" />,
  },
  {
    path: "/party",
    element: <PlaceholderPage title="党群园地" />,
  },
  {
    path: "/recruitment",
    element: <PlaceholderPage title="人才招聘" />,
  },
  {
    path: "/more",
    children: [
      {
        path: "1",
        element: <PlaceholderPage title="探索更多1" />,
      },
      {
        path: "2",
        element: <PlaceholderPage title="探索更多2" />,
      },
    ],
  },
  {
    path: "*",
    element: (
      <PlaceholderPage title="Page Not Found" headerClassName="bg-gray-800" />
    ),
  },
];

export default routes;
