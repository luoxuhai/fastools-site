import { NavNameMap } from '@/components/ToolList';

export default {
  namespace: 'global',

  state: {
    loginPaneVisible: false,
    payPaneVisible: false,
    innerWidth: window.innerWidth,
    loggingin: false,
    breadcrumbName: '',
    isClickNavbar: false,
  },

  subscriptions: {
    history({ history }: any) {
      history.listen((location: Location) => {
        const name: any = location.pathname.slice(1);
        let title = '';

        if (name === 'login') title = '登录-快用工具-好快又好用-在线工具';
        else if (NavNameMap[name]) title = `${NavNameMap[name]}-快用工具-好快又好用-在线工具`;
        else title = '快用工具-好快又好用-在线工具';
        document.title = title;

        window.scrollTo(0, 0);
      });
    },
  },

  effects: {},

  reducers: {
    changeLoginPaneVisible(state: any, { payload }: any) {
      return {
        ...state,
        loginPaneVisible: payload,
      };
    },

    changePayPaneVisible(state: any, { payload }: any) {
      return {
        ...state,
        payPaneVisible: payload,
      };
    },

    setInnerWidth(state: any, { payload }: any) {
      return {
        ...state,
        innerWidth: payload,
      };
    },

    changeLoggingin(state: any, { payload }: any) {
      return {
        ...state,
        loggingin: payload,
      };
    },

    setBreadcrumbName(state: any, { payload }: any) {
      return {
        ...state,
        breadcrumbName: payload,
      };
    },

    changeClickNavbar(state: any, { payload }: any) {
      return {
        ...state,
        isClickNavbar: payload,
      };
    },
  },
};
