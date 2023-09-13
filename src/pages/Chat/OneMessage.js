import axios from "axios";
import { useState } from "react";
import { useEffect } from "react"
import {  useLocation } from "react-router-dom";


export default function OneMessage()
{

    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
    
    let {state} = useLocation();
    console.log(state);
    const [msgid,setMsgId] = useState();
    useEffect(()=>{
        axios.get(`/messages/${state.id}/message`,{
            headers: { Authorization: `Bearer ${actoken}` },
            headers: { Auth: retoken }
        })
        .then(response=>(
            console.log(response.data.result.data)
        ))
        .catch(error=>(
            console.log(error.response.data.result)
        ))
    },[])
    return(
        <div>쪽지</div>
    )
}