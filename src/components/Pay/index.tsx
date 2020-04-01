import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Statistic, Spin, message } from 'antd';
import { PayCircleOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import styles from './index.less';
import { queryPayCode, queryPayInfo } from '@/services/pay';
import { queryVipExpires } from '@/services/user';
import { download, postMessage } from '@/utils/utils';

const pays = [
  {
    title: '包年',
    tip: '12个月(365天) - 享全站工具',
    value: 29.99,
    days: 365,
  },
  {
    title: '包半年',
    tip: '6个月(180天) - 享全站工具',
    value: 19.99,
    days: 180,
  },
  {
    title: '包季',
    tip: '3个月(90天) - 享全站工具',
    value: 11.99,
    days: 90,
  },
  {
    title: '包月',
    tip: '1个月(30天) - 享全站工具',
    value: 5.99,
    days: 30,
  },
];

let order: string;
let interval: any;
let paySuccess = false;

export default connect(({ login }: any) => ({ ...login }))(({ token, user, dispatch }: any) => {
  const [currentIndex, setCurrentIndex] = useState(3);
  const [payCode, setPayCode] = useState('');
  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    paySuccess = false;
    getPayCode(currentIndex);
    interval = setInterval(() => {
      queryPayInfo(order).then(res => {
        if (res.isPay) {
          if (paySuccess) return;
          paySuccess = true;
          message.success({ content: '支付成功!' });
          getPayCode(currentIndex);
          postMessage('auth', true);
          dispatch({
            type: 'global/changePayPaneVisible',
            payload: false,
          });
          queryVipExpires().then(res => {
            if (res.vip_expires)
              dispatch({
                type: 'login/setUserInfo',
                payload: {
                  token,
                  user: { ...user, ...res },
                },
              });
          });
          order = '';
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      order = '';
    };
  }, []);

  function getPayCode(index: number) {
    setSpinning(true);
    setPayCode('');
    queryPayCode(pays[index].days).then(res => {
      setPayCode(res.qrcode);
      order = res.order;
      setSpinning(false);
    });
  }

  function handlePayCard(index: number) {
    setCurrentIndex(index);
    getPayCode(index);
  }

  return (
    <>
      <Row gutter={16}>
        {pays.map((item, index) => (
          <Col span={6} xs={12} sm={8} lg={6} key={item.days}>
            <Card
              className={styles.cardItem}
              title={item.title}
              onClick={() => handlePayCard(index)}
              style={{ backgroundImage: currentIndex === index ? 'linear-gradient(120deg,#fff7ec,#ffcb7e)' : '' }}
              hoverable
            >
              <Statistic
                title={item.tip}
                value={item.value}
                precision={2}
                valueStyle={{ color: '#ba7a5c' }}
                prefix={<PayCircleOutlined />}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <div>
        <h3 className={styles.payTitle}>扫码支付</h3>
        <div className={styles.QRcodePay}>
          <Spin spinning={spinning}>
            <div
              className={styles.QRcodePayImg}
              style={{ backgroundImage: `url(${payCode})` }}
            ></div>
          </Spin>
          <div className={styles.payInfo}>
            <p className={styles.money}>{pays[currentIndex].value}￥</p>
            <p>支持使用微信扫码支付</p>
            <p>
              客服QQ群:
              <a href="//shang.qq.com/wpa/qunwpa?idkey=a8b4e205ac4b58351e1b8acdf672be7ee82f724d627429704279ca78596775ff" target="_blank">
                617853966
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
});
