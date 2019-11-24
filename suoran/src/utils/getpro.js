import * as API from './index';

export const getMan=(params)=>{
    return API.POST('/api/v1/auth/manager_login',params)
}

export const getAdmin=(params)=>{
    return API.GET('/api/v1/users/manager_info',params)
}

export const getInfo=(token)=>{
    return API.GETHEAD('/api/v1/admin/users',token)
}

export const del=(id,token)=>{
    return API.DELETE('/api/v1/admin/users/5c6e953a224d199e15f12b9d'+id,token)
}

export const edit=(id,token)=>{
    return API.XIUGAI('/api/v1/admin/users/5c6e953a224d199e15f12b9d',id,token)
}






export const cart=(params,token)=>{
    return API.POST_Token('/api/v1/shop_carts',params,token)
}

export const cartList=(params,token)=>{
    return API.GETHEAD('/api/v1/shop_carts',params,token)
}




export const address=(params,token)=>{
    return API.POST_Token('/api/v1/addresses',params,token)
}

export const xiugai=(params,token)=>{
    return API.XIUGAI('/api/v1/addresses',params,token)
}
