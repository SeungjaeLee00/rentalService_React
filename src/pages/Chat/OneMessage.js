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
                        <div className="top-title"><h1>쪽지함</h1></div>
                        <div className="top-info">
                            <div className="info-left">
                                <div className="left-top">
                                    <div>게시글제목</div>
                                    <div>보낸날짜</div>
                                </div>
                                <div className="left-bottom">발신자</div>
                            </div>
                            <div className="info-right">
                                <button style={{marginLeft:"7+850px"}}>답장</button>
                            </div>
                        </div>
                    </div>
                    <div className="one-bottom">
                        <div className="msg-content">쪽지내용</div>
                        <div className="msg-bottom">
                            <button>목록으로</button>
                        </div>
                    </div>
                </div> </> : null}
        </div>
    )
}