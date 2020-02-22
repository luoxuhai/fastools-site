import localforage from 'localforage';

window.addEventListener('resize', e => {
  window.g_app._store.dispatch({
    type: 'global/setInnerWidth',
    payload: e.target.innerWidth,
  });
});

localforage.iterate((value, key) => {
  // 此回调函数将对所有 key/value 键值对运行
  if (key === 'user')
    window.g_app._store.dispatch({
      type: 'login/setUserInfo',
      payload: value,
    });
});
