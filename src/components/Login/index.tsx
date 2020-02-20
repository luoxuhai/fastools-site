import React from 'react';
import { Modal, Button, Form, Input, message } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import QQIcon from '@/assets/icons/QQ.svg';

export default connect(({ global, login }: any) => ({ ...global, ...login }))(({ loginPaneVisible, dispatch }: any) => {
  const [form] = Form.useForm();

  React.useEffect(() => {}, []);

  function onCancel() {
    dispatch({
      type: 'global/changeLoginPaneVisible',
      payload: false,
    });
  }

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    dispatch({
      type: 'login/changeLoginStatus',
      payload: true,
    });
    onCancel();
    message.success({ content: '登录成功' });
  };

  function QQlogin() {
    window.loginWin = window.QC.Login.showPopup({
      appId: '101816819',
      redirectURI: location.origin + '/home',
    });
  }

  return (
    <div>
      <Modal
        className={styles.modal}
        visible={loginPaneVisible}
        onCancel={onCancel}
        maskClosable={false}
        title="登录/注册"
        width={400}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="tel"
            hasFeedback
            rules={[
              {
                required: true,
                pattern: /^1(3|4|5|7|8)\d{9}$/,
                whitespace: true,
                message: '手机号码错误!',
              },
            ]}
          >
            <Input className={styles.input} placeholder="请输入您的手机号码" type="tel" maxLength={11} />
          </Form.Item>
          <div className={styles.verificationCodeContainer}>
            <Form.Item
              hasFeedback
              name="verificationCode"
              rules={[{ required: true, whitespace: true, message: '验证码错误!' }]}
            >
              <Input className={styles.verificationCodeInput} placeholder="请输入验证码" maxLength={4} />
            </Form.Item>
            <Button className={styles.verificationCodeBtn}>获取验证码</Button>
          </div>
          <Form.Item>
            <Button className={styles.button} block type="primary" htmlType="submit">
              登录/注册
            </Button>
          </Form.Item>
        </Form>
        <ul className={styles.othorLogin}>
          <li onClick={QQlogin}>
            <img src={QQIcon} alt="QQ登录" />
            <h4>QQ登录</h4>
          </li>
        </ul>
      </Modal>
    </div>
  );
});
