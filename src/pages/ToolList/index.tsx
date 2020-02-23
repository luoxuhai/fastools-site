import React, { Component } from 'react';
import { Avatar, Card, Tag, Spin } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import { queryTools, EToolType } from '@/services/tool';
import styles from './index.less';

const NavNameMap: any = {
  doc: '文档',
  image: '图像',
  audio: '音频',
  video: '视频',
  other: '其他',
};

@connect(({ tool }) => ({
  tools: tool.tools,
}))
class ToolList extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    if (!NavNameMap[id]) {
      router.replace('/exception/404');
      return;
    }

    this.props.dispatch({
      type: 'tool/queryTools',
      payload: {
        page: 1,
        per_page: 10,
        tool_type: id,
      },
    });
  }

  handleToDetail = ({ alias, tool_type }: any) => {
    router.push(`/${tool_type}/${alias}`);
  };

  render() {
    const { tools } = this.props;
    return (
      <Spin spinning={!tools.length} tip="加载中...">
        <div className={styles.container}>
          <Card className={styles.card} title="全部">
            {tools.map((item: any) => (
              <Card.Grid className={styles.cardItem} key={item?._id}>
                <div onClick={() => this.handleToDetail(item)}>
                  <header className={styles.header}>
                    <Avatar src={item.cover} size="large" />
                    <h2 className={styles.title}>
                      <Link to={`/${item.tool_type}/${item.alias}`}>{item.title}</Link>
                    </h2>
                  </header>
                  <p className={styles.description}>{item.desc}</p>
                  <footer className={styles.footer}>
                    <Tag className={styles.tag} color="#4fc08d">
                      <Link to={`/${item.tool_type}`}>{NavNameMap[item.tool_type]}</Link>
                    </Tag>
                    <div className={styles.views}>
                      <EyeOutlined />
                      <span className={styles.viewsText}>{item.views_count}</span>
                    </div>
                  </footer>
                </div>
              </Card.Grid>
            ))}
          </Card>
        </div>
      </Spin>
    );
  }
}

export default ToolList;
