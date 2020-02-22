import React from 'react';
import { Layout, Divider } from 'antd';
import styles from './index.less';

const qrcode = 'https://fastools.oss-cn-hangzhou.aliyuncs.com/images/qrcode.jpg?x-oss-process=style/fade';

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
    <Layout.Footer className={styles.footer}>
      <img className={styles.QRimg} src={qrcode} alt="公众号" />
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
      <div className={styles.copyright}>
        Copyright © 2019 - {new Date().getFullYear()} fastools.cn All Rights Reserved
        <a href="http://www.miitbeian.gov.cn/" target="_blank">
          &nbsp;&nbsp;沪ICP备11048151号-6
        </a>
        <a href="https://myssl.com/www.fastools.cn?from=mysslid" target="_blank">
          <img src="https://static.myssl.com/res/images/myssl-id3.png" style={{ maxHeight: 50, display: 'block', margin: '0 auto' }} />
        </a>
      </div>
    </Layout.Footer>
  );
};
