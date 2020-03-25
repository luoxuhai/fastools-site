import { queryTools } from '@/services/tool';

export default {
  namespace: 'tool',

  state: {
    tools: [],
    currentPage: 0,
    totalPage: 1,
    loading: false,
  },

  subscriptions: {},

  effects: {
    *queryTools({ payload: { page, per_page, tool_type, loadMore } }: any, { select, put }: any) {
      if (!loadMore)
        yield put({
          type: 'setTools',
          payload: { tools: [] },
        });

      const result = yield queryTools({ page, per_page, tool_type });

      if (!result.total) {
        return;
      }

      const tools = yield select((state: any) => state.tool.tools);
      result.tools = [...tools, ...result.tools];

      yield put({
        type: 'setTools',
        payload: result,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    setTools(state: any, { payload }: any) {
      return {
        ...state,
        tools: payload.tools,
        currentPage: payload?.page,
        totalPage: payload?.total,
      };
    },

    changeLoading(state: any, { payload }: any) {
      return {
        ...state,
        loading: payload,
      };
    },
  },
};
