import { BrowserRouter, Route } from 'react-router-dom';

export interface IRoute {
  /** 路由字符串 */
  path: string;
  /** 组件 */
  component: () => JSX.Element;
  /** 子录由 */
  children?: IRoute[];
}

interface AppRouterProps {
  routes: IRoute[];
}

export default function AppRouter({ routes }: AppRouterProps): JSX.Element {
  return (
    <BrowserRouter>
      {flatRoutes(routes).map((route) => (
        <Route exact {...route} key={route.path}></Route>
      ))}
    </BrowserRouter>
  );
}

/**
 *  打平路由配置
 */
export function flatRoutes(routes: IRoute[]): IRoute[] {
  const _routes: IRoute[] = [];
  function func(routes: IRoute[]) {
    routes.forEach((route) => {
      _routes.push({
        path: route.path,
        component: route.component,
      });
      if (route.children) func(route.children);
    });
  }
  func(routes);
  return _routes;
}
