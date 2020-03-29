import React, { Component } from 'react';
import { Button, Tooltip, Modal, Alert, Spin, Skeleton, message, notification } from 'antd';
import { connect } from 'dva';
import {
  StarOutlined,
  ShareAltOutlined,
  StarFilled,
  QuestionCircleOutlined,
  QuestionCircleFilled,
  CloseCircleOutlined,
  FullscreenOutlined,
} from '@ant-design/icons';
// import AES from 'crypto-js/aes';
// import encUtf8 from 'crypto-js/enc-utf8';
// import modeEcb from 'crypto-js/mode-ecb';
// import padPkcs7 from 'crypto-js/pad-pkcs7';
import localforage from 'localforage';

import { prefix } from '@/utils/request.js';
import { queryTool, star } from '@/services/tool';
import { queryVipExpires } from '@/services/user';
import { IQueryVipExpires } from '@/services/data';
import { IState, IProps } from './data';
import { openFeedback } from '@/components/Feedback';
import PayModal from './components/PayModal';
import Description from './components/Description';
import Similarity from './components/Similarity';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { monitorConsole, postMessage, UnloadConfirm, preventScroll } from '@/utils/utils';
import { hasFree, queryAccess, handleShare } from './utils';
import styles from './index.less';

const buttons = [
  {
    title: '收藏',
    icon: <StarOutlined />,
  },
  {
    title: '分享',
    icon: <ShareAltOutlined />,
  },
  {
    title: '使用说明',
    icon: <QuestionCircleOutlined />,
  },
  {
    title: '全屏',
    icon: <FullscreenOutlined />,
  },
];

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
    alias: this.props.match.params.id,
    isFull: false,
  };
  consoleInterval: any = null;
  accessInterval: any = null;
  price = 0.99;

  componentDidMount() {
    const { alias } = this.state;

    window.addEventListener('popstate', this.listenerPopstate);
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
            if (hasFree(this.price)) break;
            const { tool }: any = this.state;
            const hide = message.loading({ content: '获取权限中...', duration: 0, key: 'access' });
            const params: IQueryVipExpires = { order: '', toolId: tool._id };

            localforage.getItem('trial').then((value: any) => {
              if (value) params.order = value[tool._id];

              queryVipExpires(params)
                .then(({ user_type }) => {
                  if (user_type === 'vip' || user_type === 'trial') {
                    postMessage('auth', true);
                    message.success({ content: '获取权限成功,请重新点击', key: 'access' });
                  } else this.handleOpenPayModal();
                })
                .catch(error => {
                  message.error('网络错误');
                })
                .finally(() => {
                  hide();
                });
            });
          }
          break;
        case 'status':
          const { tool }: any = this.state;
          if (data.value === 'loaded') {
            this.setState(
              {
                loading: false,
              },
              () => {
                setTimeout(() => {
                  if (location.search === '?fullscreen') this.handleOpenFull();
                }, 400);
              },
            );

            // 检测是否免费
            if (hasFree(this.price)) break;

            if (localStorage.getItem('fastools/trial') || token) {
              const params: IQueryVipExpires = { order: '', toolId: tool._id };

              localforage.getItem('trial').then((value: any) => {
                if (value) params.order = value[tool._id];

                queryAccess(params);
                this.accessInterval = setInterval(() => queryAccess(params), 1000 * 60);
              });
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

    queryTool(alias).then(({ tool }) => {
      if (!tool) return;
      this.price = tool.price;
      this.setState(
        {
          tool: tool,
          toolUrl: `${prefix}/tools/static/${tool.alias}.html`,
        },
        () => {
          if (tool.direction_level === 1) this.openNotification();
        },
      );
      this.props.dispatch({
        type: 'global/setBreadcrumbName',
        payload: tool.title,
      });
      document.title = tool.title + ' - 快用工具 - 又快又好用的在线工具网';
    });
  }

  componentWillUnmount() {
    UnloadConfirm.remove();
    notification.destroy();
    message.destroy();
    Modal.destroyAll();
    clearInterval(this.consoleInterval);
    clearInterval(this.accessInterval);
    window.removeEventListener('popstate', this.listenerPopstate);
    this.props.dispatch({
      type: 'global/setBreadcrumbName',
      payload: '',
    });
  }

  listenerPopstate = () => {
    if (location.search === '?fullscreen') {
      this.setState({
        isFull: true,
      });
      preventScroll(true);
    } else {
      this.setState({
        isFull: false,
      });
      preventScroll(false);
    }
  };

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
        handleShare(tool.cover, tool.title);
        break;
      case 2:
        if (visibleHelp) return;
        this.openNotification();
        break;
      case 3:
        history.pushState('fullscreen', '', `${location.href}?fullscreen`);
        this.handleOpenFull();
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

  handleOpenFull = () => {
    this.setState({
      isFull: true,
    });
    preventScroll(true);
  };

  handleExitFull = () => {
    this.setState({
      isFull: false,
    });
    preventScroll(false);
    history.back();
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
      isFull,
    }: IState = this.state;

    return (
      <div className={styles.container} id="toolContainer">
        <header className={styles.header}>
          <Skeleton active title={{ width: '8em' }} avatar={{ shape: 'circle' }} paragraph={false} loading={!tool.title}>
            <img className={styles.headerCover} src={tool.cover} alt={styles.title} />
            <h2 className={styles.headerTitle}>{tool.title}</h2>
          </Skeleton>
          {buttons.map((item, index) => (
            <Tooltip title={item.title} key={item.title}>
              {index === 1 ? (
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
                  icon={index === 0 && tool.isStar ? <StarFilled /> : index === 2 && visibleHelp ? <QuestionCircleFilled /> : item.icon}
                />
              )}
            </Tooltip>
          ))}
        </header>
        {visibleFrame ? (
          <Spin spinning={loading} tip="加载工具中...">
            <iframe
              className={isFull ? styles.iframeFull : styles.iframe}
              id="tool"
              name="tool"
              style={{ height: iframeHeight }}
              src={toolUrl}
              // src={`http://127.0.0.1:8001`}
              allow="payment"
            />
            {isFull && (
              <div className={styles.close} onClick={this.handleExitFull}>
                <Tooltip title="退出全屏" placement="right">
                  <CloseCircleOutlined />
                </Tooltip>
              </div>
            )}
          </Spin>
        ) : (
          <Alert
            message="警告"
            description="请按F12键或其他方式关闭控制台(Press F12 or otherwise to close the console)!"
            type="warning"
            showIcon
          />
        )}
        <Description tool={tool} />
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
