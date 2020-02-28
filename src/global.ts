import localforage from 'localforage';
import { supportCSS3, disableReactDevTools } from '@/utils/utils';

window.addEventListener('resize', e => {
  window.g_app._store.dispatch({
    type: 'global/setInnerWidth',
    payload: e.target.innerWidth,
  });
});

localforage.iterate((value: any, key: string) => {
  if (key === 'user') {
    window.g_app._store.dispatch({
      type: 'login/setUserInfo',
      payload: value,
    });

    window.g_app._store.dispatch({
      type: 'login/queryUserInfo',
    });
  }
});

window.supportCSS3 = supportCSS3;

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = false;
}
