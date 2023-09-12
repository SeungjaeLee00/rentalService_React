import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";
import './ChatForm.css';
import { useAuth } from '../../components/AuthContext';
import axios from 'axios';

function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const actoken = localStorage.accessToken;
  const retoken = localStorage.refreshToken;
  const { isAuthenticated } = useAuth();

  const [receiveMember, setReceiveMember] = useState(location.state.writer.nickname);
  const [content, setContent] = useState("");

  
  
  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  
  //보내기 버튼 클릭하면 실행 
  const handleSubmit =  (event) => {
    event.preventDefault();
    //dataToSend에 보낼양식담고.
    const dataToSend = {
      content: content,
      receiveMember: receiveMember
    }

    try {
      if (!isAuthenticated) {
        navigate('/loginpage');
        return;
      }
      if (isAuthenticated) {
        axios.post('http://13.125.98.26:8080/messages', dataToSend, {
          headers: {
            Authorization: `Bearer ${actoken}`,
            Auth: retoken
          },
        })
        .then(response=>{
          console.log('메세지 전송 성공: ', response.data);
          alert('메시지가 전송되었습니다');
        })
        .catch(error=>{
          console.error('메세지 전송 실패:', error.response.data.result);
        })
      }
    } catch (error) {
      console.error('메세지 전송 실패:', error.response.data.result);
      }
  };

  return (
    <div className="chat-form-container">
      <div style={{fontSize:"20px",marginTop:"20px", fontWeight:"bold"}}>게시글제목 : {location.state.title}</div>
      <div style={{fontSize:"15px", marginTop:"15px"}}>{location.state.writer.nickname}님에게 쪽지</div>
      <form onSubmit={handleSubmit} className="chat-form" style={{marginTop:"50px"}}>
        <input
          type="text"
          placeholder="메세지를 입력하세요..."
          value={content}
          onChange={handleContentChange}
        />
        <button type="submit"> 보내기 </button>
      </form>

      <Link className="to-chats" to="/my-page/chats">쪽지함 바로가기</Link>
    </div>
  );
}

export default Chat;