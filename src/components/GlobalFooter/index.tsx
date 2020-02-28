import React from 'react';
import { Layout, Divider, Popover } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import styles from './index.less';

const qrcode = 'https://fastools.oss-cn-hangzhou.aliyuncs.com/images/qrcode.jpg?x-oss-process=style/fade';
const QQIcon = 'https://fastools.oss-cn-hangzhou.aliyuncs.com/images/QQ.svg';

const contact = [
  {
    title: '客服QQ：1355300501',
    url: 'tencent://message/?uin=1355300501&Site=Sambow&Menu=yes',
    qrcode: 'https://fastools.oss-cn-hangzhou.aliyuncs.com/images/qq_pic_merged_1582518380290.jpg?x-oss-process=style/x',
  },
  {
    title: 'QQ交流群：617853966',
    url: '//shang.qq.com/wpa/qunwpa?idkey=a8b4e205ac4b58351e1b8acdf672be7ee82f724d627429704279ca78596775ff',
    qrcode: 'https://fastools.oss-cn-hangzhou.aliyuncs.com/images/1582517921815.png?x-oss-process=style/x',
  },
  {
    title: '在线讨论',
    url: 'https://gitter.im/fastools/community',
  },
  {
    title: '吐个槽',
    url: 'https://support.qq.com/products/126066',
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
          {contact.map((item, index) => (
            <li key={item.url}>
              {index >= 2 ? (
                <>
                  <CommentOutlined className={styles.qqIcon} />{' '}
                  <a href={item.url} target="_blank" title={item.title}>
                    {item.title}
                  </a>
                </>
              ) : (
                <>
                  <img className={styles.qqIcon} src={QQIcon} />

                  <Popover content={<img width="150px" src={item.qrcode} />}>
                    <a href={item.url} target="_blank" title={item.title}>
                      {item.title}
                    </a>
                  </Popover>
                </>
              )}
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
            <li key={item.url}>
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
