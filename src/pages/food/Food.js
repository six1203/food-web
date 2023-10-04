import React, { useEffect, useState } from 'react';

import { Table, Button, Popconfirm } from 'antd';
import { $listCollectionShop, $removeCollectionShop } from '../../api/foodApi';
import './Food.scss';
import AddFood from './AddFood';
import Notice from '../../components/notice/notice';

export default function Food() {
  let [shopList, setShopList] = useState([]);
  let [shopId, setShopId] = useState(0);
  // 通知框
  let [noticeMsg, setNoticeMsg] = useState({ type: '', description: '' });
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
  // 移除收藏门店
  const remove = (shopId) => {
    $removeCollectionShop(shopId).then(({ code, message }) => {
      if (code == 200) {
        setNoticeMsg({ type: 'success', description: message });
        loadList();
      } else {
        setNoticeMsg({ type: 'success', description: message });
      }
    });
  };
  // 编辑收藏门店
  const edit = (shopId) => {
    setOpen(true);
    setShopId(shopId);
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
      width: '200px',
      render: (ret) => (
        <>
          <Button
            size="small"
            style={{ borderColor: 'orange', color: 'orange' }}
            onClick={() => {
              edit(ret.id);
            }}
          >
            编辑
          </Button>
          <Popconfirm
            title="移除收藏门店"
            description="确定从我的收藏列表中移除吗？"
            onConfirm={() => {
              remove(ret.id);
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button danger size="small" style={{ marginLeft: '5px' }}>
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="search">
        <Button onClick={() => setOpen(true)}>添加</Button>
      </div>
      <Table dataSource={shopList} columns={columns} />
      <AddFood
        open={open}
        setOpen={setOpen}
        loadList={loadList}
        shopId={shopId}
        setShopId={setShopId}
      />
      <div>
        <Notice noticeMsg={noticeMsg} />
      </div>
    </>
  );
}
