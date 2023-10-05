import React, { useEffect, useState } from 'react';

import { Table, Button, Popconfirm, Pagination, Input } from 'antd';
const { Search } = Input;
import { $listCollectionShop, $removeCollectionShop } from '../../api/foodApi';
import './Food.scss';
import AddFood from './AddFood';
import Notice from '../../components/notice/notice';

export default function Food() {
  let defaultPageSize = 20;
  let [count, setCount] = useState(0);
  let [pageIndex, setPageIndex] = useState(1);
  let [fuzzySearchText, setFuzzySearchText] = useState('');

  let [shopList, setShopList] = useState([]);
  // 通过shopId是否有值来判断是否进入编辑状态，有值就是编辑状态，没有值就是新增状态
  let [shopId, setShopId] = useState(0);
  // 通知框
  let [noticeMsg, setNoticeMsg] = useState({ type: '', description: '' });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    loadList();
  }, [pageIndex, fuzzySearchText]);
  const loadList = () => {
    $listCollectionShop({
      page: pageIndex,
      pageSize: defaultPageSize,
      fuzzySearchText: fuzzySearchText,
    }).then((data) => {
      let obj = data.data;
      data = obj.data.map((r) => {
        return {
          ...r,
          key: r.id,
        };
      });
      count = obj.total;
      setShopList(data);
      setCount(count);
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
            style={{ borderColor: 'white', color: 'white' }}
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
            <Button
              size="small"
              style={{ marginLeft: '5px', color: '#696165' }}
            >
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <div
        className="search"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Search
          placeholder="输入美食分类/名称/地址搜索"
          enterButton="搜索"
          size="large"
          style={{ width: '400px', height: '40px' }}
          onPressEnter={(e) => {
            setFuzzySearchText(e.target.value);
          }}
          onSearch={(value) => {
            setFuzzySearchText(value);
          }}
        />
        <div>
          <Button
            onClick={() => setOpen(true)}
            style={{
              marginLeft: '25px',
              height: '40px',
              width: '70px',
            }}
            type="primary"
          >
            添加
          </Button>
        </div>
      </div>
      <Table
        bordered={true}
        size="small"
        dataSource={shopList}
        columns={columns}
        pagination={false}
        // footer 表格尾部
        footer={() => (
          <div style={{ textAlign: 'right' }}>
            <Pagination
              size="small"
              total={count}
              showTotal={(total) => `总共 ${total} 条`}
              defaultPageSize={defaultPageSize}
              defaultCurrent={pageIndex}
              onChange={(page) => {
                setPageIndex(page);
              }}
            />
          </div>
        )}
      />
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
