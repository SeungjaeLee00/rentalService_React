import axios from "axios"
import { useEffect } from "react"
import { useLocation, useParams } from "react-router-dom"

export default function SearchItem(props)
{
    const location = useLocation();
    console.log(location);
    // useEffect(()=>{
    //     axios.get('/posts?title='+)
    // })
    return(
        <div>검색결과페이지입니다.</div>
    )
}