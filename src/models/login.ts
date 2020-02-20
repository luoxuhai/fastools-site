export default {
  namespace: 'login',

  state: {
    status: false,
    info: {},
  },

  subscriptions: {},

  effects: {},

  reducers: {
    changeLoginStatus(state: any, { payload }: any) {
      return {
        ...state,
        status: payload,
      };
    },
  },
};
