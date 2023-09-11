import axios from "axios";
import { useState } from "react";
import { useEffect } from "react"

export default function MyLike()
{
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
    const [likepost, setLikePost] = useState();

    useEffect(()=>{
        axios.get('/posts/likes', {
            headers: { Authorization: `Bearer ${actoken}` },
            headers: { Auth: retoken }
        })
            .then(response => {
                console.log("본인찜조회성공");
                console.log(response.data.result.data);
                setLikePost(response.data.result.data);
            })
            .catch(error => {
                console.log(error.response.data.result);
            })
    },[])

    return(
        <div className="MyLike-wrap">
            <div style={{padding:"10px" ,borderBottom:"1px solid black" ,width:"1720px"}} className="Like-top">
                <p style={{fontSize:"25px"}}>찜</p>
            </div>
            <div className="Like-bottom">
                {likepost?  likepost.postList.map(a=>(
                    <div>
                        <div>{a.title}</div>
                        <div>{a.createdTime.replace("T"," ")}</div>
                    </div>
                    
                )) : null}
            </div>
        </div>
    )
}