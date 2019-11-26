import * as API from './index';

// 获取商品
export const getList=(params,token)=>{
    return API.GETHEAD('/api/v1/admin/products',params,token)
}

// 删除商品
export const del=(id,token)=>{
    return API.ACCDELETE('/api/v1/admin/products/'+id,token)
}
// 添加商品
export const getAdd=(params,token)=>{
    return API.ADD('/api/v1/admin/products/'+params,token)
}
// 查询商品
export const getpro=(id,token)=>{
    return API.SEARCH('/api/v1/admin/products/'+id,token)
}
