import React, { useState, useEffect } from 'react';
import { Card, Avatar, Spin } from 'antd';
import Link from 'umi/link';
import styles from './Similarity.less';
import { queryTools } from '@/services/tool';

export default ({ alias }: { alias: string }) => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    queryTools({ alias, similarity: 1 })
      .then(({ tools }) => {
        if (tools) setTools(tools);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Card className={styles.card} title="推荐工具">
      <Spin spinning={loading}>
        {tools.map((item: any) => (
          <Link to={`/${item.tool_type}/${item.alias}`} target="_blank" title={item.title} aria-label={item.title}>
            <Card.Grid className={styles.cardItem} key={item._id}>
              <Card.Meta
                avatar={<Avatar src={item.cover} />}
                title={item.title}
                description={<p className={styles.description}>{item.desc}</p>}
              />
            </Card.Grid>
          </Link>
        ))}
      </Spin>
    </Card>
  );
};
