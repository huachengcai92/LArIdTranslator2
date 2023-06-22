import React from 'react';
import { Typography, Button, theme, Space} from 'antd';

const { Title } = Typography;

const Logo: React.FC = () => (
  <Title 
    level={3}
    style={{ color: "black" }} // Change the text color here
  >
    <Space align="center" style={{ display: "flex", alignItems: "center" }}>
      <span style={{ marginRight: "4px" }}>LArIdTranslator</span>
      <Button type="primary" shape="round" icon="2.0" size="small" style={{ marginBottom: "6px" }} />
    </Space>
  </Title>
);

export default Logo;
