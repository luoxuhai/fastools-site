import { message } from 'antd';
import router from 'umi/router';
import localforage from 'localforage';
import { login, queryUser, refreshToken } from '@/services/user';
import { postMessage } from '@/utils/utils';

export default {
  namespace: 'login',

  state: {
    user: {},
    token: '',
  },

  subscriptions: {},

  effects: {
    *login({ payload }: any, { call, put }: any) {
      const result = yield login(payload);

      if (!result.user) {
        message.error({ content: '登录失败!' });
        return;
      }

      if (window.isMobile) {
        const loginPath = localStorage.getItem('loginPath');
        if (loginPath) {
          router.replace(loginPath);
          window.localStorage.removeItem('loginPath');
        } else router.replace('/');
      } else window.loginWin.close();

      message.success({ content: '登录成功' });

      yield put({
        type: 'setUserInfo',
        payload: result,
      });
    },

    *logout(_: any, { put }: any) {
      yield put({
        type: 'clearUserInfo',
      });
      postMessage('auth', undefined);
    },

    *queryUserInfo(_: any, { put }: any) {
      const result = yield queryUser();

      if (!result._id) return;

      yield put({
        type: 'setUserInfo',
        payload: { user: result },
      });
    },

    *refreshToken({ payload }: any, { put }: any) {
      const { token } = yield refreshToken();
      if (token) {
        yield put({
          type: 'setUserInfo',
          payload: {
            user: payload,
            token,
          },
        });
      }
    },
  },

  reducers: {
    setUserInfo(state: any, { payload }: any) {
      localforage.setItem('user', { user: state.user, token: state.token, ...payload }).catch(err => {
        console.log(err);
      });
      if (payload.user) postMessage('auth', payload.user.user_type === 'vip' || undefined);
      return {
        ...state,
        ...payload,
      };
    },

    clearUserInfo(state: any) {
      localforage.removeItem('user');
      return {
        ...state,
        user: {},
        token: '',
      };
    },
  },
};
