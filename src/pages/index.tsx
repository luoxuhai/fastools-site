import React, { Component } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { ToolList } from '@/components/ToolList';
import Search from '@/components/Search';
import styles from './index.less';
import { queryTools, EToolType } from '@/services/tool';

@connect(({ tool }) => ({
  tools: tool.tools,
  currentPage: tool.currentPage,
  totalPage: tool.totalPage,
}))
class Home extends Component {
  state = {
    recommend: [],
  };

  componentDidMount() {
    queryTools({ tool_type: EToolType.recommend }).then((res: any) => {
      this.setState({
        recommend: res.tools,
      });
    });

    this.props.dispatch({
      type: 'tool/queryTools',
      payload: {
        page: 1,
        per_page: 9,
        tool_type: 'new',
        loadMore: false,
      },
    });
  }

  handleLoadMore = () => {
    const { dispatch, currentPage }: any = this.props;

    dispatch({
      type: 'changeLoading',
      payload: true,
    });

    dispatch({
      type: 'tool/queryTools',
      payload: {
        page: currentPage + 1,
        per_page: 9,
        tool_type: 'new',
        loadMore: true,
      },
    });
  };

  render() {
    const { tools, currentPage, totalPage, loading }: any = this.props;
    const { recommend }: any = this.state;

    return (
      <>
        <Search />
        <ToolList title="推荐工具" tools={recommend} />
        <div className={styles.newContainer}>
          <ToolList title="最新上线" tools={tools} />
          {currentPage < totalPage && tools.length && (
            <Button className={styles.loadMore} loading={loading} onClick={this.handleLoadMore} type="primary" shape="round" size="large">
              加载更多
            </Button>
          )}
        </div>
      </>
    );
  }
}

export default Home;
