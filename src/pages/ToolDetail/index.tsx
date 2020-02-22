import React, { Component } from 'react';
import { Button, Tooltip } from 'antd';
import { StarOutlined, MessageOutlined, ShareAltOutlined } from '@ant-design/icons';

import styles from './index.less';

const buttons = [
  {
    title: '收藏',
    icon: <StarOutlined />,
  },
  {
    title: '反馈',
    icon: <MessageOutlined />,
  },
  {
    title: '分享',
    icon: <ShareAltOutlined />,
  },
];

class Detail extends Component {
  render() {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          {buttons.map(item => (
            <Tooltip title={item.title} key={item.title}>
              <Button className={styles.headerButton} type="primary" shape="circle" size="large" icon={item.icon} />
            </Tooltip>
          ))}
        </header>
        <iframe
          id="tool"
          title="tool"
          className={styles.iframe}
          width="100%"
          src="http://172.17.219.145:8001/#/"
          allow="payment"
        />
      </div>
    );
  }
}

export default Detail;
