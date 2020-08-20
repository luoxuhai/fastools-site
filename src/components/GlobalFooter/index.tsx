import React from 'react';
import { Layout, Divider, Popover } from 'antd';
import styles from './index.less';

const qrcode = 'https://static.fastools.cn/images/qrcode.jpg?x-oss-process=style/fade';

const contact = [
  {
    title: '客服QQ(定制工具、小程序等): 1852067571',
    icon: 'iconQQ',
    url: 'tencent://message/?uin=1852067571&Site=Sambow&Menu=yes',
    qrcode: 'https://static.fastools.cn/images/1852067571.jpg',
  },
  // {
  //   title: 'QQ交流群: 617853966',
  //   icon: 'iconqqqun',
  //   url: '//shang.qq.com/wpa/qunwpa?idkey=a8b4e205ac4b58351e1b8acdf672be7ee82f724d627429704279ca78596775ff',
  //   qrcode: 'https://static.fastools.cn/images/617853966.png',
  // },
  {
    title: '微信小程序',
    icon: 'iconweixin',
    url: '',
    qrcode: 'https://static.fastools.cn/images/miniapp.jpg',
  },
  {
    title: '邮箱: support@fastools.cn',
    icon: 'iconhuabanfuben',
    url: 'mailto:support@fastools.cn',
  },
  {
    title: '在线讨论',
    icon: 'icongitter',
    url: 'https://gitter.im/fastools/community',
  },
  {
    title: '关于我们',
    icon: 'iconguanyuwomen1',
    url: 'https://support.qq.com/products/126066/team/',
  },
];

const links = [
  {
    title: '悟空智能数据分析',
    url: 'https://wk.phitrellis.com/',
  },
  {
    title: '在线流程图',
    url: 'http://app.liuchengtu.com/',
  },
  {
    title: '书格',
    url: 'https://new.shuge.org/',
  },
  {
    title: '发现中国',
    url: 'https://www.ageeye.cn/',
  },
  {
    title: '新秀导航',
    url: 'http://www.xinxiudh.com',
  },
  {
    title: '上线了',
    url: 'https://www.sxl.cn/',
  },
  {
    title: '古典文学名著阅读',
    url: 'https://classics.fastools.cn/',
  },
  {
    title: '啃芝士',
    url: 'https://www.kenzhishi.com/',
  },
  {
    title: '扩展迷',
    url: 'https://www.extfans.com/',
  },
  {
    title: '微信小游戏在线制作',
    url: 'https://gamemaker.weixin.qq.com/ide#/scan',
  },
  {
    title: '鹏少资源网',
    url: 'https://www.jokerps.com/',
  },
  {
    title: '牛站导航',
    url: 'https://www.niuzdh.com/',
  },
];

export default () => {
  return (
    <Layout.Footer className={styles.footer}>
      <div className={styles.QRContainer}>
        <img className={styles.QRimg} src={qrcode} alt="公众号" />
        <img className={styles.tip} src="https://www.logosc.cn/img/scan.svg" />
      </div>
      <div className={styles.contact}>
        <h3>联系我们(定制工具):</h3>
        <ul>
          {contact.map((item, index) => (
            <li key={item.title}>
              <svg className="icon" aria-hidden="true">
                <use href={`#${item.icon}`} />
              </svg>
              &nbsp;&nbsp;
              {index >= 2 ? (
                <a href={item.url} target="_blank" title={item.title}>
                  {item.title}
                </a>
              ) : (
                <Popover content={<img width="150px" src={item.qrcode} />}>
                  <a href={item.url} target="_blank" title={item.title}>
                    {item.title}
                  </a>
                </Popover>
              )}
            </li>
          ))}
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
        Copyright © 2019 - {new Date().getFullYear()} fastools.cn All Rights Reserved.
        <a href="http://www.beian.miit.gov.cn" target="_blank">
          &nbsp;&nbsp;津ICP备 18009092号-2
        </a>
        <a href="https://myssl.com/www.fastools.cn?from=mysslid" target="_blank">
          <img src="https://static.myssl.com/res/images/myssl-id3.png" style={{ maxHeight: 50, display: 'block', margin: '0 auto' }} />
        </a>
      </div>
    </Layout.Footer>
  );
};
