import React from 'react';
import { Tooltip } from 'antd';
import styles from './index.less';

export default () => {
  return (
    <div className={styles.feedback} onClick={() => window.open('https://support.qq.com/products/126066', 'feedback')}>
      <Tooltip title="反馈建议" placement="left">
        <div className={styles.img}></div>
      </Tooltip>
    </div>
  );
};
