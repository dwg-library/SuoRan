import * as API from './index';

//获取订单
export const getList=(token,params)=>{
    return API.GETHEAD('/api/v1/admin/orders',token,params)
}
