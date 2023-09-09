import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {Link} from 'react-router-dom'
import axios from 'axios';


function Find_pw() {

  let navigate = useNavigate();  // hook: page 이동을 도와줌
  
  const about = "비밀번호를 잃어버리셨나요? \n 뭐든빌리개에 가입한 이메일을 정확히 입력해 주세요. \n 이메일을 통해 비밀번호 변경 링크가 전송됩니다."  

  const [username, setUserName] = useState("");
  const [message, setMessage] = useState('');

  const onUsernameHandler = (event) => {
    setUserName(event.currentTarget.value);
  }

  const handleSendEmail = (event) => {
    event.preventDefault();

    axios.post('http://13.125.98.26:8080/email/password-reset?email=' + username)
      .then(response => {
        setMessage('비밀번호 재설정 이메일이 전송되었습니다.');
        if ((response.status = 200)) {
          return navigate("/reset-pw");
          }
      })
      .catch(error => {
        console.error('비밀번호 재설정 실패:', error);
        setMessage('비밀번호 재설정 이메일 전송에 실패하였습니다.');
      });
  };
  
  return (
      <div className='App'>
        <br />
        <h3>비밀번호 찾기</h3>
        <p>{about}</p>
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: '', 
            width: '100%', height: '100vh', paddingTop: '10px'
            }}>
              
          <form style={{ display: 'flex', flexDirection: 'column'}} onSubmit={handleSendEmail}> 

            <br />
            <label style={{ textAlign:"left", fontSize:"15px", color:"#4A4F5A" }}>비밀번호 재설정</label>
            <input type='username' class="inputField" 
                    placeholder="  abcdef@google.com" value={username} onChange={onUsernameHandler}/>

            <button style={{color:"black", border: "none",
                            borderRadius:'10px', height: "50px", 
                            marginLeft:"8px" , marginTop:"44px" }}
                  type="submit" >인증 메일 전송하기</button>
            </form>
            

        </div>
      </div>
    );
  };

export default Find_pw;

