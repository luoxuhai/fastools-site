import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Button, Modal, Drawer } from 'antd';
import { connect } from 'dva';
import { UserOutlined, LogoutOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import NavLink from 'umi/navlink';
import withRouter from 'umi/withRouter';
import ReactAvatar from 'react-avatar';
import UserDrawer from './UserDrawer';
import Search from '@/components/Search';
import styles from './index.less';

const logo = 'https://fastools.oss-cn-hangzhou.aliyuncs.com/images/logo.svg';
const logoLarge = 'https://fastools.oss-cn-hangzhou.aliyuncs.com/images/logo-large.png?x-oss-process=style/fade';
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
    link: '/other',
  },
];

export default withRouter(
  connect(({ global, login }: any) => ({ innerWidth: global.innerWidth, login }))(({ login, innerWidth, dispatch }: any) => {
    const [visibleDrawer, setVisibleDrawer] = useState(false);

    function handelSelectMenuClick({ key }: any) {
      if (key === 'center') {
        setVisibleDrawer(true);
      }
    }

    function handelShowLoginPane() {
      dispatch({
        type: 'global/changeLoginPaneVisible',
        payload: true,
      });
    }

    function handleNavbarClick(e: any) {
      dispatch({
        type: 'global/changeClickNavbar',
        payload: true,
      });
      if (e.key !== '/')
        dispatch({
          type: 'tool/queryTools',
          payload: {
            page: 1,
            per_page: 9,
            tool_type: e.key.replace('/', ''),
            loadMore: false,
          },
        });
    }

    function logout() {
      Modal.confirm({
        title: '确认退出登录?',
        icon: <ExclamationCircleOutlined />,
        cancelText: '取消',
        okText: '确认',
        maskClosable: true,
        onOk() {
          dispatch({
            type: 'login/logout',
          });
        },
      });
    }

    const menuHeaderDropdown = (
      <Menu className={styles.menu} onClick={handelSelectMenuClick}>
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item onClick={logout} key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );

    return (
      <>
        <Layout.Header
          className={styles.header}
          style={{ position: location.pathname.slice(0, -1).split('/').length === 3 ? 'static' : undefined }}
        >
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
                <NavLink to={item.link} title={item.title} aria-label={item.title}>
                  {item.title}
                </NavLink>
              </Menu.Item>
            ))}
          </Menu>
          {innerWidth >= 768 && location.pathname !== '/' && <Search full={false} />}
          <div className={styles.login}>
            {login.token ? (
              <Dropdown overlay={menuHeaderDropdown}>
                <div className={styles.userContainer}>
                  {login.user.avatar ? (
                    <Avatar size="default" className={styles.avatar} src={login.user.avatar} alt="avatar" />
                  ) : (
                    <ReactAvatar className={styles.avatar} name={login.user.nickname} size="40" round />
                  )}
                  <span className={styles.name}>{login.user.nickname}</span>
                </div>
              </Dropdown>
            ) : (
              <Button onClick={handelShowLoginPane} type="primary">
                登录/注册
              </Button>
            )}
          </div>
        </Layout.Header>
        <Drawer
          title="个人中心"
          placement="right"
          onClose={() => setVisibleDrawer(false)}
          width={360}
          visible={visibleDrawer}
          closable
          destroyOnClose
          zIndex={1100}
        >
          <UserDrawer />
        </Drawer>
      </>
    );
  }),
);
