import React, { useEffect } from 'react';
import { notification } from 'antd';

export default function Notice({ noticeMsg }) {
  const [api, contextHolder] = notification.useNotification();
  useEffect(() => {
    if (noticeMsg.type) {
      api[noticeMsg.type]({
        message: '系统提示',
        description: noticeMsg.description,
        duration: 2,
      });
    }
  }, [noticeMsg]);

  return <>{contextHolder}</>;
}
