import React, { useState } from 'react';
import { List, Avatar } from 'antd';
import { SearchOutlined, EnterOutlined, LoadingOutlined, CloseCircleFilled } from '@ant-design/icons';
import Link from 'umi/link';
import { searchTool } from '@/services/tool';
import styles from './index.less';

const rootEl: any = document.getElementById('root');

const fullStyle = {
  height: 50,
  margin: '120px auto',
  marginTop: 50,
  maxWidth: 840,
};

const lineStyle = {
  height: 36,
  marginRight: '3vw',
  maxWidth: 300,
  backgroundColor: '#f6f7f9',
};

let inputValue = '';

function SearchPane({ onSearch, onClose, onKeyPress, tools, loading }: any): JSX.Element {
  return (
    <div className={styles.searchPane} style={window.supportCSS3('backdrop-filter') ? {} : { backgroundColor: '#e3e3e3' }}>
      <CloseCircleFilled className={styles.close} onClick={onClose} title="关闭" />
      <h1 className={styles.slogan}>
        好<span>快</span>又好<span>用</span>！
      </h1>
      <h3 className={styles.description}>Fastools.cn 快用工具网提供各种优质,快捷,易用的在线工具，无需下载安装即可使用。</h3>
      <div className={styles.search} style={{ ...fullStyle, marginBottom: 20 }}>
        <SearchOutlined className={styles.search__iconsearch} />
        <input
          className={styles.search__input}
          onInput={(e: any) => {
            inputValue = e.target.value;
          }}
          onKeyPress={onKeyPress}
          maxLength={20}
          autoFocus
          placeholder="搜索"
        />
        {loading ? (
          <LoadingOutlined className={styles.search__iconenter} />
        ) : (
          <EnterOutlined className={styles.search__iconenter} onClick={onSearch} title="搜索" />
        )}
      </div>
      {tools.length > 0 && (
        <List
          className={styles.searchList}
          itemLayout="horizontal"
          dataSource={tools}
          renderItem={(item: any) => (
            <Link to={`/${item.tool_type}/${item.alias}`} target="_blank" title={item.title}>
              <List.Item className={styles.listItem}>
                <List.Item.Meta avatar={<Avatar src={item.cover} />} title={item.title} description={item.desc + '...'} />
              </List.Item>
            </Link>
          )}
        />
      )}
    </div>
  );
}

export default ({ full = true }: any) => {
  const [visible, setVisible] = useState(false);
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleVisible() {
    setVisible(true);
    rootEl.style.overflow = 'hidden';
  }

  function handleClose() {
    setVisible(false);
    rootEl.style.overflow = 'auto';
  }

  function handleSearch() {
    setLoading(true);
    searchTool(inputValue).then(res => {
      if (res?.length) setTools(res);
      setLoading(false);
    });
  }

  function handleKeyPress(e: any) {
    if (e.charCode === 13) handleSearch();
  }

  return (
    <>
      {full && (
        <>
          <h1 className={styles.slogan}>
            好<span>快</span>又好<span>用</span>！
          </h1>
          <h3 className={styles.description}>Fastools.cn 快用工具网提供各种优质,快捷,易用的在线工具，无需下载安装即可使用。</h3>
        </>
      )}
      <div className={styles.search} onClick={handleVisible} style={full ? fullStyle : lineStyle}>
        <SearchOutlined className={styles.search__iconsearch} />
        <input
          className={styles.search__input}
          onFocus={handleVisible}
          placeholder="搜索"
          style={{ height: 'inherit', backgroundColor: 'inherit' }}
        />
        {full && <EnterOutlined className={styles.search__iconenter} />}
      </div>
      {visible && <SearchPane onSearch={handleSearch} onClose={handleClose} onKeyPress={handleKeyPress} tools={tools} loading={loading} />}
    </>
  );
};
