import React, {useEffect, useState} from "react";

import {Table, Button, Drawer, Form, Input, Checkbox} from 'antd';
import {$listCollectionShop} from "../../api/foodApi"
import "./Food.scss"

export default function Food() {
    let [shopList, setShopList] = useState([])
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        $listCollectionShop().then(data=> {
            data = data.data.data.map(r=> {
                return {
                    ...r,
                    key: r.id
                }
            })
            setShopList(data)
        })
    }, [])

    const columns = [
        {
            title: '美食分类',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '门店logo',
            dataIndex: 'logo',
            key: 'logo',
        },
        {
            title: '地址',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: '收藏时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
    ];


    const onFinish = (values) => {
        console.log('Success:', values);
    };


    return (
        <>
            <div className="search">
                <Button onClick={()=>setOpen(true)}>添加</Button>
            </div>
            <Drawer title="添加喜欢的门店" width={400} placement="right" onClose={onClose} open={open}>
                <Form
                    name="basic"
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
                        <Button style={{marginLeft: "10px"}}>
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            <Table dataSource={shopList} columns={columns}/>
        </>

    )
}
