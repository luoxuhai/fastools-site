import React, { Component } from 'react';
import { Button, Tooltip, message } from 'antd';
import { connect } from 'dva';
import { StarOutlined, MessageOutlined, ShareAltOutlined, StarFilled } from '@ant-design/icons';
import { queryTool, star } from '@/services/tool';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from './index.less';

const buttons = [
  {
    title: '收藏',
    icon: <StarOutlined />,
  },
  {
    title: '反馈',
    icon: <MessageOutlined />,
  },
  {
    title: '分享',
    icon: <ShareAltOutlined />,
  },
];

@connect(({ global }) => ({}))
class Detail extends Component {
  state = {
    tool: {},
  };

  componentDidMount() {
    queryTool(this.props.match.params.id).then(res => {
      console.log(res);
      this.setState({
        tool: res,
      });
      this.props.dispatch({
        type: 'global/setBreadcrumbName',
        payload: res.title,
      });
    });
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'global/setBreadcrumbName',
      payload: '',
    });
  }

  handleHeaderButton = (index: number) => {
    const { tool } = this.state;

    switch (index) {
      case 0:
        const id = tool._id;
        if (tool.isStar) {
          star({ id, method: 'del' });
          this.setState({
            tool: { ...tool, isStar: false },
          });
        } else {
          this.setState({
            tool: { ...tool, isStar: true },
          });
          star({ id, method: 'add' }).then(res => {});
        }
        break;
      case 1:
        window.open('https://support.qq.com/products/126066', 'feedback');
        break;
      case 2:
        message.success({ content: '已复制链接' });
    }
  };

  render() {
    const { tool } = this.state;
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          {buttons.map((item, index) => (
            <Tooltip title={item.title} key={item.title}>
              {index === 2 ? (
                <CopyToClipboard className={styles.headerButton} text={location.href}>
                  <Button onClick={() => this.handleHeaderButton(index)} type="primary" shape="circle" size="large" icon={item.icon} />
                </CopyToClipboard>
              ) : (
                <Button
                  className={styles.headerButton}
                  onClick={() => this.handleHeaderButton(index)}
                  type="primary"
                  shape="circle"
                  size="large"
                  icon={index === 0 && tool.isStar ? <StarFilled /> : item.icon}
                />
              )}
            </Tooltip>
          ))}
        </header>
        <iframe id="tool" title="tool" className={styles.iframe} width="100%" src="http://172.17.219.145:8001/#/" allow="payment" />
      </div>
    );
  }
}

export default Detail;
