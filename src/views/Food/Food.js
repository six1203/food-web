import React, {useEffect, useState} from "react";

import {Table} from 'antd';
import {$listCollectionShop} from "../../api/Food"

export default function Food() {
    let [shopList, setShopList] = useState([])

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


    return (
        <>
            <Table dataSource={shopList} columns={columns}/>
        </>

    )
}
