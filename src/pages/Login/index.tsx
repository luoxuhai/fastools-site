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
      window.localStorage.setItem(
        'access_token',
        location.hash
          .split('=')[1]
          .split('&')
          .shift() || '',
      );
    }
  }, []);

  return (
    <div style={styles.normal}>
      <Alert message="QQ登录中..." type="info" showIcon />
    </div>
  );
});
