const CracoLessPlugin = require('craco-less');

module.exports = {
  babel: {
    plugins: [['import', { libraryName: 'antd', style: true }]],
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
