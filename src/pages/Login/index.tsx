import React, { useEffect } from 'react';
import { Alert } from 'antd';
import { connect } from 'dva';

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
    dispatch({
      type: 'global/changeLoggingin',
      payload: true,
    });

    if (window.QC.Login.check()) {
      const access_token =
        location.hash
          .split('=')[1]
          .split('&')
          .shift() || '';

      if (!window.isMobile) window.localStorage.setItem('access_token', access_token);
      dispatch({
        type: 'login/login',
        payload: {
          access_token,
        },
      });

      window.localStorage.removeItem('access_token');
    }

    return () => {
      dispatch({
        type: 'global/changeLoggingin',
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
