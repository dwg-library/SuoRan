import * as api from '../utils/getpro';

export default{
    namespace:'info',
    state:{
        token:''
    },
    reducers:{
        change(state,{payload}){
            return{...state,...payload}
        }
    },
    effects:{
        *getData(payload,{call,put}){
            console.log(payload)
            const result=yield call(api.getList,payload.payload)
            console.log(result)
            yield put({
                type:'change',
                payload:{
                    list:result.data.data
                    }
                })
            }
        }
}