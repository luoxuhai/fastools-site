import React, { useEffect, useState } from 'react';
import { Avatar, Tabs, List, Button, Spin, Empty } from 'antd';
import { ClockCircleOutlined, StarOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import ReactAvatar from 'react-avatar';
import styles from './UserDrawer.less';
import { queryUserSpace } from '@/services/user';

const tabs = [
  {
    title: '我的收藏',
    dataKey: 'star_list',
  },
  {
    title: '浏览记录',
    dataKey: 'views_list',
  },
];

export default connect(({ login }: any) => ({ user: login.user }))(({ user, dispatch }: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    queryUserSpace().then(res => {
      if (!res._id) return;
      setLoading(false);
      dispatch({
        type: 'login/setUserInfo',
        payload: { user: res },
      });
    });
    return () => {};
  }, []);

  function handlePay() {
    dispatch({
      type: 'global/changePayPaneVisible',
      payload: true,
    });
  }

  return (
    <Spin spinning={loading}>
      <div className={styles.user}>
        {user.avatar ? (
          <Avatar size="default" className={styles.avatar} src={user.avatar} alt="avatar" />
        ) : (
          <ReactAvatar className={styles.avatar} name={user.nickname} size="60" round />
        )}
        <div className={styles.userInfo}>
          <h2>{user.nickname}</h2>
          <div className={styles.vipContainer}>
            {user.vip_expires && <h4>会员到期:{user.vip_expires}</h4>}
            <Button onClick={handlePay} type="primary" danger>
              {user.vip_expires ? '续费' : '充值VIP'}
            </Button>
          </div>
        </div>
      </div>
      <Tabs defaultActiveKey="0">
        {tabs.map((item, index) => (
          <Tabs.TabPane
            tab={
              <span>
                {index === 0 ? <StarOutlined /> : <ClockCircleOutlined />}
                {item.title}
              </span>
            }
            key={String(index)}
          >
            {user[item.dataKey] ? (
              <List
                itemLayout="horizontal"
                dataSource={user[item.dataKey]}
                renderItem={(item: any) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.cover} />}
                      title={
                        <a href={`/${item.tool_type}/${item.alias}`} target="_blank">
                          {item.title}
                        </a>
                      }
                      description={<p className={styles.description}>{item.desc}</p>}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </Spin>
  );
});
