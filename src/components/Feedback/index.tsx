import React from 'react';
import { Tooltip } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

import Tucao from '@/utils/tucao.js';
import styles from './index.less';

export function openFeedback(info: any = {}) {
  const user = window.g_app._store.getState().login.user;
  let data: any = {
    clientInfo: navigator.userAgent,
    ...info,
  };

  if (user._id)
    data = {
      nickname: user.nickname,
      avatar: user.avatar || 'https://oss.aliyuncs.com/aliyun_id_photo_bucket/default_handsome.jpg',
      openid: user._id,
      ...data,
    };

  Tucao.request(126066, data);
}

export default () => {
  return (
    <div className={styles.feedback} onClick={() => openFeedback()}>
      <Tooltip title="反馈建议" placement="left">
        <MessageOutlined className={styles.icon} />
      </Tooltip>
    </div>
  );
};
