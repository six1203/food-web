import React from 'react';
import { Layout, Space } from 'antd';
import './Wheel.scss';

const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  backgroundColor: '#7dbcea',
};
const contentStyle = {
  textAlign: 'center',
  height: '561px',
  color: '#fff',
  backgroundColor: '#108ee9',
};
const siderStyle = {
  textAlign: 'center',
  height: '120px',
  color: '#fff',
  backgroundColor: '#3ba0e9',
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
  height: '64px',
};

export default function Wheel() {
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
      size={[0, 48]}
    >
      <Layout>
        <Layout>
          <Header style={headerStyle}>
            《《距离吃饭只有一步之遥哦》》
            {/* <span  style={{textAlign: 'center'}}>今日还有2次机会抽奖</span> */}
          </Header>
          <Content style={contentStyle}>
            转盘转动随机选择一款你的心动食物
          </Content>
          <Footer style={footerStyle}>点击下单</Footer>
        </Layout>
        <Sider style={siderStyle}>切换视角</Sider>
      </Layout>
    </Space>
  );
}
