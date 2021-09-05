import { registerMicroApps, start } from 'qiankun';

const microApps = [
  {
    name: 'react app',
    entry: '//localhost:7100',
    container: '#yourContainer',
    activeRule: '/yourActiveRule',
  },
  {
    name: 'vue app',
    entry: { scripts: ['//localhost:7100/main.js'] },
    container: '#yourContainer2',
    activeRule: '/yourActiveRule2',
  },
];

registerMicroApps(microApps);

start();
