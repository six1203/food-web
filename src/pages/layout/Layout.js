import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  WifiOutlined,
  GiftOutlined,
  CrownOutlined,
  NotificationOutlined,
  SettingOutlined,
  HomeOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons';

import { Layout, Menu, Modal, theme } from 'antd';

const { confirm } = Modal;
const { Header, Sider, Content } = Layout;

import './Layout.scss';
import { useNavigate, Outlet } from 'react-router-dom';

export default function () {
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  const [current, setCurrent] = useState('mail');

  // 顶部菜单项
  const items = [
    {
      label: '首页',
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: '通知',
      key: 'notice',
      icon: <NotificationOutlined />,
    },
    {
      label: '个人中心',
      key: 'personalCenter',
      icon: <SettingOutlined />,
      children: [
        {
          key: 'info',
          label: '个人信息',
        },
        {
          key: 'logout',
          label: '退出',
        },
      ],
    },
  ];

  // 左侧菜单项
  const items2 = [
    {
      key: 'turntable',
      icon: <GiftOutlined />,
      label: '幸运大转盘',
    },
    {
      key: 'foodPlaza',
      icon: <CrownOutlined />,
      label: '美食广场',
      children: [
        {
          key: 'food',
          label: '收藏门店',
        },
        {
          key: 'cookbook',
          label: '家常菜谱',
        },
      ],
    },
    {
      key: 'order',
      icon: <WifiOutlined />,
      label: '订单管理',
    },
  ];

  const onClickMenu = (e) => {
    switch (e.key) {
      case 'food':
        navigate('/layout/food');
        break;
      
      case 'cookbook':
        navigate('/layout/cookbook')
        break
      case 'logout':
        confirm({
          title: '系统提示',
          icon: <ExclamationCircleFilled />,
          content: '确定退出系统吗',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            // 清空token，退出，跳转到登录页
            sessionStorage.clear();
            localStorage.clear();
            navigate('/');
          },
        });
        break;
    }
    setCurrent(e.key);
  };

  // 侧边栏折叠状态
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">{collapsed ? '' : '食谱管理系统'}</div>
        <Menu
          onClick={onClickMenu}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[current]}
          items={items2}
        />
      </Sider>
      <Layout>
        <Header className="header">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            },
          )}

          <Menu
            onClick={onClickMenu}
            theme="dark"
            className="menu"
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
        </Header>
        <Content className="content">
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
}
