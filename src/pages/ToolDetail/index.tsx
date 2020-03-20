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
// import AES from 'crypto-js/aes';
// import encUtf8 from 'crypto-js/enc-utf8';
// import modeEcb from 'crypto-js/mode-ecb';
// import padPkcs7 from 'crypto-js/pad-pkcs7';
import { prefix } from '@/utils/request.js';
import { queryTool, star } from '@/services/tool';
import { queryVipExpires, IQueryVipExpires } from '@/services/user';
import { openFeedback } from '@/components/Feedback';
import PayModal from './components/PayModal';
import Similarity from './components/Similarity';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { monitorConsole, postMessage, UnloadConfirm } from '@/utils/utils';
import styles from './index.less';
import tool from 'mock/tool';

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
  visibleHelp: boolean;
  visibleFrame: boolean;
  visiblePayModal: boolean;
  loading: boolean;
  visibleInput: boolean;
  toolUrl: string;
  alias: string;
  iframeHeight: string | undefined;
}

function hasFree(cost: string): boolean {
  if (cost === 'free') {
    postMessage('auth', true);
    return true;
  } else return false;
}

function queryAccess(params?: IQueryVipExpires) {
  queryVipExpires(params)
    .then(res => {
      postMessage('auth', res.user_type === 'vip' || res.user_type === 'trial');
    })
    .catch(() => {
      postMessage('auth', false);
    });
}

class ToolDetailPage extends Component<IProps, IState> {
  state = {
    tool: {},
    visibleHelp: false,
    visibleFrame: true,
    visiblePayModal: false,
    loading: true,
    iframeHeight: undefined,
    visibleInput: false,
    toolUrl: '',
    alias: this.props.match.params.id
  };
  consoleInterval: any = null;
  accessInterval: any = null;
  cost: string = 'vip';

  componentDidMount() {
    const { alias } = this.state;

    UnloadConfirm.set();
    process.env.NODE_ENV === 'production' &&
      (this.consoleInterval = monitorConsole(
        () => {
          this.setState({
            visibleFrame: false,
          });
          Modal.warning({
            title: '警告',
            content: '请按F12键或其他方式关闭控制台!',
            okText: '知道了',
          });
        },
        () => {
          this.setState({
            visibleFrame: true,
          });
          Modal.destroyAll();
        },
      ).init());

    window.addEventListener('message', (event: any) => {
      if (!/http:\/\/127\.0\.0\.1:8099|https:\/\/api\.fastools\.cn/.test(event.origin)) return;

      const { token }: any = this.props;
      const data = event.data;

      switch (data.name) {
        case 'auth':
          if (data.value === 'noaccess') this.handleOpenPayModal();
          if (data.value === undefined) {
            if (hasFree(this.cost)) break;
            const { tool }: any = this.state;
            const hide = message.loading({ content: '获取权限中...', duration: 0, key: 'access' });
            const params: IQueryVipExpires = { order: localStorage.getItem('trial') || '', toolId: tool._id };

            queryVipExpires(params)
              .then(({ user_type }) => {
                if (user_type === 'vip' || user_type === 'trial') {
                  postMessage('auth', true);
                  message.success({ content: '获取成功,请重新点击', key: 'access' });
                } else this.handleOpenPayModal();
              })
              .catch(error => {
                message.error('网络错误');
              })
              .finally(() => {
                hide();
              });
          }
          break;
        case 'status':
          const { tool }: any = this.state;
          if (data.value === 'loaded') {
            this.setState({
              loading: false,
            });
            // 检测是否免费
            if (hasFree(this.cost)) break;

            if (localStorage.getItem('trial') || token) {
              const params: IQueryVipExpires = { order: localStorage.getItem('trial') || '', toolId: tool._id };

              queryAccess(params);
              this.accessInterval = setInterval(() => queryAccess(params), 1000 * 60);
            } else postMessage('auth', false);
          } else if (data.value === 'run') console.log('run');
          break;
        case 'height':
          this.setState({
            iframeHeight: `calc(${data.value} + 100px)`,
          });
          break;
        case 'modal':
          Modal[data.method](data.params);
          break;
        case 'message':
          message[data.method](data.params);
      }
    });

    queryTool(alias).then(res => {
      if (!res.tool) return;
      this.cost = res.tool.cost;
      hasFree(this.cost);
      this.setState({
        tool: res.tool,
        toolUrl: `${prefix}/tools/static/${res.tool.alias}.html`,
      });
      this.props.dispatch({
        type: 'global/setBreadcrumbName',
        payload: res.tool.title,
      });
      document.title = res.tool.title + ' - 快用工具 - 又快又好用的在线工具网';
    });
  }

  componentWillUnmount() {
    UnloadConfirm.remove();
    notification.destroy();
    Modal.destroyAll();
    clearInterval(this.consoleInterval);
    clearInterval(this.accessInterval);
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
      description: (
        <div style={{ maxHeight: 600, overflow: 'auto' }} aria-label="使用说明" dangerouslySetInnerHTML={{ __html: tool.direction }} />
      ),
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
        openFeedback({
          customInfo: JSON.stringify({
            toolName: tool.title,
          }),
        });
        break;
      case 2:
        message.success({ content: '已复制链接' });
        break;
      case 3:
        if (visibleHelp) return;
        this.openNotification();
    }
  };

  handleOpenPay = () => {
    const { token, dispatch }: IProps = this.props;

    if (token)
      dispatch({
        type: 'global/changePayPaneVisible',
        payload: true,
      });
    else
      dispatch({
        type: 'global/changeLoginPaneVisible',
        payload: true,
      });

    this.setState({
      visiblePayModal: false,
    });
  };

  handleOpenPayModal = () => {
    this.setState({
      visiblePayModal: true,
    });
  };

  onHidePayModal = () => {
    this.setState({
      visiblePayModal: false,
    });
    this.handleHidePaidInput();
  };

  handleOpenPaidInput = () => {
    this.setState({
      visibleInput: true,
    });
  };

  handleHidePaidInput = () => {
    this.setState({
      visibleInput: false,
    });
  };

  render() {
    const {
      tool,
      alias,
      visibleHelp,
      visibleFrame,
      loading,
      iframeHeight,
      toolUrl,
      visiblePayModal,
      visibleInput,
    }: IState = this.state;

    return (
      <div className={styles.container} id="toolContainer">
        <header className={styles.header}>
          <img className={styles.headerCover} src={tool.cover} alt={styles.title} />
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
              style={{ height: iframeHeight }}
              src={toolUrl}
              // src={`http://127.0.0.1:8001`}
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
            <div aria-label="使用说明" dangerouslySetInnerHTML={{ __html: tool.direction }} />
          </Collapse.Panel>
        </Collapse>

        <Similarity alias={alias} />

        <Modal
          title="支付"
          visible={visiblePayModal}
          onCancel={this.onHidePayModal}
          maskClosable={false}
          destroyOnClose
          footer={[
            <Button className={styles.paidButton} onClick={this.handleOpenPaidInput} disabled={visibleInput} key="back" type="primary">
              已支付过
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOpenPay} danger>
              升级VIP(享全站工具)
            </Button>,
          ]}
        >
          <PayModal visibleInput={visibleInput} tool={tool} onHidePayModal={this.onHidePayModal} onHideInput={this.handleHidePaidInput} />
        </Modal>
      </div>
    );
  }
}

export default connect(({ login }: any) => ({
  token: login.token,
}))(ToolDetailPage);
