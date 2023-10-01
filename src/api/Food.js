import axios from "../utils/request"


// 收藏门店列表
export const $listCollectionShop = async () =>{
    let {data} = await axios.post('v1/collection_shop/list', {page:1, pageSize:100})
    return data
}
