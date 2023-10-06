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
          colorPrimary: '#FFB7CC',
          colorFillQuaternary: '#F5DAE3',
          colorBgBase: '#FFB7CC',
          colorBgLayout: '#FFB7CC',
          colorBgElevated: '#FFB7CC',
        },
      }}
    >
      <App />
    </ConfigProvider>
  </DevSupport>,
);
