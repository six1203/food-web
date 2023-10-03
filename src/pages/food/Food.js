import React, { useEffect, useState } from 'react';

import { Table, Button } from 'antd';
import { $listCollectionShop } from '../../api/foodApi';
import './Food.scss';
import AddFood from './AddFood';

export default function Food() {
  let [shopList, setShopList] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    loadList();
  }, []);
  const loadList = () => {
    $listCollectionShop().then((data) => {
      data = data.data.data.map((r) => {
        return {
          ...r,
          key: r.id,
        };
      });
      setShopList(data);
    });
  };

  const columns = [
    {
      title: '美食分类',
      dataIndex: 'category',
      key: 'category',
      width: '100px',
      align: 'center',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: '200px',
      align: 'center',
    },
    {
      title: '门店logo',
      dataIndex: 'logo',
      key: 'logo',
      width: '100px',
      align: 'center',
      render: (ret) => <img style={{ width: '70px' }} src={ret} />,
    },
    {
      title: '颜色程度',
      dataIndex: 'star',
      key: 'star',
      width: '100px',
      align: 'center',
      render: (ret) => (
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((index) => (
            <span
              key={index}
              className={`star ${index <= ret ? 'filled' : ''}`}
            >
              ★
            </span>
          ))}
        </div>
      ),
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width: '500px',
      align: 'center',
    },
    {
      title: '收藏时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: '200px',
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      align: 'center',
      render: (ret) => (
        <Button size="small">删除</Button>
        // <Button>删除</Button>
      ),
    },
  ];

  return (
    <>
      <div className="search">
        <Button onClick={() => setOpen(true)}>添加</Button>
      </div>
      <Table dataSource={shopList} columns={columns} />
      <AddFood open={open} setOpen={setOpen} loadList={loadList} />
    </>
  );
}
