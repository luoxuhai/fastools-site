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
    *login({ payload }: any, { put }: any) {
      const { user, token } = yield login(payload);

      yield put({
        type: 'global/changeLogging',
        payload: false,
      });

      if (!user) {
        message.error({ content: '登录失败!' });
        return;
      }

      if (window.isMobile) {
        const loginPath = localStorage.getItem('loginPath');
        if (loginPath) {
          router.replace(loginPath);
          window.localStorage.removeItem('loginPath');
        } else router.replace('/');
      }

      message.success({ content: '登录成功' });

      if (user.user_type !== 'vip')
        yield put({
          type: 'global/changePayPaneVisible',
          payload: true,
        });

      yield put({
        type: 'setUserInfo',
        payload: { user, token },
      });

      yield localforage.setItem('user', { user, token });
    },

    *logout(_: any, { put }: any) {
      postMessage('auth', undefined);

      yield put({
        type: 'global/changePayPaneVisible',
        payload: false,
      });
      yield put({
        type: 'global/changeVisibleDrawer',
        payload: false,
      });
      yield put({
        type: 'clearUserInfo',
      });
      yield localforage.removeItem('user');
    },

    *queryUserInfo({ payload }: any, { put }: any) {
      const result = yield queryUser();

      if (!result._id) return;

      yield put({
        type: 'setUserInfo',
        payload: { user: result, token: payload },
      });

      yield localforage.setItem('user', { user: result, token: payload });
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
      if (payload.user) {
        postMessage('auth', payload.user.user_type === 'vip' || undefined);
        delete payload.user.user_type;
      }
      return {
        ...state,
        ...payload,
      };
    },

    clearUserInfo(state: any) {
      return {
        ...state,
        user: {},
        token: '',
      };
    },
  },
};
