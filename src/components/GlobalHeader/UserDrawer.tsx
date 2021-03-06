import React, { useEffect, useState } from 'react';
import { Avatar, Tabs, List, Button, Skeleton } from 'antd';
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
  const [userInfo, setUserInfo]: any = useState({ ...user, star_list: [1, 1], views_list: [1, 1] });

  useEffect(() => {
    queryUserSpace().then(res => {
      if (!res._id) return;
      setUserInfo({ ...userInfo, ...res });
      setLoading(false);
    });
  }, []);

  function handlePay() {
    dispatch({
      type: 'global/changePayPaneVisible',
      payload: true,
    });
  }

  return (
    <>
      <div className={styles.user}>
        <Skeleton active avatar paragraph={{ rows: 1 }} loading={loading}>
          {userInfo.avatar ? (
            <Avatar size="default" className={styles.avatar} src={userInfo.avatar} alt="avatar" />
          ) : (
            <ReactAvatar className={styles.avatar} name={userInfo.nickname} size="60" round />
          )}
          <div className={styles.userInfo}>
            <h2>{user.nickname}</h2>
            <div className={styles.vipContainer}>
              {userInfo.vip_expires && <h4>会员到期:{userInfo.vip_expires}</h4>}
              <Button onClick={handlePay} type="primary" danger>
                {userInfo.vip_expires ? '续费' : '充值VIP'}
              </Button>
            </div>
          </div>
        </Skeleton>
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
            <List
              itemLayout="horizontal"
              dataSource={userInfo[item.dataKey]}
              locale={{ emptyText: '暂无数据' }}
              renderItem={(item: any) => (
                <List.Item>
                  <Skeleton active avatar title={{ width: '8em' }} paragraph={{ rows: 2 }} loading={loading}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.cover} />}
                      title={
                        <a href={`/${item.tool_type}/${item.alias}`} target="_blank">
                          {item.title}
                        </a>
                      }
                      description={<p className={styles.description}>{item.desc}</p>}
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </>
  );
});
