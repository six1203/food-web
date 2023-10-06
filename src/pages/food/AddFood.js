import React, { useEffect, useState } from 'react';

import { Button, Drawer, Form, Input, Rate } from 'antd';
import './Food.scss';
import Notice from '../../components/notice/notice';
import {
  $addCollectionShop,
  $getCollectionShopById,
  $updateCollectionShopById,
} from '../../api/foodApi';

export default function AddFood({
  open,
  setOpen,
  loadList,
  shopId,
  setShopId,
}) {
  let [form] = Form.useForm();
  // 通知框
  let [noticeMsg, setNoticeMsg] = useState({ type: '', description: '' });
  const [star, setStar] = useState(0);

  // 监听shopId变化，如果变了，代表是编辑状态，初始值为0
  useEffect(() => {
    if (shopId !== 0) {
      $getCollectionShopById({ shopId }).then((data) => {
        const initialValues = data.data.collectionShop;
        form.setFieldsValue(initialValues);
        setStar(initialValues.star);
      });
    }
  }, [shopId, form]);

  const onFinish = (values) => {
    if (shopId !== 0) {
      $updateCollectionShopById(values).then(({ code, message }) => {
        if (code == 200) {
          setNoticeMsg({ type: 'success', description: message });
          onClose();
          loadList();
        } else {
          setNoticeMsg({ type: 'error', description: message });
        }
      });
    } else {
      $addCollectionShop(values).then(({ code, message }) => {
        if (code == 200) {
          setNoticeMsg({ type: 'success', description: message });
          onClose();
          loadList();
        } else {
          setNoticeMsg({ type: 'error', description: message });
        }
      });
    }
  };

  const onClose = () => {
    clear(); // 清空表单
    setShopId(0); // 取消编辑状态
    setOpen(false); // 关闭抽屉
    setStar(0); // 清空星星
  };

  const clear = () => {
    form.resetFields();
  };

  const desc = ['踩雷', '差点意思', '一般', '还不错', '力荐'];
  return (
    <>
      <Drawer
        title={shopId ? '修改喜欢的门店' : '添加喜欢的门店'}
        width={700}
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
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="门店ID" name="id" hidden>
            <Input />
          </Form.Item>
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

          <Form.Item label="喜爱程度" name="star">
            <span>
              <Rate
                tooltips={desc}
                value={star}
                onChange={(value) => {
                  setStar(value);
                  form.setFieldsValue({ star: value }); // 手动更新表单字段
                }}
                defaultValue={1}
                style={{ color: '#1B3CFB' }}
              />
              {star ? (
                <span className="ant-rate-text">{desc[star - 1]}</span>
              ) : (
                ''
              )}
            </span>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              {shopId ? '修改' : '添加'}
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
  );
}
