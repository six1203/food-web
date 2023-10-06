import React from 'react';
import ReactDOM from 'react-dom/client';
import 'antd/dist/reset.css';
import './index.css';
import { ConfigProvider } from 'antd';

import App from './App';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { ComponentPreviews, useInitial } from './dev';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
    <ConfigProvider
      theme={{
        token: {
          // colorPrimary: '#F5DAE3',
          // 控制按钮的颜色
          colorPrimary: '#FFDFDD',
          colorPrimary: '#3ba0e9',
          // 控制选中列表行的数据背景色
          colorFillQuaternary: '#F5DAE3',
          colorBgBase: '#FFB7CC',
          colorBgLayout: '#FFB7CC',
        },
      }}
    >
      <App />
    </ConfigProvider>
  </DevSupport>,
);
