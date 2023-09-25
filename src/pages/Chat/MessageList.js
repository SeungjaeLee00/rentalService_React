import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import SetKST from "../../utils/SetKST";

export default function MessageList(props) {
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;

    const [message, setMessage] = useState();
    const [msgid, setMsgId] = useState();

    const navigate = useNavigate();
    const [who, setWho] = useState("received");
    const [isActive1, setIsActive1] = useState(true);
    const [isActive2, setIsActive2] = useState(false);

    useEffect(() => {
        console.log(props.mypost);
        axios.get("/messages/received", {

            headers: { 'Authorization' : `Bearer ${actoken}`,
            'Auth' : retoken }
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
        setIsActive1(true);
        setIsActive2(false);
        axios.get("/messages/received", {

            headers: { 'Authorization' : `Bearer ${actoken}`,
                'Auth' : retoken }
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
        setIsActive1(false);
        setIsActive2(true);
        axios.get("/messages/sent", {

            headers: { 'Authorization' : `Bearer ${actoken}`,
                'Auth' : retoken }
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

    //읽은쪽지 삭제함수
    function readMsgDelete() {
        message.messageList.map(a => {
            if (a.checked) {
                axios.delete(`/messages/${a.id}/${who}`, {
                    headers: { 'Authorization' : `Bearer ${actoken}`,
                'Auth' : retoken }
                })
                    .then(response => {
                        console.log("메시지삭제성공");
                        receiveHandle();
                    })
                    .catch(error => {
                        console.log(error.response.data.result);
                    })
            }
        })
    }
    

    return (
        <div>
            <div className="message-nav">
                <button className={isActive1 ? "receivebtn" : "inactiveBtn"}
                    onClick={receiveHandle}>받은쪽지</button>
                <button className={isActive2 ? null : "inactiveBtn"}
                    onClick={sendHandle}>보낸쪽지</button>


            </div>
            <div className="message-mid">
                <button onClick={readMsgDelete}>읽은 쪽지 삭제하기</button>
                <div className="message-filter">필터</div>
                <div className="message-dropbox">드롭박스</div>
            </div>
            <div className="message-content">
                <table>
                    <thead>
                        <tr key={`theadtr${msgid}`}>

                            <th key={2}>보낸사람</th>
                            <th key={3}>게시물제목</th>
                            <th key={4} className="th3">내용</th>
                            <th key={5}>날짜</th>
                            <th key={6}>읽음상태</th>
                        </tr>
                    </thead>
                    <tbody>

                        {message ? message.messageList.map(a => (
                            <tr key={`tbodytr${a.id}`} onClick={() => {
                                //copy에 쪽지id랑 받은쪽지인지 보낸쪽지인지 나타내는 who가 담김.
                                let copy = [a.id, who];
                                console.log(copy);
                                //navigate로 이동할때 state로 전달 

                                navigate('/my-page/chats/message/' + a.id, { state: { copy } });
                            }}>
                                <td >{a.senderNickname}</td>
                                <td> {a.postTitle}</td>
                                <td >{a.content.length > 20 ? a.content.substr(0, 15) + "..." : a.content}</td>
                                <td >{SetKST(a.createdDate)}</td>
                                <td >{a.checked ? <div>읽음</div> : <div>읽지않음</div>}</td>
                            </tr>
                        )) : null}
                    </tbody>
                </table>


                <div style={{ marginTop: "20px" }} className="message-bottom">

                </div>
            </div>
        </div>
    )
}