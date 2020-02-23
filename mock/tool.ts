import mockjs from 'mockjs';

export default {
  'GET http://127.0.0.1:8099/v1/tools': mockjs.mock({
    'list|100': [{ title: '@city', desc: '@city', cover: '@city', 'value|1-100': 50, 'type|0-2': 1 }],
  }),
};
