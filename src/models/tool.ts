import { message } from 'antd';
import localforage from 'localforage';
import { queryTools } from '@/services/tool';

export default {
  namespace: 'tool',

  state: {
    tools: [],
  },

  subscriptions: {},

  effects: {
    *queryTools({ payload }: any, { call, put }: any) {
      yield put({
        type: 'setTools',
        payload: [],
      });

      const result = yield queryTools(payload);

      if (!result.length) {
        return;
      }

      yield put({
        type: 'setTools',
        payload: result,
      });
    },
  },

  reducers: {
    setTools(state: any, { payload }: any) {
      return {
        ...state,
        tools: payload,
      };
    },
  },
};
