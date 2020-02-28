import { message } from 'antd';
import localforage from 'localforage';
import { login, queryUser } from '@/services/user';

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

      window.loginWin.close();
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
    },

    *queryUserInfo(_: any, { put }: any) {
      const result = yield queryUser();

      if (!result._id) return;

      yield put({
        type: 'setUserInfo',
        payload: { user: result },
      });
    },
  },

  reducers: {
    setUserInfo(state: any, { payload }: any) {
      localforage.setItem('user', { user: state.user, token: state.token, ...payload });
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
