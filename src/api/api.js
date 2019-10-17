import axios from "axios";

const adress = "http://localhost:3090/"
const localStorageKey = "__RecipeShoppingListToken__"
const token = localStorage.getItem(localStorageKey)
const auth = { headers: {"Authorization" : `Bearer ${token}`} };

export async function Get(endpoint,id = false) {
    const url = adress + endpoint
    
    const idQuery = id === false ? "" : `?id=${id}`;
    return await axios.get(url + idQuery,{ ...auth })
}

export async function Post(endpoint,payload) {
    const url = adress + endpoint
    
    if(payload === undefined || payload === "")
        return {data : {error: "missing payload"}} ;
      
    return await axios.post(url,{...payload},{ ...auth })
}

export async function Data(endpoint,data){
    const axiosData = {
        method: 'post',
        url: adress + endpoint,
        data: data,
        headers :  {...auth.headers}
      }
    
      console.log("AxiosData:" + axiosData)
      console.log(axiosData)
    return await axios(axiosData);
}



