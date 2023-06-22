import React from 'react';
import Logo from 'components/Logo';
import { LoadingOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, Tabs, Table, Space } from 'antd';

import loadDb from 'utils/loadDb';
import loadDb_mt from 'utils/loadDb_mt';

const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;

interface MainLayoutProps {
  theme: {
    colorBgContainer: string;
  };
  onThemeChange: () => void; // Callback function to handle theme change
}

const MainLayout: React.FC<MainLayoutProps> = ({ theme, onThemeChange }) => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  const handleTabChange = (activeKey: string) => {
    // Perform any necessary logic when the active tab changes
    console.log('Active Tab:', activeKey);
  };

  const columns = [
    {
  title: 'TT COOL ID',
  dataIndex: 'TT_COOL_ID'
    },
    {
  title: 'SC_ONL_ID',
  dataIndex: 'SC_ONL_ID'
    },
    {
  title: 'LATOME_NAME',
  dataIndex: 'LATOME_NAME'
    },
  ];

React.useEffect(() => {
  const fetchData = async () => {
    try {
      const dba = await loadDb();
      console.log("Process finished successfully:", dba);
      
      /*
      const db = await loadDb_mt(1)
        .then((result) => {
        console.log("Mutlithread finished successfully:", result);
        // Do something with the resolved value
      })
        .catch((error) => {
        console.error("An error occurred:", error);
        // Handle any errors that occurred during the process
      });      
      */
      
      const result = dba.exec('SELECT * FROM LArId');
      // Process the result as needed
      console.log('Data:', result);

      // Get distinct columns
      const columns = result[0].columns;

      // Format the data into an array of objects
      const rows = result[0].values;
      const formattedData = rows.map((row) => {
        const rowData = {};
        row.forEach((value, index) => {
          const columnName = columns[index];
          rowData[columnName] = value;
        });
        return rowData;
      });

      setData(formattedData || []);
      setIsLoading(false);

      // Print the number of rows in the log
      console.log('Number of Rows:', formattedData.length);

    } catch (error) {
      setIsLoading(false);
      console.error('Error loading data:', error);
    }
  };

  fetchData();
}, []);


  return (
    <Layout>
      <Header
        theme="light"      
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          background: 'white',
        }}
      >
        <Space align="baseline" style={{ margin: 0 }}>
          <Logo />
          <Tabs
            defaultActiveKey="1"
            type="card"
            style={{
              position: 'absolute', // Position the button absolutely
              bottom: 0, // Align the button to the top
              right: 5, // Align the button to the right
          	}}
            onChange={handleTabChange}
            tabBarStyle={{ margin: 0, float: 'right' }}
          >
            <TabPane tab="Phase1" key="1"></TabPane>
            <TabPane tab="Phase2" key="2"></TabPane>
            <TabPane tab="EMF" key="3"></TabPane>
          </Tabs>
        </Space>
      </Header>

      <Layout hasSider>
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
        <Content
          style={{
            margin: '8px 8px',
            padding: 0,
            background: 'light',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
        {isLoading ? (
          <LoadingOutlined style={{ fontSize: 70 }} />
          ) : (
          <Table style={{align: "top"}}
            columns={columns}
            dataSource={data}
            pagination={false}
            size="small"
            scroll={{ y: 'calc(100vh - 150px)' }}
          />
  )}
</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
