import React from 'react';
import { Layout, BackTop, Breadcrumb, Spin } from 'antd';
import { connect } from 'dva';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';
import GlobalFooter from '@/components/GlobalFooter';
import GlobalHeader from '@/components/GlobalHeader';
import Feedback from '@/components/Feedback';
import styles from './index.less';

const breadcrumbNameMap: any = {
  '/doc': '文档',
  '/image': '图像',
  '/audio': '音频',
  '/video': '视频',
  '/othor': '其他',
};

export default withRouter(
  connect(({ global, login }: any) => ({ ...global, login }))((props: any) => {
    const { location, loggingin } = props;
    const pathSnippets = location.pathname.split('/').filter((i: any) => i);

    const extraBreadcrumbItems = pathSnippets.map((_: any, index: any) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
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

    return (
      <Spin spinning={loggingin} tip="QQ登录中，请稍后..." size="large">
        <Layout className={styles.layout}>
          <BackTop className={styles.backtop} />
          <Feedback />
          <GlobalHeader />
          <Layout.Content className={styles.content}>
            <Breadcrumb>{location.pathname !== '/' && breadcrumbItems}</Breadcrumb>
            <div>{props.children}</div>
          </Layout.Content>
          <GlobalFooter />
        </Layout>
      </Spin>
    );
  }),
);
