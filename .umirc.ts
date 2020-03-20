import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  theme: {
    'primary-color': '#4fc08d',
  },
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' },
        { path: '404', component: '../pages/404' },
        { path: 'login', component: '../pages/Login/index' },
        { path: ':id', component: '../pages/ToolList/index' },
        { path: 'exception/403', component: '../pages/Exception/403' },
        { path: 'exception/404', component: '../pages/404' },
        { path: 'exception/500', component: '../pages/Exception/500' },
        { path: ':id/:id', component: '../pages/ToolDetail/index' },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: '快用工具',
        fastClick: true,
        dll: true,
        pwa: {
          manifestOptions: {
            srcPath: 'src/manifest.json',
          },
          workboxPluginMode: 'InjectManifest',
          workboxOptions: {
            importWorkboxFrom: 'local',
          },
        },
        routes: {
          exclude: [/models\//, /services\//, /model\.(t|j)sx?$/, /service\.(t|j)sx?$/, /components\//],
        },
      },
    ],
  ],
};

export default config;
