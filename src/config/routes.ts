import { IRoute } from '../utils/AppRouter';
import App from '../pages/Home';

const routes: IRoute[] = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '/button',
        component: App,
      },
    ],
  },
];

export default routes;
