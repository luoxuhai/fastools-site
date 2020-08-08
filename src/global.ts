import localforage from 'localforage';
import { supportCSS3, disableReactDevTools } from '@/utils/utils';

window.isSpider = /spider/i.test(window.navigator.userAgent);

localforage.config({
  name: 'fastools',
  driver: localforage.LOCALSTORAGE,
});

function initUserInfo() {
  localforage.getItem('user').then((value: any) => {
    if (value) {
      window.g_app._store.dispatch({
        type: 'login/setUserInfo',
        payload: { user: value.user, token: value.token },
      });

      window.g_app._store.dispatch({
        type: 'login/queryUserInfo',
        payload: value.token,
      });

      window.g_app._store.dispatch({
        type: 'login/refreshToken',
        payload: value.user,
      });
    } else
      window.g_app._store.dispatch({
        type: 'login/logout',
      });
  });
}

initUserInfo();

window.addEventListener('resize', (e) => {
  window.g_app._store.dispatch({
    type: 'global/setInnerWidth',
    payload: e.target.innerWidth,
  });
});

window.supportCSS3 = supportCSS3;

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = false;
}

const hiddenProperty =
  'hidden' in document ? 'hidden' : 'webkitHidden' in document ? 'webkitHidden' : 'mozHidden' in document ? 'mozHidden' : '';

if (hiddenProperty) {
  const visibilityChangeEvent = hiddenProperty?.replace(/hidden/i, 'visibilitychange') || '';
  document.addEventListener(visibilityChangeEvent, () => {
    if (!document[hiddenProperty]) {
      initUserInfo();
    }
  });
}

window.addEventListener('sw.updated', (e) => {
  console.log('sw.updated');
  e.detail.update();
});
