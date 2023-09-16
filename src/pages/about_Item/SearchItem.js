import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"


export default function SearchItem(props)
{
    const id = useParams();
    console.log(id);
    
    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error,setError] = useState(null);

    const fetchItem = async()=>{
        try{
            //요청이 시작할때 error와 items를 초기화
            setError(null);
            setItems(null);
            //loading 상태를 treu
            setLoading(true);
            const response = await axios.get(`/posts?title=${id.contents}`);
            console.log(response);
            setItems(response.data);
        }catch(e){
            setError(e);
         }
        setLoading(false);
    };

    useEffect(()=>{
        fetchItem();
    },[]);

    if(loading) return <div>로딩중..</div>
    if(error) return <div>에러가 발생했습니다</div>

    return(
        <div>
            
        </div>
    )
}