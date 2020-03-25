import React from 'react';
import { Collapse } from 'antd';
import styles from './Description.less';

export default ({ tool }: any) => {
  return (
    <Collapse className={styles.collapse} defaultActiveKey={['0', '1']}>
      <Collapse.Panel header="工具介绍" key="0">
        <p aria-label="工具介绍">{tool.desc}</p>
      </Collapse.Panel>
      <Collapse.Panel header="使用说明" key="1">
        <div aria-label="使用说明" dangerouslySetInnerHTML={{ __html: tool.direction }} />
      </Collapse.Panel>
    </Collapse>
  );
};
