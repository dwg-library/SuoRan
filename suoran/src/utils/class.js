import * as API from './index';

export const getList=(token,params)=>{
    return API.GETHEAD('/api/v1/admin/product_categories',token,params)
}