import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function ReplyModal(props) {
    const navigate = useNavigate();
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;

    const [replymsg, setReplyMsg] = useState();

    function closeModal() {
        props.closeModal();
    }
    function reply() {

        const dataToSend = {
            content: replymsg,
            receiveMember: props.senderNickname,
            postId: props.msgid
        }
        console.log(replymsg);
        console.log(props.senderNickname);
        console.log(props.msgid);

        axios.post('http://13.125.98.26:8080/messages', dataToSend, {
          headers: {
            headers: { 'Authorization' : `Bearer ${actoken}`,
                'Auth' : retoken }
          },
        })
        .then(response=>{
          console.log('메세지 전송 성공: ', response.data);
          alert('메시지가 전송되었습니다');
          navigate(-1)
        })
        .catch(error=>{
          console.error('메세지 전송 실패:', error.response.data.result);
        })


    }
    return (
        <div className="Modal" onClick={closeModal}>
            <div className="modalBody" onClick={(e) => e.stopPropagation()}>
                <button id="modalCloseBtn" onClick={closeModal}>
                    X
                </button>
                <div style={{ marginTop: "12px" }}>수신 : {props.senderNickname}</div>
                <TextField
                    label="내용"
                    multiline rows={13}
                    onChange={(e) => { setReplyMsg(e.target.value) }}
                    style={{ width: "430px", marginTop: "10px" }}></TextField>
                <button onClick={reply} style={{ marginTop: "15px" }}>전송</button>
            </div>
        </div>
    )
}