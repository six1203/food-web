import React from "react";
import "./Login.scss"

import {Button, Form, Input} from 'antd';

export default function Login() {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success:', values);
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
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        username: "",
                        password: ""
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
                        <Input/>
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
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                        <Button onClick={() => {
                            form.resetFields()
                        }} style={{marginLeft: "10px"}}>
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>

    )
}
