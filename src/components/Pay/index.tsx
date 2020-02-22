import React, { useState } from 'react';
import { Modal, Card, Col, Row, Statistic, Button, Form, Input, message } from 'antd';
import { PayCircleOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import styles from './index.less';

const pays = [
  {
    title: '包年',
    tip: '12个月(365天)',
    value: 49.99,
  },
  {
    title: '包半年',
    tip: '6个月(180天)',
    value: 29.99,
  },
  {
    title: '包季',
    tip: '3个月(90天)',
    value: 19.99,
  },
  {
    title: '包月',
    tip: '1个月(30天)',
    value: 9.99,
  },
];

export default connect(({ global, login }: any) => ({ ...global, ...login }))(({ payPaneVisible, user, dispatch }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  function handlePayCard(index: number) {
    setCurrentIndex(index);
  }

  function handleCancel() {
    dispatch({
      type: 'global/changePayPaneVisible',
      payload: false,
    });
  }

  return (
    <Modal
      title="VIP升级"
      visible={payPaneVisible}
      onCancel={handleCancel}
      maskClosable={false}
      destroyOnClose
      width={800}
      zIndex={2000}
      footer={null}
    >
      <Row gutter={16}>
        {pays.map((item, index) => (
          <Col span={6}>
            <Card
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
          <img src="https://payjs.cn/demo/getQrcode/demo:wNXOiM5AyWUcaLQ2" alt="" />
          <div className={styles.payInfo}>
            <p className={styles.money}>{pays[currentIndex].value}￥</p>
            <p>支持使用微信扫码支付</p>
            <p>
              客服QQ群:
              <a href="http://shang.qq.com/wpa/qunwpa?idkey=<idkey>" target="_blank">
                1558884454
              </a>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
});
