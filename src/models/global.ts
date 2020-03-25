import router from 'umi/router';
import { NavNameMap } from '@/components/ToolList';
import { pushUrl } from '@/utils/utils';

export default {
  namespace: 'global',

  state: {
    loginPaneVisible: false,
    payPaneVisible: false,
    visibleDrawer: false,
    innerWidth: window.innerWidth,
    logging: false,
    breadcrumbName: '',
    isClickNavbar: false,
  },

  subscriptions: {
    history({ history }: any) {
      history.listen((location: Location) => {
        window.scrollTo(0, 0);
        const name: any = location.pathname.slice(1);
        let title = '快用工具 - 又快又好用的在线工具网';

        if (location.pathname.slice(1).split('/').length >= 3) {
          router.replace('/exception/404');
          return;
        }

        if (name === 'login') title = '登录 - 快用工具 - 又快又好用的在线工具网';
        if (NavNameMap[name]) title = `${NavNameMap[name]} - 快用工具 - 又快又好用的在线工具网`;
        document.title = title;

        window.g_app._store.dispatch({
          type: 'global/changeClickNavbar',
          payload: true,
        });

        if (NavNameMap[name])
          window.g_app._store.dispatch({
            type: 'tool/queryTools',
            payload: {
              page: 1,
              per_page: window.isSpider ? 1000 :9,
              tool_type: name,
              loadMore: false,
            },
          });
        if (process.env.NODE_ENV === 'production')
          try {
            pushUrl();
          } catch (error) {}
      });
    },
  },

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

    changeVisibleDrawer(state: any, { payload }: any) {
      return {
        ...state,
        visibleDrawer: payload,
      };
    },

    setInnerWidth(state: any, { payload }: any) {
      return {
        ...state,
        innerWidth: payload,
      };
    },

    changeLogging(state: any, { payload }: any) {
      return {
        ...state,
        logging: payload,
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
