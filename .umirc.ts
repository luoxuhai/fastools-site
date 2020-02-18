import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  theme: {
    'primary-color': '#fac300',
  },
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' },
        { path: 'doc', component: '../pages/Doc/index' },
        { path: 'image', component: '../pages/Image/index' },
        { path: 'audio', component: '../pages/Audio/index' },
        { path: 'video', component: '../pages/Video/index' },
        { path: 'othor', component: '../pages/Othor/index' },
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
        dll: false,
        fastClick: true,
        pwa: {
          manifestOptions: {
            srcPath: 'src/manifest.json',
          },
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
