import React, { useEffect, useState } from 'react';

import {Button, Drawer, Form, Input } from 'antd';
import './Food.scss';
import Notice from '../../components/notice/notice';
import {$addCollectionShop} from "../../api/foodApi";

export default function AddFood({open, setOpen, loadList}) {
    let [form] = Form.useForm();
    // 通知框
    let [noticeMsg, setNoticeMsg] = useState({ type: '', description: '' });

    const onFinish = (values) => {
        $addCollectionShop(values).then(({ code, message }) => {
          if (code == 200) {
            setNoticeMsg({ type: 'success', description: message });
            clear();
            loadList();
          } else {
            setNoticeMsg({ type: 'error', description: message });
          }
        });
      };

    const onClose = () => {
        clear();
        setOpen(false);
      };
    
    const clear = () => {
        form.resetFields();
        setOpen(false)
      };
    
    
    return (
        <>
            <Drawer
                title="添加喜欢的门店"
                width={400}
                placement="right"
                onClose={onClose}
                open={open}
            >
                <Form
                    name="basic"
                    form={form}
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="美食分类"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: '请输入美食分类',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="门店名称"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入要收藏的门店名称',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="门店logo"
                        name="logo"
                        rules={[
                            {
                                required: true,
                                message: '请输入要收藏的门店logo',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="门店地址"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: '请输入要收藏的门店地址',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            添加
                        </Button>
                        <Button onClick={clear} style={{ marginLeft: '10px' }}>
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            <div>
                <Notice noticeMsg={noticeMsg} />
            </div>

        </>
    )
}
