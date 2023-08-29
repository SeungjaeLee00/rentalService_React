import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import './ChatForm.css';
import { useAuth } from '../Login/AuthContext';
import axios from 'axios';

function Chat() {

  let navigate = useNavigate();
  const [content, setContent] = useState('');
  const [receiveMember, setReceiveMember] = useState('');
  const { accessToken, isAuthenticated } = useAuth();

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };
  const handleReciveMemberChange = (event) => {
    setReceiveMember(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = {
      content: content,
      receiveMember: receiveMember
    }
  
    try {
      if (!isAuthenticated) {
        navigate('/loginpage');
        return;
      }
  
      const response = await axios.post('http://13.125.98.26:8080/messages', dataToSend, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      console.log('메세지 전송 성공: ', response.data);
  
      if (response.status === 201) {
        console.log('메세지: ', response.data);
      }
    } catch (error) {
      console.error('메세지 전송 실패:', error);
  
      if (error.response && error.response.status === 401) {
        console.error('AccessToken이 만료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/loginpage');
      }
    }
  };

  return (
    <div className="chat-form-container">
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          placeholder="보낼 사람"
          value={receiveMember}
          onChange={handleReciveMemberChange}
        />
        <input
          type="text"
          placeholder="메세지를 입력하세요..."
          value={content}
          onChange={handleContentChange}
        />
        <button type="submit"> 보내기 </button>
      </form>

      <Link className="to-chats" to="/my-page/chats" > 쪽지함 바로가기 </Link>
    </div>
  );
}

export default Chat;
