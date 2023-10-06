import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import { Button, Form, Input } from 'antd';
import { $login } from '../../api/userApi';
import Notice from '../../components/notice/notice';

export default function Login() {
  // 导航
  let navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      navigate('/layout');
    }
  }, []);

  // 通知框
  let [noticeMsg, setNoticeMsg] = useState({ type: '', description: '' });
  // 表单
  const [form] = Form.useForm();
  // 表单成功提交的方法
  const onFinish = async (values) => {
    // TODO 修改接口的返回值，加上message, success字段
    let { code } = await $login(values);
    if (code === 200) {
      setNoticeMsg({ type: 'success', description: '登录成功' });
      // 跳转到首页
      navigate('/layout/food');
    } else {
      setNoticeMsg({ type: 'error', description: '登录失败' });
    }
  };
  return (
    <div className="login">
      <div className="content">
        <Form
          name="basic"
          form={form}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 18,
          }}
          initialValues={{
            username: '',
            password: '',
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <h2>美食后台管理系统</h2>
          <Form.Item
            label="账号"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入账号',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 4,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{ border: '0.1px solid white' }}
            >
              登录
            </Button>
            <Button
              onClick={() => {
                form.resetFields();
              }}
              style={{ marginLeft: '10px', border: '0.1px solid white', color: 'white' }}
            >
              取消
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        <Notice noticeMsg={noticeMsg} />
      </div>
    </div>
  );
}
