import axios from "axios";
import { useQuery } from "react-query";


export default function useReactQuery(url)
{
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
  
    let result = useQuery(['infos'],()=>{
        return axios.get(url,{
            headers: { 'Authorization' : `Bearer ${actoken}`,
            'Auth' : retoken }
        }).then((a)=>{
            return a.data;
        })
    })
    // console.log(result);
    return result;
    
}
