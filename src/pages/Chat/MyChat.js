import { useEffect, useState } from "react"
import "../../style/MyChat.css"
import axios from "axios"


export default function MyChat() {
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;

    const [message, setMessage] = useState();

    useEffect(() => {
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
    }, [])

    function receiveHandle() {
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

    function sendHandle(){
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

    // function deletesend()
    // {
    //     axios.delete("/messages/6/")
    // }

    return (
        <div className="message-wrap">
            <div className="message-title">
                <h2 style={{fontWeight:"bold"}}>쪽지함</h2>
            </div>
            <div className="message-nav">
                <button className="receivebtn" onClick={receiveHandle}>받은쪽지</button>
                <button style={{borderLeft:"1px solid black"}} className="sendbtn" onClick={sendHandle}>보낸쪽지</button>
                <div className="message-filter">필터</div>
                <div className="message-dropbox">드롭박스</div>
            </div>
            <div className="message-content">
                <table>
                    <thead>
                        <tr key={1}>
                            <th key={1}><input type="checkbox" ></input></th>
                            <th key={2}>보낸사람</th>
                            <th key={3} className="th3">제목</th>
                            <th key={4}>날짜</th>
                            <th key={5}>읽음상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {message ? message.messageList.map(a=> (
                            <tr >
                                <td ><input type="checkbox"></input></td>
                                <td >{a.senderNickname}</td>
                                <td >{a.content}</td>
                                <td >2023-09-12 20:56</td>
                                <td >읽지않음</td>
                            </tr>
                        )) : null}
                    </tbody>
                </table>
                <div className="message-button">
                    <button style={{width:"80px", height:"50px"}}>삭제</button>
                </div>
                <div className="message-pagination">

                </div>
            </div>
        </div>
    )
}