import localforage from 'localforage';
import { queryUser } from '@/services/user';

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

    queryUser().then(res => {
      window.g_app._store.dispatch({
        type: 'login/setUserInfo',
        payload: {
          user: res,
          token: value.token,
        },
      });
    });
  }
});
