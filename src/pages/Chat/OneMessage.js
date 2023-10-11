import axios from "axios";
import { useState } from "react";
import { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../../style/OneMessage.css';
import ReplyModal from "./ReplyModal";
import SetKST from "../../utils/SetKST";
import "react-datepicker/dist/react-datepicker.css"
import TradeModal from "./TradeModal";
import styled from "styled-components";
export default function OneMessage() {

    const navigate = useNavigate();
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;


    //state에 MessageList의 copy가 담김.(copy에는 쪽지id, 받은쪽지인지 보낸쪽지인지 나타내는 값 총2개)
    let { state } = useLocation();
    // console.log(state.copy);

    //단건메시지조회한 데이터
    const [msg, setMsg] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const fetchonemsg = async () => {
        try {
            setMsg(null);
            setError(null);

            setLoading(true);
            const response = await axios.get(`/api/messages/${state.copy[0]}`, {
                headers: {
                    'Authorization': `Bearer ${actoken}`,
                    'Auth': retoken
                }
            })
            console.log(response);
            setLoading(false);
            setMsg(response.data)
        } catch (error) {
            console.log(error);
            setError(error);
            if (error.response.data.code == '511') {
                alert('로그인이 만료되어 로그인 페이지로 이동합니다');
                window.location.replace('/loginpage');
            }

        }
    }

    useEffect(() => {
       fetchonemsg();
    }, [])


    //쪽지 삭제 함수 
    function deletesend() {
        let deletecheck = window.confirm("정말 삭제하시겠습니까?");
        console.log(state.copy[1]);
        if (deletecheck) {
            axios.delete(`/api/messages/${msg.id}/${state.copy[1]}`, {
                headers: { Authorization: `Bearer ${actoken}` },
                headers: { Auth: retoken }
            })
                .then(response => {
                    console.log("메시지삭제성공")
                    navigate(-1)
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
    const [modalopen, setModalOpen] = useState(false);
    const [trademodalopen, setTradeModalOpen] = useState(false);
    
    if(loading) <div>로딩중...</div>
    if(error) <div>에러발생...</div>
    if (!msg) return null;

    return (
        <div>
            {msg ? <>
                <div className="one-wrap">
                    <div className="one-top">
                        <div className="top-title">
                            <Title className="title">쪽지함</Title>
                            <div className="top-button">
                                <button className="trade-button" onClick={() => { setTradeModalOpen(!trademodalopen) }}>거래하기</button>
                                </div>
                            {trademodalopen && <TradeModal postId={msg.postId} borrowerName={msg.senderNickname}
                                closeModal={() => setTradeModalOpen(!trademodalopen)} />}
                        </div>
                        <div className="top-info">
                            <div className="info-left">
                                <div className="left-top">
                                    <PostTitle >게시글제목 : {msg.postTitle}</PostTitle>
                                    <SendTime>보낸날짜: {SetKST(msg.createdDate)}</SendTime>
                                </div>
                                <Sender className="left-bottom">발신자 : {msg.senderNickname}</Sender>
                            </div>
                            <div className="info-right">
                                <button onClick={() => { setModalOpen(!modalopen) }} >답장</button>
                                {/* 모달창 컴포넌트 호출 (https://joylee-developer.tistory.com/184)*/}
                                {modalopen && <ReplyModal msgid={msg.postId} senderNickname={msg.senderNickname} closeModal={() => setModalOpen(!modalopen)} />}
                                <button onClick={deletesend} style={{ marginLeft: "10px" }}>삭제</button>
                            </div>
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
let Title = styled.div`
margin-left:30px;
font-size:30px;
`

let PostTitle = styled.div`
font-size:20px;
margin-left:30px;
font-weight:bold;
`

let SendTime = styled.div`
margin-left:300px;
font-weight:bold;
`

let Sender = styled.div`
margin-top:30px;
margin-left:30px;
font-weight:bold;
`