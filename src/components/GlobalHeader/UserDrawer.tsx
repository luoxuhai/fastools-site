import React from 'react';
import { Drawer, Avatar, Tabs, List, Button } from 'antd';
import { ClockCircleOutlined, StarOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import ReactAvatar from 'react-avatar';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import styles from './UserDrawer.less';

dayjs.extend(customParseFormat);

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

export default connect(({ global, login }: any) => ({ ...global, login }))(
  ({ login: { user }, innerWidth, visible, onCloseDrawer, dispatch }: any) => {
    function handlePay() {
      dispatch({
        type: 'global/changePayPaneVisible',
        payload: true,
      });
    }

    return (
      <Drawer
        className={styles.drawer}
        title="个人中心"
        placement="right"
        onClose={onCloseDrawer}
        width={360}
        closable={true}
        visible={visible}
      >
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
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane
            tab={
              <span>
                <StarOutlined />
                我的收藏
              </span>
            }
            key="1"
          ></Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <span>
                <ClockCircleOutlined />
                浏览记录
              </span>
            }
            key="2"
          >
            <div className={styles.list}>
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={<a href="https://ant.design">{item.title}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />
            </div>
          </Tabs.TabPane>
        </Tabs>
      </Drawer>
    );
  },
);
