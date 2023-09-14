import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function MessageList(props) {
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
    
    const [message, setMessage] = useState();
    const [msgid, setMsgId] = useState();
    
    const navigate = useNavigate();
    const [who,setWho] = useState("received");

    useEffect(() => {
        console.log(props.mypost);
        axios.get("/messages/received", {

            headers: { Authorization: `Bearer ${actoken}` },
            headers: { Auth: retoken }
        })
            .then(response => {
                console.log("received메시지조회성공");
                setMessage(response.data.result.data);
                console.log(response.data.result.data);
            })
            .catch(error => {
                console.log(error.response.data.result);
            })
    }, [])
    //받은쪽지 클릭 실행되는 함수 
    function receiveHandle() {
        setWho("received");
        axios.get("/messages/received", {

            headers: { Authorization: `Bearer ${actoken}` },
            headers: { Auth: retoken }
        })
            .then(response => {
                console.log("메시지조회성공");
                setMessage(response.data.result.data);
                console.log(response.data.result.data);
            })
            .catch(error => {
                console.log(error.response.data.result);
            })
    }
    //보낸쪽지 클릭 실행되는 함수 
    function sendHandle() {
        setWho("sent");
        axios.get("/messages/sent", {

            headers: { Authorization: `Bearer ${actoken}` },
            headers: { Auth: retoken }
        })
            .then(response => {
                console.log("메시지조회성공");
                setMessage(response.data.result.data);
                console.log(response.data.result.data);
            })
            .catch(error => {
                console.log(error.response.data.result);
            })

    }

    //보낸메시지 삭제
    function deletesend() {
        console.log(msgid);
        axios.delete(`/messages/${msgid}/${who}`, {
            headers: { Authorization: `Bearer ${actoken}` },
            headers: { Auth: retoken }
        })
            .then(response => {
                console.log("메시지삭제성공")
                //삭제성공하면 다시 메시지 api불러옴
                receiveHandle();
                setMsgId('');
                window.location.replace("/my-page/chats");
            })
            .catch(error => {
                console.log(error.response.data.result);
            })
    }
   
    const url = "/my-page/chats/message/"
    return (
        <div>
            <div className="message-nav">
                <button className="receivebtn" onClick={receiveHandle}>받은쪽지</button>
                <button style={{ borderLeft: "1px solid black" }} className="sendbtn" onClick={sendHandle}>보낸쪽지</button>
                <div className="message-filter">필터</div>
                <div className="message-dropbox">드롭박스</div>
            </div>
            <div className="message-content">
                <table>
                    <thead>
                        <tr key={`theadtr${msgid}`}>
                            <th key={1}><input type="checkbox"></input></th>
                            <th key={2}>보낸사람</th>
                            <th key={3}>제목</th>
                            <th key={4} className="th3">내용</th>
                            <th key={5}>날짜</th>
                            <th key={6}>읽음상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {message ? message.messageList.map(a=> (
                            <tr key={`tbodytr${a.id}`} onClick={()=>{navigate(url+a.id, {state:a.id})}}>
                                <td ><input  type="checkbox"  value={msgid} onClick={()=>{setMsgId(a.id)}}></input></td>
                                <td >{a.senderNickname}</td>
                                <td> {a.postTitle}</td>
                                <td >{a.content.length>20? a.content.substr(0,19)+"..." : a.content}</td>
                                <td >{a.createdDate}</td>
                                <td >읽지않음</td>
                            </tr>
                        )) : null}
                    </tbody>
                </table>
                <div className="message-button">
                    <button onClick={deletesend} style={{ width: "80px", height: "50px" }}>삭제</button>
                </div>
               
                <div className="message-pagination">

                </div>
            </div>
        </div>
    )
}