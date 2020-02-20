window.addEventListener('resize', e => {
  window.g_app._store.dispatch({
    type: 'global/setInnerWidth',
    payload: e.target.innerWidth,
  });
});
