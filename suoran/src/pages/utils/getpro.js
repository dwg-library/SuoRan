import * as API from './index';
// 登录
export const getMan=(params)=>{
    return API.POST('/api/v1/auth/manager_login',params)
}
// 获取管理员信息
export const getAdmin=(params)=>{
    return API.GET('/api/v1/users/manager_info',params)
}
// 获取用户列表
export const getInfo=(params,token)=>{
    return API.GETHEAD('/api/v1/admin/users',params,token)
}
//删除用户
export const delacc=(id,token)=>{
    return API.ACCDELETE('/api/v1/admin/users/'+id,token)
}
// 删除商品
export const delpro=(id,token)=>{
    return API.ACCDELETE('/api/v1/admin/products/'+id,token)
}
//添加用户
export const getAdd=(params,token)=>{
    return API.ADD('/api/v1/admin/users',params,token)
}
// 获取订单列表
export const getOrder=(params,token)=>{
    return API.GETHEAD1('/api/v1/admin/orders',params,token)
}













export const edit=(id,token)=>{
    return API.XIUGAI('/api/v1/admin/users/'+id,token)
}



export const getRec=(token)=>{
    return API.GETURL('/api/v1/admin/orders',token)
}

export const getPro=(token,params)=>{
    return API.GETURL('/api/v1/admin/products',token,params)
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
