import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";
import '../../style/ItemChat.css';
import { useAuth } from '../../components/AuthContext';
import axios from 'axios';
import { TextField } from '@material-ui/core';

// 디테일페이지에서 쪽지보내기 눌렀을때 보이는 컴포넌트
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
      receiveMember: receiveMember,
      postId :location.state.id
    }

    try {
      if (!isAuthenticated) {
        navigate('/loginpage');
        return;
      }
      if (isAuthenticated) {
        axios.post('/api/messages', dataToSend, {
          headers: { 'Authorization' : `Bearer ${actoken}`,
          'Auth' : retoken }
        })
        .then(response=>{
          console.log('메세지 전송 성공: ', response);
          alert('메시지가 전송되었습니다');
          navigate(-1);
        })
        .catch(error=>{
          if (error.response.data.code == '511') {
            alert('로그인이 만료되어 로그인 페이지로 이동합니다');
            window.location.replace('/loginpage');
          }
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
        <TextField
        label="쪽지내용"
        multiline
        rows={15}
        onChange={handleContentChange}
        style={{width:"500px"}}> 
        </TextField>
        <button type="submit" style={{marginTop:"30px", width:"80px", borderRadius:"10px",
                                     backgroundColor:"white"}}> 보내기 </button>
      </form>
    </div>
  );
}

export default Chat;