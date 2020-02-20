export default {
  namespace: 'global',

  state: {
    loginPaneVisible: false,
    innerWidth: window.innerWidth,
  },

  subscriptions: {},

  effects: {},

  reducers: {
    changeLoginPaneVisible(state: any, { payload }: any) {
      return {
        ...state,
        loginPaneVisible: payload,
      };
    },

    setInnerWidth(state: any, { payload }: any) {
      return {
        ...state,
        innerWidth: payload,
      };
    },
  },
};
