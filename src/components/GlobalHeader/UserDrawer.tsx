import React from 'react';
import { Layout, Menu, Dropdown, Avatar, Drawer, Icon } from 'antd';

export default ({ visible, onCloseDrawer }: any) => {
  return (
    <Drawer title="个人中心" placement="right" onClose={onCloseDrawer} width={400} closable={true} visible={visible}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};
