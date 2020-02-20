import { message } from 'antd';
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

      yield put({
        type: 'setUserInfo',
        payload: result,
      });
    },
  },

  reducers: {
    setUserInfo(state: any, { payload }: any) {
      return {
        ...state,
        token: payload.token,
        user: payload.user,
      };
    },
  },
};
