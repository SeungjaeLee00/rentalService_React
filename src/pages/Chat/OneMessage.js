import axios from "axios";
import { useState } from "react";
import { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../../style/OneMessage.css';
import ReplyModal from "./ReplyModal";

export default function OneMessage() {

    const navigate = useNavigate();
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
    

    //state에 MessageList의 copy가 담김.(copy에는 쪽지id, 받은쪽지인지 보낸쪽지인지 나타내는 값 총2개)
    let { state } = useLocation();
    console.log(state.copy);

    //단건메시지조회한 데이터
    const [msg, setMsg] = useState();
    
    useEffect(() => {
        axios.get(`/messages/${state.copy[0]}/message`, {
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


    //쪽지 삭제 함수 
    function deletesend() {      
            let deletecheck = window.confirm("정말 삭제하시겠습니까?");
            console.log(state.copy[1]);
            if (deletecheck) {
                axios.delete(`/messages/${msg.id}/${state.copy[1]}`, {
                    headers: { Authorization: `Bearer ${actoken}` },
                    headers: { Auth: retoken }
                })
                    .then(response => {
                        console.log("메시지삭제성공")
                        navigate(-1)
                    })
                    .catch(error => {
                        console.log(error.response.data.result);
                    })
            }
    }
    const [modalopen,setModalOpen]= useState(false);

    
    
   
    //쪽지 답장 함수
    function reply()
    {

    }

    return (
        <div>
            {msg ? <>
                <div className="one-wrap">
                    <div className="one-top">
                        <div className="top-title"><h1 style={{ marginLeft: "30px" }}>쪽지함</h1></div>
                        <div className="top-info">
                            <div className="info-left">
                                <div className="left-top">
                                    <div style={{ fontSize: "18px", marginLeft: "30px" }}>게시글제목:{msg.postTitle}</div>
                                    <div style={{ marginLeft: "300px", marginLeft: "200px" }}>보낸날짜: {msg.createdDate}</div>
                                </div>
                                <div style={{ marginTop: "30px", marginLeft: "30px" }} className="left-bottom">발신자 : {msg.senderNickname}</div>
                            </div>
                            <div className="info-right">
                                <button onClick={()=>{setModalOpen(!modalopen)}} >답장</button>
                                  {/* 모달창 컴포넌트 호출 (https://joylee-developer.tistory.com/184)*/}
                                 {modalopen&&<ReplyModal msgid={msg.postId} senderNickname={msg.senderNickname} closeModal={()=>setModalOpen(!modalopen)}/>}                                
                                <button onClick={deletesend} style={{ marginLeft: "20px" }}>삭제</button>
                            </div>
                        </div>
                    </div>
                    <div className="modal">
                        <div className="modal_body">
                            <h2>모달창제목</h2>
                            <p>모달창 내용</p>
                        </div>
                    </div>
                    <div className="one-bottom">
                        <div className="msg-content">{msg.content}</div>
                        <div className="msg-bottom">
                            {/* <Link to="/my-page/chats">목록으로</Link> */}
                            {/* Link태그썼는데 안되서 navigate(-1) 즉 뒤로가기 이용 */}
                            <button onClick={() => { navigate(-1) }}>목록</button>
                        </div>
                    </div>
                </div> </> : null}
        </div>
    )
}