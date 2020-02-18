import React from 'react';
import { Layout, Menu, Divider } from 'antd';
import styles from './index.less';

const { Header, Content, Footer } = Layout;

const contact = [
  {
    title: '客服QQ：2639415619',
    url: 'tencent://message/?uin=1355300501&Site=Sambow&Menu=yes',
  },
  {
    title: 'QQ交流群1：2639415619',
    url: 'http://shang.qq.com/wpa/qunwpa?idkey=<idkey>',
  },
  {
    title: 'QQ交流群2：2639415619',
    url: 'http://shang.qq.com/wpa/qunwpa?idkey=<idkey>',
  },
];

const links = [
  {
    title: '在线流程图',
    url: 'http://app.liuchengtu.com/',
  },
  {
    title: '在线流程图',
    url: 'http://app.liuchengtu.com/',
  },
  {
    title: '在线流程图',
    url: 'http://app.liuchengtu.com/',
  },
  {
    title: '在线流程图',
    url: 'http://app.liuchengtu.com/',
  },
  {
    title: '在线流程图',
    url: 'http://app.liuchengtu.com/',
  },
  {
    title: '在线流程图',
    url: 'http://app.liuchengtu.com/',
  },
  {
    title: '在线流程图',
    url: 'http://app.liuchengtu.com/',
  },
  {
    title: '在线流程图',
    url: 'http://app.liuchengtu.com/',
  },
  {
    title: '在线流程图',
    url: 'http://app.liuchengtu.com/',
  },
  {
    title: '在线流程图',
    url: 'http://app.liuchengtu.com/',
  },
  {
    title: '在线流程图',
    url: 'http://app.liuchengtu.com/',
  },
  {
    title: '在线流程图',
    url: 'http://app.liuchengtu.com/',
  },
  {
    title: '在线流程图',
    url: 'http://app.liuchengtu.com/',
  },
  {
    title: '在线流程图',
    url: 'http://app.liuchengtu.com/',
  },
  {
    title: '在线流程图',
    url: 'http://app.liuchengtu.com/',
  },
  {
    title: '在线流程图',
    url: 'http://app.liuchengtu.com/',
  },
];

export default () => {
  return (
    <Footer className={styles.footer}>
      <img className={styles.QRimg} src="https://www.logosc.cn/img/logoscQR.jpg" alt="公众号" />
      <div className={styles.contact}>
        <h3>联系我们:</h3>
        <ul>
          {contact.map(item => (
            <li>
              <a href={item.url} title={item.title}>
                {item.title}
              </a>
            </li>
          ))}
          <li></li>
        </ul>
      </div>
      <Divider />
      <div className={styles.friendLinks}>
        <h3>友链合作:</h3>
        <ul>
          {links.map(item => (
            <li>
              <a href={item.url} target="_blank" title={item.title} rel="noopener noreferrer">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <Divider />
      <p className={styles.copyright}>
        Copyright © 2019 - {new Date().getFullYear()} fastools.cn All Rights Reserved
        <a href="http://www.miitbeian.gov.cn/" target="_blank">
          &nbsp;&nbsp;沪ICP备11048151号-6
        </a>
      </p>
    </Footer>
  );
};
