import React, { useState } from 'react';
import { Modal, Button, Form, Input, Tooltip, message } from 'antd';
import { connect } from 'dva';
import localforage from 'localforage';
import Verification from './Verification';
import { getCountDown } from '@/utils/utils';
import styles from './index.less';
import { queryVerificationCode, login } from '@/services/user';

const QQIcon = 'https://static.fastools.cn/images/QQ.svg';

let tel = '';
let codeInterval: any;

export default connect(({ global }: any) => ({ loginPaneVisible: global.loginPaneVisible }))(({ loginPaneVisible, dispatch }: any) => {
  const [validateStatusTel, setValidateStatusTel]: any[] = useState(undefined);
  const [helpTextTel, setHelpTextTel]: any[] = useState(undefined);
  const [validateStatusCode, setValidateStatusCode]: any[] = useState(undefined);
  const [helpTextCode, setHelpTextCode]: any[] = useState(undefined);
  const [visible, setVisible]: any[] = useState(false);
  const [buttonText, setButtonText]: any[] = useState('获取验证码');
  const [loadingCode, setLoadingCode]: any[] = useState(false);
  const [loadingLogin, setLoadingLogin]: any[] = useState(false);
  const [form] = Form.useForm();

  function onCancel() {
    dispatch({
      type: 'global/changeLoginPaneVisible',
      payload: false,
    });
  }

  function getVerificationCode() {
    if (tel) {
      setVisible(true);
    } else {
      setValidateStatusTel('error');
      setHelpTextTel('请输入手机号码!');
    }
  }

  function handleInputChange(e: any) {
    tel = e.target.value;
    setValidateStatusTel(undefined);
    setHelpTextTel(undefined);
    setValidateStatusCode(undefined);
    setHelpTextCode(undefined);
    stopLoadingCode();
  }

  function stopLoadingCode() {
    clearInterval(codeInterval);
    setLoadingCode(false);
    setButtonText('获取验证码');
  }

  function destroy() {
    stopLoadingCode();
    form.setFieldsValue({
      tel: '',
      verificationCode: '',
    });
    tel = '';
    setValidateStatusCode(false);
    setValidateStatusTel(false);
  }

  function handleOK() {
    setVisible(false);

    codeInterval = getCountDown(120, (time: number) => {
      if (time === 0) {
        setLoadingCode(false);
        setButtonText('获取验证码');
      } else {
        setButtonText(time + '秒后重新获取');
        setLoadingCode(true);
      }
    });
  }

  function visiblePayPane() {
    dispatch({
      type: 'global/changePayPaneVisible',
      payload: true,
    });
  }

  const onFinish = (values: any) => {
    setLoadingLogin(true);
    login(values)
      .then(res => {
        setLoadingLogin(false);
        if (res.token) {
          message.success({ content: '登录成功' });
          dispatch({
            type: 'login/setUserInfo',
            payload: res,
          });
          localforage.setItem('user', res);
          destroy();
          onCancel();
          visiblePayPane();
        } else {
          setValidateStatusCode('error');
          setHelpTextCode('验证码错误!');
        }
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoadingLogin(false);
      });
  };

  function QQlogin() {
    window.loginWin = window.QC.Login.showPopup({
      appId: '101854393',
      redirectURI: location.origin + '/login',
    });
    if (window.isMobile) localStorage.setItem('loginPath', location.pathname);
    else
      window.addEventListener('storage', e => {
        if (e.key === 'access_token' && e.newValue) {
          dispatch({
            type: 'login/login',
            payload: {
              access_token: e.newValue,
            },
          });
          window.localStorage.removeItem('access_token');
          onCancel();
          visiblePayPane();
        }
      });
  }

  return (
    <>
      <Modal
        className={styles.modal}
        visible={loginPaneVisible}
        onCancel={onCancel}
        maskClosable={false}
        title="登录/注册"
        width={400}
        zIndex={1002}
        footer={null}
      >
        <Form onFinish={onFinish} form={form}>
          <Form.Item
            name="tel"
            validateStatus={validateStatusTel}
            help={helpTextTel}
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
            <Input className={styles.input} onChange={handleInputChange} placeholder="请输入您的手机号码" type="tel" maxLength={11} />
          </Form.Item>
          <div className={styles.verificationCodeContainer}>
            <Form.Item
              name="verificationCode"
              validateStatus={validateStatusCode}
              help={helpTextCode}
              hasFeedback
              rules={[{ required: true, whitespace: true, message: '验证码错误!' }]}
            >
              <Input className={styles.verificationCodeInput} placeholder="请输入验证码" maxLength={4} />
            </Form.Item>
            <Button className={styles.verificationCodeBtn} onClick={getVerificationCode} disabled={loadingCode}>
              {buttonText}
            </Button>
          </div>
          <Form.Item>
            <Button className={styles.button} loading={loadingLogin} block type="primary" htmlType="submit">
              登录/注册
            </Button>
          </Form.Item>
        </Form>
        <ul className={styles.othorLogin}>
          <Tooltip title="QQ登录" placement="top">
            <li id="loginButton" onClick={QQlogin}>
              <img src={QQIcon} alt="QQ登录" />
              <h4>QQ登录</h4>
            </li>
          </Tooltip>
        </ul>
      </Modal>
      {visible && (
        <Verification
          visible={visible}
          onOk={handleOK}
          onCancel={() => setVisible(false)}
          onVerificationCode={() => queryVerificationCode({ tel }).catch(() => message.error({ content: '请1小时后再试!' }))}
        />
      )}
    </>
  );
});
