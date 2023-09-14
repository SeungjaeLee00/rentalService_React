import axios from "axios";
import { useState } from "react";
import { useEffect } from "react"
import { useLocation } from "react-router-dom";
import '../../style/OneMessage.css';

export default function OneMessage() {

    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;

    let { state } = useLocation();
    console.log(state);

    const [msg, setMsg] = useState();
    useEffect(() => {
        axios.get(`/messages/${state}/message`, {
            headers: { Authorization: `Bearer ${actoken}` },
            headers: { Auth: retoken }
        })
            .then(response => {
                console.log(response.data.result.data);
                setMsg(response.data.result.data)
            })
            .catch(error => (
                console.log(error.response.data.result)
            ))
    }, [])
    return (
        <div>
            {msg ? <>
                <div className="one-wrap">
                    <div className="one-top">
                        <div className="top-title"><h1 style={{marginLeft:"30px"}}>쪽지함</h1></div>
                        <div className="top-info">
                            <div className="info-left">
                                <div className="left-top">
                                    <div style={{fontSize:"25px", marginLeft:"30px"}}>게시글제목:{msg.postTitle}</div>
                                    <div style={{marginLeft:"300px", marginLeft:"200px"}}>보낸날짜: {msg.createdDate}</div>
                                </div>
                                <div style={{marginTop:"30px", marginLeft:"30px"}} className="left-bottom">발신자 : {msg.senderNickname}</div>
                            </div>
                            <div className="info-right">
                                <button>답장</button>
                                <button style={{marginLeft:"20px"}}>삭제</button>
                            </div>
                        </div>
                    </div>
                    <div className="one-bottom">
                        <div className="msg-content">{msg.content}</div>
                        <div className="msg-bottom">
                            <button>목록으로</button>
                        </div>
                    </div>
                </div> </> : null}
        </div>
    )
}