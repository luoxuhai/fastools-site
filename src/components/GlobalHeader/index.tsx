import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Button } from 'antd';
import { connect } from 'dva';
import { UserOutline } from '@ant-design/icons';
import NavLink from 'umi/navlink';
import withRouter from 'umi/withRouter';
import ReactAvatar from 'react-avatar';
import UserDrawer from './UserDrawer';
import Login from '@/components/Login';
import styles from './index.less';
import logo from '@/assets/icons/logo.svg';
import logoLarge from '@/assets/icons/logo-large.png';

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

export default withRouter(
  connect(({ global, login }: any) => ({ ...global, login }))(({ login, innerWidth, dispatch }: any) => {
    const [visibeDrawer, setVisibeDrawer] = useState(false);

    function handelSelectMenuClick({ key }: any) {
      if (key === 'center') {
        setVisibeDrawer(true);
      }
    }

    function handelShowLoginPane() {
      dispatch({
        type: 'global/changeLoginPaneVisible',
        payload: true,
      });
    }

    function handleNavbarClick() {}

    function logout() {
      dispatch({
        type: 'login/changeLoginStatus',
        payload: false,
      });
    }

    const menuHeaderDropdown = (
      <Menu className={styles.menu} onClick={handelSelectMenuClick}>
        <Menu.Item key="center">
          {/* <UserOutline /> */}
          个人中心
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={logout} key="logout">
          {/* <Icon type="logout" /> */}
          退出登录
        </Menu.Item>
      </Menu>
    );

    return (
      <>
        <Layout.Header className={styles.header} style={{ width: '100%' }}>
          <div className={styles.logo}>
            <NavLink to={navs[0].link}>
              <img src={innerWidth > 480 ? logoLarge : logo} alt="" />
            </NavLink>
          </div>
          <Menu
            className={styles.navbarMenu}
            selectedKeys={[location.pathname]}
            onClick={handleNavbarClick}
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['/']}
          >
            {navs.map(item => (
              <Menu.Item key={item.link}>
                <NavLink to={item.link}>{item.title}</NavLink>
              </Menu.Item>
            ))}
          </Menu>
          <div className={styles.login}>
            {login.token ? (
              <Dropdown overlay={menuHeaderDropdown}>
                <span className={`${styles.action} ${styles.account}`}>
                  {login.user.avatar ? (
                    <Avatar size="default" className={styles.avatar} src={login.user.avatar} alt="avatar" />
                  ) : (
                    <ReactAvatar className={styles.avatar} name={login.user.nickname} size="40" round />
                  )}
                  <span className={styles.name}>{login.user.nickname}</span>
                </span>
              </Dropdown>
            ) : (
              <Button onClick={handelShowLoginPane} type="primary">
                登录/注册
              </Button>
            )}
          </div>
        </Layout.Header>
        <UserDrawer onCloseDrawer={() => setVisibeDrawer(false)} visible={visibeDrawer} />
        <Login />
      </>
    );
  }),
);
