import { RouteObject } from 'react-router-dom';
import HomePage from '@/components/HomePage';
import PlaceholderPage from '@/components/PlaceholderPage';
  //headerClassName 可以用来为不同页面的header添加不同的背景颜色等样式，默认紫色
const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <PlaceholderPage title="About Us" />,
  },
  {
    path: '/education',
    element: <PlaceholderPage title="Education" headerClassName="bg-gray-800" />,
  },
  {
    path: '/research',
    element: <PlaceholderPage title="Research" />,
  },
  {
    path: '/faculty',
    element: <PlaceholderPage title="Faculty" />,
  },
  {
    path: '/admissions',
    element: <PlaceholderPage title="Admissions" />,
  },
  {
    path: '/news',
    element: <PlaceholderPage title="News & Events" />,
  },
  {
    path: '*',
    element: <PlaceholderPage title="Page Not Found" />,
  },
];

export default routes;