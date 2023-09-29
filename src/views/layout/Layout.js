import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { Layout, Menu, Button, theme } from "antd";

const { Header, Sider, Content } = Layout;

import "./Layout.scss";

export default function () {
  const [current] = useState("mail");
  // 顶部菜单项
  const items = [
    {
      label: "首页",
      key: "home",
      icon: <MailOutlined />,
    },
    {
      label: "通知",
      key: "notice",
      icon: <MailOutlined />,
    },
    {
      label: "个人中心",
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        {
          key: "1",
          label: "个人信息",
        },
        {
          key: "2",
          label: "退出",
        },
      ],
    },
  ];

  // 左侧菜单项
  const items2 = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "转盘下单",
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: "食谱管理",
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "订单管理",
    },
  ];

  // 侧边栏折叠状态
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout className="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">{collapsed ? "" : "食谱管理系统"}</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items2}
        />
      </Sider>
      <Layout>
        <Header className="header">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            },
          )}

          <Menu
            theme="dark"
            className="menu"
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
        </Header>
        <Content className="content">Content</Content>
      </Layout>
    </Layout>
  );
}
