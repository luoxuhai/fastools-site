import React, { useEffect } from 'react';
import { Alert } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';

const styles = {
  normal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
};

export default connect(({ global }: any) => ({ ...global }))(({ dispatch }: any) => {
  useEffect(() => {
    let access_token = '';
    try {
      access_token =
        location.hash
          .split('=')[1]
          .split('&')
          .shift() || '';
    } catch {
      router.replace('/');
    }

    dispatch({
      type: 'global/changeLogging',
      payload: true,
    });

    if (window.QC.Login.check()) {
      if (window.isMobile)
        dispatch({
          type: 'login/login',
          payload: {
            access_token,
          },
        });
      else window.localStorage.setItem('access_token', access_token);

      window.localStorage.removeItem('access_token');
    }

    router.replace('/');

    return () => {
      dispatch({
        type: 'global/changeLogging',
        payload: false,
      });
    };
  }, []);

  return (
    <div style={styles.normal}>
      <Alert message="QQ登录中..." type="info" showIcon />
    </div>
  );
});
