import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from 'axios';
import { TextField } from '@material-ui/core';
import { useRef } from 'react';
import styled from 'styled-components';
import { useEffect } from 'react';


// 디테일페이지에서 쪽지보내기 눌렀을때 보이는 컴포넌트
function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const actoken = localStorage.accessToken;
  const retoken = localStorage.refreshToken;


  const [receiveMember, setReceiveMember] = useState(location.state.writer.nickname);
  const text = useRef(null);
  //보내기 버튼 클릭하면 실행 
  const handleSubmit = (event) => {
    event.preventDefault();
    
    //dataToSend에 보낼양식담고.
    const dataToSend = {
      content: text.current.value,
      receiveMember: receiveMember,
      postId: location.state.id
    }
    
    axios.post('/api/messages', dataToSend, {
      headers: {
        'Authorization': `Bearer ${actoken}`,
        'Auth': retoken
      }
    })
      .then(response => {
        alert('메시지가 전송되었습니다');
        navigate(-1);
      })
      .catch(error => {
        //로그인을 안 했으면 
        if(actoken==null) alert('로그인이 필요한 요청입니다.'); 
        if (error.response.data.code == '511') {
          alert('로그인이 만료되어 로그인 페이지로 이동합니다');
          window.location.replace('/loginpage');
        }
        console.log('메세지 전송 실패:', error)
      })

  };
  useEffect(()=>{
    text.current.focus();
  },[])

  return (
    <Div>
      <Title>게시글제목 : {location.state.title}</Title>
      <Who><P style={{color:"blue"}}>{location.state.writer.nickname}</P>님에게 쪽지</Who>
      <Form onSubmit={handleSubmit} >
        <TextField
          label="쪽지내용(최대255글자)"
          name="content"
          inputRef={text}
          inputProps={{maxLength:255}}
          multiline
          rows={10}
          style={{ width: "500px" }}>
        </TextField>
        <Button type="submit">전송</Button>
      </Form>
    </Div>
  );
}

export default Chat;

let Div = styled.div`
display:flex;
flex-direction:column;
justify-content: center;
align-items: center;
`

let Title = styled.h3`
font-weight:bold;
margin-top:20px;
` 
let Who = styled.div`
display:flex;
font-weight:bold;
margin-top:10px;
`
let P = styled.p`
font-color:blue;
font-size:20px;
`

let Form = styled.form`
display:flex;
flex-direction: column;
align-items: center;
margin-top:50px;
`

let Button = styled.button`
border-radius: 10px;
background-color: black;
color:white;
margin-top:10px;
width:100px;
height:40px;
transition: all 0.3s;
  &:hover{
      background-color: rgb(66, 66, 253);
    }
`