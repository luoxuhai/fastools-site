import React, { useState } from 'react';
import { List, Tooltip, Empty } from 'antd';
import { SearchOutlined, EnterOutlined, LoadingOutlined, CloseCircleFilled } from '@ant-design/icons';
import Link from 'umi/link';
import Highlighter from 'react-highlight-words';
import { searchTool } from '@/services/tool';
import styles from './index.less';

const bodyEl: any = document.querySelector('body');

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

function SearchPane({ onClose }: any): JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [tools, setTools]: any[] = useState([]);
  const [keywords, setKeywords]: any[] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleInput(e: any) {
    setInputValue(e.target.value);
  }

  function handleSearch() {
    setLoading(true);
    searchTool(inputValue).then(({ tools, keywords }) => {
      if (tools.length) {
        setTools(tools);
        setKeywords(keywords);
      } else {
        setTools([]);
        setKeywords([]);
      }
      setLoading(false);
    });
  }

  function handleKeyPress(e: any) {
    if (e.charCode === 13) handleSearch();
  }

  return (
    <div className={styles.searchPane} style={window.supportCSS3('backdrop-filter') ? {} : { backgroundColor: '#e3e3e3' }}>
      <Tooltip className={styles.close} title="关闭" placement="left">
        <CloseCircleFilled onClick={onClose} />
      </Tooltip>
      <h1 className={styles.slogan}>
        又<span>快</span>又好<span>用</span>！
      </h1>
      <h2 className={styles.description}>Fastools.cn 快用工具网提供各种优质、快捷、易用的在线工具，无需下载安装即可使用。</h2>
      <div className={styles.search} style={{ ...fullStyle, marginBottom: 20 }}>
        <SearchOutlined className={styles.search__iconsearch} />
        <input
          className={styles.search__input}
          onInput={handleInput}
          value={inputValue}
          onKeyPress={handleKeyPress}
          maxLength={20}
          autoFocus
          placeholder="搜索"
        />
        {loading ? (
          <LoadingOutlined className={styles.search__iconenter} />
        ) : (
          <Tooltip title="搜索" placement="top">
            <EnterOutlined className={styles.search__iconenter} onClick={handleSearch} />
          </Tooltip>
        )}
      </div>
      {tools.length > 0 ? (
        <List
          className={styles.searchList}
          itemLayout="horizontal"
          dataSource={tools}
          renderItem={(item: any) => (
            <Link to={`/${item.tool_type}/${item.alias}`} target="_blank" title={item.title}>
              <List.Item className={styles.listItem}>
                <List.Item.Meta
                  avatar={<img className={styles.listItemIcon} src={item.cover} alt={item.title} />}
                  title={
                    <Highlighter
                      highlightClassName={styles.highlight}
                      searchWords={keywords}
                      autoEscape={true}
                      textToHighlight={item.title}
                    />
                  }
                  description={item.desc + '...'}
                />
              </List.Item>
            </Link>
          )}
        />
      ) : (
        <Empty description="空" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
}

export default ({ full = true }: any) => {
  const [visible, setVisible] = useState(false);

  function handleVisible() {
    setVisible(true);
    bodyEl.style.overflow = 'hidden';
  }

  function handleClose() {
    setVisible(false);
    bodyEl.style.overflow = 'auto';
  }

  return (
    <>
      {full && (
        <>
          <h1 className={styles.slogan}>
            又<span>快</span>又好<span>用</span>！
          </h1>
          <h2 className={styles.description}>Fastools.cn 快用工具网提供各种优质、快捷、易用的在线工具，无需下载安装即可使用。</h2>
        </>
      )}
      <div className={full ? styles.search : styles.searchLine} onClick={handleVisible} style={full ? fullStyle : lineStyle}>
        <SearchOutlined className={styles.search__iconsearch} style={{ fontSize: full ? 24 : 18 }} />
        <input
          className={styles.search__input}
          onFocus={handleVisible}
          placeholder="搜索"
          style={{ height: full ? '' : 36, backgroundColor: 'inherit' }}
        />
        {full && <EnterOutlined className={styles.search__iconenter} />}
      </div>
      {visible && <SearchPane onClose={handleClose} />}
    </>
  );
};
