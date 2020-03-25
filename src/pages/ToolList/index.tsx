import React, { Component } from 'react';
import { Spin, Button } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import { ToolList, NavNameMap } from '@/components/ToolList';
import styles from './index.less';

class ToolListPage extends Component {
  componentDidMount() {
    const { isClickNavbar, dispatch, match }: any = this.props;
    const id = match.params.id;
    if (!NavNameMap[id]) {
      router.replace('/exception/404');
      return;
    }

    if (isClickNavbar) return;

    dispatch({
      type: 'tool/queryTools',
      payload: {
        page: 1,
        per_page: window.isSpider ? 1000 :9,
        tool_type: id,
        loadMore: false,
      },
    });
  }

  handleLoadMore = () => {
    const { dispatch, match, currentPage }: any = this.props;

    dispatch({
      type: 'changeLoading',
      payload: true,
    });

    dispatch({
      type: 'tool/queryTools',
      payload: {
        page: currentPage + 1,
        per_page: 9,
        tool_type: match.params.id,
        loadMore: true,
      },
    });
  };

  render() {
    const { tools, currentPage, totalPage, loading }: any = this.props;

    return (
      <Spin spinning={!tools.length} tip="加载中...">
        <div className={styles.container}>
          <ToolList tools={tools} title="全部" />
          {currentPage < totalPage && tools.length && (
            <Button className={styles.loadMore} loading={loading} onClick={this.handleLoadMore} type="primary" shape="round" size="large">
              加载更多
            </Button>
          )}
        </div>
      </Spin>
    );
  }
}

export default connect(({ tool, global }: any) => ({
  tools: tool.tools,
  currentPage: tool.currentPage,
  totalPage: tool.totalPage,
  isClickNavbar: global.isClickNavbar,
}))(ToolListPage);
