import { RouteObject } from "react-router-dom";
import {lazy} from 'react'
const HomePage = lazy(() => import('@/components/HomePage'));
const PlaceholderPage = lazy(() => import('@/components/PlaceholderPage'));
const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
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
    path: "/guide",
    element: <PlaceholderPage title="就医指南" />,
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
