import * as API from './index';

//获取商品分类
export const getList=(token,params)=>{
    return API.GETHEAD1('/api/v1/admin/product_categories',token,params)
}

// 删除商品
export const delpro=(id,token)=>{
    return API.ACCDELETE('/api/v1/admin/product_categories/'+id,token)
}