import axios from '../utils/request';

// 收藏门店列表
export const $listCollectionShop = async (params) => {
  let { data } = await axios.post('v1/collection_shop/list', params);
  return data;
};

// 新增收藏门店
export const $addCollectionShop = async (params) => {
  let { data } = await axios.post('v1/collection_shop/create', params);
  return data;
};

// 移除收藏门店
export const $removeCollectionShop = async (params) => {
  let { data } = await axios.post('v1/collection_shop/remove', { id: params });
  return data;
};

// 通过ID获取门店详情
export const $getCollectionShopById = async (params) => {
  // let { data } = await axios.get('v1/collection_shop/' + params.shopId);
  // 注意这里使用模版字符串要用 ``不是字符串''
  let { data } = await axios.get(`v1/collection_shop/${params.shopId}`);
  return data;
};

// 修改收藏的门店
export const $updateCollectionShopById = async (params) => {
  let { data } = await axios.post(`v1/collection_shop/${params.id}`, params);
  return data;
};
