import React, { useState, useEffect } from 'react';
import { Button, Spin, Input, Popover, Alert, Modal, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import styles from './index.less';
import { queryPayCode, queryPayInfo, queryTrialOrder } from '@/services/pay';
import { IQueryVipExpires } from '@/services/user';
import { download, postMessage } from '@/utils/utils';

const helpImage = 'https://static.fastools.cn/images/help-order.jpg';
let order: string;
let interval: any;
let paySuccess = false;
let inputValue = '';

export default connect(({ login }: any) => ({ ...login }))(({ tool: { _id, title }, visibleInput, onHidePayModal, onHideInput }: any) => {
  const [payCode, setPayCode] = useState('');
  const [spinning, setSpinning] = useState(true);
  const [querySpinning, setQuerySpinning] = useState(false);

  useEffect(() => {
    paySuccess = false;
    getPayCode();
    interval = setInterval(() => {
      queryPayInfo(order).then(res => {
        if (res.isPay) {
          if (paySuccess) return;
          paySuccess = true;
          onHidePayModal();
          postMessage('auth', true);
          message.success({ content: '支付成功!' });
          localStorage.setItem('trial', order);
          clearInterval(interval);
          order = '';
        }
      });
    }, 1800);

    return () => {
      clearInterval(interval);
      order = '';
    };
  }, []);

  function getPayCode() {
    setSpinning(true);
    setPayCode('');
    queryPayCode(1, { toolId: _id }).then(res => {
      setPayCode(res.qrcode);
      order = res.order;
      setSpinning(false);
    });
  }

  function handleDownloadQRcode(src: string) {
    download(src, '微信扫码支付');
  }

  function handleInputChange(e: any) {
    inputValue = e.target.value.trim();
  }

  function handleSubmitOrder() {
    if (!/^[0-9]{20,40}$/g.test(inputValue)) {
      message.error('订单号错误!');
      return;
    }
    const params: IQueryVipExpires = { order: inputValue, toolId: _id };
    setQuerySpinning(true);
    queryTrialOrder(params)
      .then(({ user_type, error, tool }) => {
        if (error === 'inconsistency') {
          Modal.error({
            title: '提示',
            content: (
              <Alert
                message="订单号对应工具与当前工具不一致"
                description={
                  <>
                    此单号对应工具为:{' '}
                    <a href={`/${tool.tool_type}/${tool.alias}`} target="_blank">
                      {tool.title}
                    </a>
                  </>
                }
                type="warning"
              />
            ),
          });
          localStorage.setItem('trial', params.order || '');
        } else if (error === 'absent') message.error('不存在此订单号');
        else {
          message.success('成功!');
          onHidePayModal();
          postMessage('auth', user_type === 'vip' || user_type === 'trial');
          localStorage.setItem('trial', params.order || '');
        }
      })
      .catch(() => {
        postMessage('auth', false);
      })
      .finally(() => {
        setQuerySpinning(false);
      });
  }

  return (
    <>
      <div>
        {visibleInput ? (
          <div>
            <div className={styles.inputContainer}>
              <Input className={styles.input} onChange={handleInputChange} autoFocus placeholder="请输入单号" maxLength={40} />
              <Popover
                title="单号查看帮助"
                content={
                  <>
                    <img width="300px" src={helpImage} />
                    <h3>
                      有问题请联系QQ: <mark>1852067571</mark>
                    </h3>
                  </>
                }
              >
                <QuestionCircleOutlined style={{ fontSize: 24, color: '#ff7875' }} />
              </Popover>
            </div>
            <Button className={styles.submit} loading={querySpinning} type="primary" onClick={handleSubmitOrder}>
              提交
            </Button>
            <Button onClick={onHideInput}>返回</Button>
          </div>
        ) : (
          <div className={styles.QRcodePay}>
            <Spin spinning={spinning}>
              <div
                className={styles.QRcodePayImg}
                onMouseDown={() => handleDownloadQRcode(payCode)}
                onTouchStart={() => handleDownloadQRcode(payCode)}
                style={{ backgroundImage: `url(${payCode})` }}
              ></div>
            </Spin>
            <div className={styles.payInfo}>
              <p className={styles.money}>
                <span className={styles.price}>
                  <span className={styles.strong}>1</span>.99
                </span>{' '}
                元试用本工具1天
              </p>
              <p>支持使用微信扫码支付</p>
              <p>
                客服QQ群:
                <a href="//shang.qq.com/wpa/qunwpa?idkey=a8b4e205ac4b58351e1b8acdf672be7ee82f724d627429704279ca78596775ff" target="_blank">
                  617853966
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
});
