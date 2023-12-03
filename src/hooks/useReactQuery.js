import axios from "axios";
import { useQuery } from "react-query";

export default function useReactQuery(url)
{
    let result = useQuery(['users'],()=>{
        return axios.get(url).then((a)=>{
            return a.data;
        })
    })
    console.log(result);
    return result;
    
}
