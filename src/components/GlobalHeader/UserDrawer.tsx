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
  ({ login, innerWidth, visible, onCloseDrawer, dispatch }: any) => {
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
          {login.user.avatar ? (
            <Avatar size="default" className={styles.avatar} src={login.user.avatar} alt="avatar" />
          ) : (
            <ReactAvatar className={styles.avatar} name={login.user.nickname} size="60" round />
          )}
          <div className={styles.userInfo}>
            <h2>{login.user.nickname}</h2>
            <div className={styles.vipContainer}>
              <h4>会员到期:{dayjs('2019-11-20T08:21:51.972Z').format('YYYY-MM-DD')}</h4>
              <Button className={styles.payButton} onClick={handlePay} type="primary" danger>
                续费
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
