/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import router from 'umi/router';
// import cookie from 'react-cookies';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = error => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status } = response;
  console.error(errortext);
  if (status === 401) {
    /* eslint-disable no-underscore-dangle */
  }
  // environment should not be used
  if (status === 403) {
    router.push('/exception/403');
  }
  if (status <= 504 && status >= 500) {
    router.push('/exception/500');
  }
  if (status >= 404 && status < 422) {
    router.push('/exception/404');
  }
  return response;
};
/**
 * 配置request请求时的默认参数
 */

const request = extend({
  maxCache: 100,
  prefix: process.env.NODE_ENV === 'production' ? 'https://api.fastools.cn' : 'http://127.0.0.1:8099',
  errorHandler,
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
  return {
    url: `${url}`,
    options: { ...options, interceptors: true },
  };
});

// response拦截器, 处理response
// request.interceptors.response.use(response => response);

export default request;
