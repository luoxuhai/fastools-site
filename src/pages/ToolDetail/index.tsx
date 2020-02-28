import React, { Component } from 'react';
import { Button, Tooltip, Collapse, Card, Avatar, Modal, Alert, Spin, message, notification } from 'antd';
import { connect } from 'dva';
import {
  StarOutlined,
  MessageOutlined,
  ShareAltOutlined,
  StarFilled,
  QuestionCircleOutlined,
  QuestionCircleFilled,
} from '@ant-design/icons';
import Link from 'umi/link';
// import AES from 'crypto-js/aes';
// import encUtf8 from 'crypto-js/enc-utf8';
// import modeEcb from 'crypto-js/mode-ecb';
// import padPkcs7 from 'crypto-js/pad-pkcs7';
import { prefix } from '@/utils/request.js';
import { queryTool, star } from '@/services/tool';
import { queryVipExpires } from '@/services/user';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { monitorConsole, requestFullScreen, exitFullscreen } from '@/utils/utils';
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
  {
    title: '使用说明',
    icon: <QuestionCircleOutlined />,
  },
];

interface IProps {
  dispatch: Function;
  match: any;
  token: string;
}
interface IState {
  tool: any;
  similarity: any[];
  visibleHelp: boolean;
  visibleFrame: boolean;
  loading: boolean;
  iframeHeight: number | undefined;
}

@connect(({ login }) => ({ token: login.token }))
class Detail extends Component<IProps, IState> {
  state = {
    tool: {},
    similarity: [],
    visibleHelp: true,
    visibleFrame: true,
    loading: true,
    iframeHeight: undefined,
  };

  componentDidMount() {
    const alias = this.props.match.params.id;
    const { token } = this.props;

    // monitorConsole(
    //   () => {
    //     this.setState({
    //       visibleFrame: false,
    //     });
    //     Modal.warning({
    //       title: '警告',
    //       content: '请按F12键或其他方式关闭控制台!',
    //       okText: '知道了',
    //     });
    //   },
    //   () => {
    //     this.setState({
    //       visibleFrame: true,
    //     });
    //     Modal.destroyAll();
    //   },
    // ).init();

    window.addEventListener('message', (event: any) => {
      const { token, dispatch }: any = this.props;

      // window.frames.tool?.postMessage(true, '*');
      if (event.data === 'noaccess') {
        if (token) {
          dispatch({
            type: 'global/changePayPaneVisible',
            payload: true,
          });
        } else {
          dispatch({
            type: 'global/changeLoginPaneVisible',
            payload: true,
          });
        }
      } else if (event.data === 'undefined') {
        const hide = message.loading('获取权限中...', 0);
        queryVipExpires().then(res => {
          hide();
          window.frames.tool?.postMessage(res.user_type === 'vip', '*');
        });
      } else if (event.data === 'loaded') {
        this.setState({
          loading: false,
        });

        if (token)
          queryVipExpires().then(res => {
            window.frames.tool?.postMessage(res.user_type === 'vip', '*');
          });
        else window.frames.tool?.postMessage(false, '*');
      } else if (Number(event.data).toString() !== 'NaN') {
        this.setState({
          iframeHeight: Number(event.data),
        });
      }
    });

    queryTool(alias).then(res => {
      this.setState({
        tool: res.tool,
        similarity: res.similarity,
      });
      this.props.dispatch({
        type: 'global/setBreadcrumbName',
        payload: res.tool.title,
      });
      this.openNotification();
      document.title = res.tool.title + '-快用工具-好快又好用-在线工具';
    });
  }

  componentWillUnmount() {
    notification.destroy();
    Modal.destroyAll();
    this.props.dispatch({
      type: 'global/setBreadcrumbName',
      payload: '',
    });
  }

  openNotification = () => {
    const { tool }: IState = this.state;
    this.setState({
      visibleHelp: true,
    });
    const args = {
      message: '使用说明',
      description: tool.direction,
      duration: 0,
      top: 70,
      icon: <QuestionCircleOutlined style={{ color: '#52c41a' }} />,
      onClose: () => {
        this.setState({
          visibleHelp: false,
        });
      },
    };
    notification.open(args);
  };

  handleHeaderButton = (index: number) => {
    const { tool, visibleHelp }: IState = this.state;
    const { token, dispatch }: IProps = this.props;

    switch (index) {
      case 0:
        const id = tool._id;
        if (!token) {
          dispatch({
            type: 'global/changeLoginPaneVisible',
            payload: true,
          });
          return;
        }
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
        break;
      case 3:
        if (visibleHelp) return;
        this.openNotification();
    }
  };

  render() {
    const { tool, similarity, visibleHelp, visibleFrame, loading, iframeHeight }: IState = this.state;
    return (
      <div className={styles.container} id="toolContainer">
        <header className={styles.header}>
          <Avatar src={tool.cover} />
          <h2 className={styles.headerTitle}>{tool.title}</h2>
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
                  icon={index === 0 && tool.isStar ? <StarFilled /> : index === 3 && visibleHelp ? <QuestionCircleFilled /> : item.icon}
                />
              )}
            </Tooltip>
          ))}
        </header>
        {visibleFrame ? (
          <Spin spinning={loading} tip="加载工具中...">
            <iframe
              className={styles.iframe}
              id="tool"
              name="tool"
              height={iframeHeight}
              src={`${prefix}/tools/static/${this.props.match.params.id}.html`}
              allow="payment"
            />
          </Spin>
        ) : (
          <Alert
            message="警告"
            description="请按F12键或其他方式关闭控制台(Press F12 or otherwise to close the console)!"
            type="warning"
            showIcon
          />
        )}

        <Collapse className={styles.collapse} defaultActiveKey={['0', '1']}>
          <Collapse.Panel header="工具介绍" key="0">
            <p aria-label="工具介绍">{tool.desc}</p>
          </Collapse.Panel>
          <Collapse.Panel header="使用说明" key="1">
            <p aria-label="使用说明">{tool.direction}</p>
          </Collapse.Panel>
        </Collapse>

        <Card className={styles.card} title="推荐工具">
          {similarity.map((item: any) => (
            <Link to={`/${item.tool_type}/${item.alias}`} target="_blank" title={item.title} aria-label={item.title}>
              <Card.Grid className={styles.cardItem} key={item._id}>
                <Card.Meta avatar={<Avatar src={item.cover} />} title={item.title} description={item.desc + '...'} />
              </Card.Grid>
            </Link>
          ))}
        </Card>
      </div>
    );
  }
}

export default Detail;
