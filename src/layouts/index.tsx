import React, { useEffect } from 'react';
import { Layout, BackTop, Breadcrumb, Spin, Modal, Tooltip, notification } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';
import GlobalFooter from '@/components/GlobalFooter';
import GlobalHeader from '@/components/GlobalHeader';
import Feedback from '@/components/Feedback';
import Pay from '@/components/Pay';
import Login from '@/components/Login';
import styles from './index.less';

export default withRouter(
  connect(({ global, login }: any) => ({ ...global, login }))((props: any) => {
    const { location, logging, payPaneVisible, breadcrumbName, dispatch } = props;
    const pathSnippets = location.pathname.split('/').filter((i: any) => i);
    const breadcrumbNameMap: any = {
      '/doc': '文档',
      '/image': '图像',
      '/audio': '音频',
      '/video': '视频',
      '/other': '其他',
    };

    useEffect(() => {
      const skeleton: any = document.querySelector('.skeleton');
      const root: any = document.querySelector('#root');
      skeleton.style.display = 'none';
      root.style.display = 'block';

      if (!/Chrome|Firefox/g.test(window.navigator.userAgent))
        notification.warning({
          message: `温馨提示`,
          description: (
            <p>
              请使用最新版
              <a href="https://www.google.cn/intl/zh-CN/chrome/" target="_blank">
                谷歌
              </a>
              、
              <a href="http://www.firefox.com.cn/" target="_blank">
                火狐
              </a>
              、
              <a href="https://browser.qq.com/" target="_blank">
                QQ
              </a>
              、
              <a href="https://browser.360.cn/ee/" target="_blank">
                360
              </a>
              &nbsp; 浏览器等浏览器
            </p>
          ),
          placement: 'topLeft',
          duration: null,
        });

      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent)) {
        notification.warning({
          message: `温馨提示`,
          description: '请使用电脑浏览，以获得更好体验',
          placement: 'topLeft',
          duration: null,
        });
        window.isMobile = true;
      } else window.isMobile = false;
    }, []);

    const extraBreadcrumbItems = pathSnippets.map((_: any, index: any) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      if (!breadcrumbNameMap[url]) breadcrumbNameMap[url] = breadcrumbName;

      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{breadcrumbNameMap[url]}</Link>
        </Breadcrumb.Item>
      );
    });

    const breadcrumbItems = [
      <Breadcrumb.Item key="home">
        <Link to="/">好用工具</Link>
      </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    function handleCancelPay() {
      dispatch({
        type: 'global/changePayPaneVisible',
        payload: false,
      });
    }

    return (
      <Spin spinning={logging} tip="QQ登录中，请稍后..." size="large">
        <Layout className={styles.layout}>
          <GlobalHeader />
          <Layout.Content
            className={styles.content}
            style={{ paddingTop: location.pathname.slice(0, -1).split('/').length === 3 ? 36 : undefined }}
          >
            {!/(exception)|(^\/$)/.test(location.pathname) && <Breadcrumb className={styles.breadcrumb}>{breadcrumbItems}</Breadcrumb>}
            <div>{props.children}</div>
          </Layout.Content>
          <Tooltip className={styles.backtopContainer} title="返回顶部" placement="left">
            <BackTop className={styles.backtop} />
          </Tooltip>
          <Feedback />
          <Modal
            title="VIP升级(享全站工具)"
            visible={payPaneVisible}
            onCancel={handleCancelPay}
            maskClosable={false}
            destroyOnClose
            width={800}
            zIndex={1002}
            footer={null}
          >
            <Pay />
          </Modal>
          <Login />
          <GlobalFooter />
        </Layout>
      </Spin>
    );
  }),
);
