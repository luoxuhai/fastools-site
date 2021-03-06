import React from 'react';
import { Card, Tag, Skeleton } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import Link from 'umi/link';
import styles from './index.less';

export const NavNameMap: any = {
  doc: '文档',
  image: '图像',
  audio: '音频',
  video: '视频',
  other: '其他',
};

const skeletonList = Array.from(Array(6), v => v);

export const ToolList = ({ tools, title }: any) => {
  function handleToDetail({ alias, tool_type }: any, e: any) {
    if (e.target?.tagName !== 'A') window.open(`/${tool_type}/${alias}`);
  }
  return (
    <Card className={styles.card} title={<h2>{title}</h2>}>
      {tools.length
        ? tools.map((item: any) => (
            <div onClick={e => handleToDetail(item, e)} key={item._id}>
              <Card.Grid className={styles.cardItem} key={item._id}>
                <header className={styles.header}>
                  <img className={styles.cover} src={item.cover} alt={item.title} />
                  <h2 className={styles.title}>
                    <Link to={`/${item.tool_type}/${item.alias}`} title={item.title} aria-label={item.title} target="_blank">
                      {item.title}
                    </Link>
                  </h2>
                </header>
                <p className={styles.description}>{item.desc}</p>
                <footer className={styles.footer}>
                  <Tag className={styles.tag} color="#4fc08d">
                    <Link to={`/${item.tool_type}`} aria-label={NavNameMap[item.tool_type]}>
                      {NavNameMap[item.tool_type]}
                    </Link>
                  </Tag>
                  <div className={styles.views}>
                    <EyeOutlined />
                    <span className={styles.viewsText}>{item.views_count}</span>
                  </div>
                </footer>
              </Card.Grid>
            </div>
          ))
        : skeletonList.map((item, index) => (
            <Card.Grid className={styles.cardItem} key={index}>
              <Skeleton active avatar paragraph={{ rows: 3 }} />
            </Card.Grid>
          ))}
    </Card>
  );
};
