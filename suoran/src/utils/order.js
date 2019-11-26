import * as API from './index';

//获取订单
export const getList=(token,params)=>{
    return API.GETHEAD('/api/v1/admin/orders',token,params)
}

// 查询商品
export const getpro=(id,token)=>{
    return API.SEARCH('/api/v1/admin/orders/'+id,token)
}