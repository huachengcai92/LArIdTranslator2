import React from 'react';
import { Button, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const Logo: React.FC = () => (
        <Sider
          theme="light"
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'sticky',
            left: 0,
            top: 0,
            bottom: 0,            
 	        width: collapsed ? '36px' : '200px',            
          }}
        >
          <Button
          	theme="light"
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 36,
              height: 36,
            }}
          />
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} 
	            style={collapsed ? { display: 'none' } : {}}>
            <Menu.Item key="1">Cells</Menu.Item>
            <Menu.Item key="2">SuperCells</Menu.Item>
            <Menu.Item key="3">LATOMEs</Menu.Item>
          </Menu>
        </Sider>
);

export default Sider;