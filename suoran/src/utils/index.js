import axios from 'axios';
var baseUrl='http://api.cat-shop.penkuoer.com';

export const GET=(url,params)=>{
    return axios.get(`${baseUrl}${url}`,{params:params}).then(data=>data)
}

export const POST=(url,params)=>{
    return axios.post(`${baseUrl}${url}`,params).then(data=>data)
}

export const GETHEAD=(url,params,token)=>{
    return axios({
      method:'get',
      url:`${baseUrl}${url}`,
      params:params,
      headers:{authorization:'Bearer ' +token}
    })
    }

export const POSTHPRO=(url,params,token)=>{
  return axios({
    method:'POST',
    url:`${baseUrl}${url}`,
    params:params,
    headers:{authorization:'Bearer ' +token}
  })
  }

export const DELETE=(url,params,token)=>{
    return axios({
      method:'delete',
      url:`${baseUrl}${url}`,
      params:params,
      headers:{authorization:'Bearer ' +token}
    })
  }


export const XIUGAI=(url,token)=>{
  return axios({
    method:'put',
    url:`${baseUrl}${url}`,
    headers:{authorization:'Bearer ' +token}
  })
}





  export const POST_Token=(url,params,token)=>{
    return axios.post(`${baseUrl}${url}`,params,{
      headers:{authorization:'Bearer ' +token}
      })
  }
  
