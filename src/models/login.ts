import { message } from 'antd';
import localforage from 'localforage';
import { login } from '@/services/user';

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

      message.success({ content: '登录成功' });
      localforage.setItem('user', result);

      yield put({
        type: 'setUserInfo',
        payload: result,
      });
    },

    *logout({ payload }: any, { call, put }: any) {
      localforage.removeItem('user');

      yield put({
        type: 'setUserInfo',
        payload: { user: {}, token: '' },
      });
    },
  },

  reducers: {
    setUserInfo(state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
