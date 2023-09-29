import React, {useState} from "react";
import "./Login.scss"
import {Button, Form, Input} from 'antd';
import {$login} from "../../api/adminApi"
import Notice from "../../components/notice/notice"

export default function Login() {
    let [noticeMsg, setNoticeMsg] = useState({type: "", description: ""})

    const [form] = Form.useForm();

    const onFinish = async (values) => {
        // TODO 修改接口的返回值，加上message, success字段
        let {userInfo} = await $login(values)
        if (userInfo) {
            setNoticeMsg({type: 'success', description: "登录成功"})
        } else {
            setNoticeMsg({type: 'error', description: "登录失败"})
        }
    };
    return (<div className="login">
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
                        username: "", password: ""
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <h2>美食后台管理系统</h2>
                    <Form.Item
                        label="账号"
                        name="username"
                        rules={[{
                            required: true, message: '请输入账号',
                        },]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{
                            required: true, message: '请输入密码',
                        },]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 4, span: 16,
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
            <div>
                <Notice noticeMsg={noticeMsg}/>
            </div>
        </div>

    )
}
