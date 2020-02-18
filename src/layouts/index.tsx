import React from 'react';
import { Layout, BackTop, Breadcrumb } from 'antd';
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

export default withRouter(props => {
  const { location } = props;
  const pathSnippets = location.pathname.split('/').filter(i => i);

  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
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
    <Layout className={styles.layout}>
      <BackTop className={styles.backtop} />
      <Feedback />
      <GlobalHeader />
      <Layout.Content className={styles.content}>
        <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        <div>{props.children}</div>
      </Layout.Content>
      <GlobalFooter />
    </Layout>
  );
});
