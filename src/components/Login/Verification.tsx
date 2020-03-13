import React from 'react';
import { Modal, Button, Input, message } from 'antd';
import { draw } from '@/utils/utils';
import styles from './Verification.less';

let inputValue = '';
let code = '';

export default function Verification({ visible, onOk, onCancel, onVerificationCode }: any) {
  function handleInputChange(e: any) {
    inputValue = e.target.value;
  }

  function handleShowVerification() {
    const showNum: any[] = [];
    draw(showNum);
    code = showNum.join('');
  }

  function handleOK() {
    if (inputValue === code) {
      onVerificationCode();
      onOk();
    } else message.error({ content: '验证码错误!' });
  }

  if (visible) {
    setTimeout(() => {
      handleShowVerification();
    });
  } else {
    inputValue = '';
    code = '';
  }

  return (
    <Modal title="验证码" visible={visible} onOk={handleOK} onCancel={onCancel} width={280} zIndex={1003} cancelText="取消" okText="确认">
      <div className={styles.container}>
        <div className={styles.canvasContainer}>
          <canvas className={styles.canvas} id="canvas" width="100" height="30"></canvas>
          <Button onClick={handleShowVerification}>刷新</Button>
        </div>
        <Input onChange={handleInputChange} placeholder="请图中数字" maxLength={4} />
      </div>
    </Modal>
  );
}
