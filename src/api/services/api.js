import instance from "./axios";

class API{
    async getSongs(type,search= null){
        let params ={};
        if(type==="trending"){
           params['type'] = type;
        }else{
            params['type'] = type;
            params['search'] = search;
        }
      let result = await instance.get('/songsList',{params: params});
      return result;
    }
}
export default API;