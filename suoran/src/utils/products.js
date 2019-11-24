import * as API from './index';

export const getList=(token,params)=>{
    return API.GETHEAD('/api/v1/admin/products',token,params)
}

// export const addList=(token,params)=>{
//     return API.POSTHPRO('/api/v1/admin/products',token,params)
// }
 
// export const revise=(token,params)=>{
//     return API.XIUGAI('/api/v1/admin/products/:id',token,params)
// }

// export const del=(token,params)=>{
//     return API.DELETE('/api/v1/admin/products/:id',token,params)
// }

// export const See=(params)=>{
//     return API.GET('/api/v1/admin/products/:id',params)
// }