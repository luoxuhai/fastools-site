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

// const date = new Date();
// if (location.pathname === '/' && date.getMonth() === 3 && date.getDate() > 3 && date.getDate() < 7) {
//   const style: Element = document.createElement('style');
//   style.appendChild(
//     document.createTextNode(`
//   html {
// 	filter: grayscale(100%);
// 	-webkit-filter: grayscale(100%);
// 	-moz-filter: grayscale(100%);
// 	-ms-filter: grayscale(100%);
// 	-o-filter: grayscale(100%);
// 	filter: url("data:image/svg+xml;
// 	utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale");
// 	filter:progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
// 	-webkit-filter: grayscale(1);
// }`),
//   );
//   document.head.appendChild(style);
// }
