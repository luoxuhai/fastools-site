import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Icon } from 'antd';
import NavLink from 'umi/navlink';
import UserDrawer from './UserDrawer';
import styles from './index.less';
import logo from '@/assets/icons/logo-large.png';

const navs = [
  {
    title: '首 页',
    link: '/',
  },
  {
    title: '文 档',
    link: '/doc',
  },
  {
    title: '图 像',
    link: '/image',
  },
  {
    title: '音 频',
    link: '/audio',
  },
  {
    title: '视 频',
    link: '/video',
  },
  {
    title: '其 他',
    link: '/othor',
  },
];

export default () => {
  const [visibeDrawer, setVisibeDrawer] = useState(false);

  function handelSelectMenuClick({ key }: any) {
    if (key === 'center') {
      setVisibeDrawer(true);
    }
  }

  function handleNavbarClick() {}

  const menuHeaderDropdown = (
    <Menu className={styles.menu} onClick={handelSelectMenuClick}>
      <Menu.Item key="center">
        <Icon type="user" />
        个人中心
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <Icon type="logout" />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Layout.Header className={styles.header} style={{ width: '100%' }}>
        <div className={styles.logo}>
          <NavLink to={navs[0].link}>
            <img src={logo} alt="" />
          </NavLink>
        </div>
        <Menu
          style={{ lineHeight: '64px' }}
          selectedKeys={[location.pathname]}
          onClick={handleNavbarClick}
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={['/']}
          subMenuCloseDelay={0}
        >
          {navs.map(item => (
            <Menu.Item key={item.link}>
              <NavLink to={item.link}>{item.title}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
        <div className={styles.login}>
          <Dropdown overlay={menuHeaderDropdown}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="default"
                className={styles.avatar}
                src="https://upload.jianshu.io/users/upload_avatars/5493072/246aabc7-01de-4df6-b5d4-9c6e1293bed4.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120"
                alt="avatar"
              />
              <span className={styles.name}>用户名</span>
            </span>
          </Dropdown>
        </div>
      </Layout.Header>
      <UserDrawer onCloseDrawer={() => setVisibeDrawer(false)} visible={visibeDrawer} />
    </>
  );
};
