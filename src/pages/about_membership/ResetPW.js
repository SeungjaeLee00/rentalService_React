import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

import React, { useState } from 'react';
import axios from 'axios';

import '../../App.css'

function Find_pw() {

  let navigate = useNavigate();  // hook: page 이동을 도와줌
  
  const about = "비밀번호 재설정을 완료해주세요:D"

  const [username, setUserName] = useState("");
  const [authKey, setauthKey] = useState("");
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState("");
  const [message, setMessage] = useState('');

  const onUsernameHandler = (event) => {
    setUserName(event.currentTarget.value);
  }
  const onAuthKeyHandler = (event) => {
    setauthKey(event.currentTarget.value);
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  }
  const onVerifyPasswordHandler = (event) => {
    setVerifyPassword(event.currentTarget.value);
  }

  const handlePasswordReset = (event) => {
    event.preventDefault();

    const userData = {
      username: username,
      password: password,
      verifyPassword: verifyPassword,
      authKey: authKey,
    };

    if(password !== verifyPassword){
        return alert('비밀번호와 비밀번호 확인이 같지 않습니다.')
    }

    axios.post('http://13.125.98.26:8080/password-reset', userData)
      .then(response => {
        setMessage('비밀번호가 성공적으로 재설정되었습니다.');
        if ((response.status = 200)) {
            return navigate("/loginpage");
            }
      })
      .catch(error => {
        console.error('비밀번호 재설정 실패:', error);
        setMessage('비밀번호 재설정에 실패하였습니다.');
      });
  };
  
  return (
      <div className='App'>
        <br />
        <h3>비밀번호 재설정</h3>
        <p>{about}</p>
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: '', 
            width: '100%', height: '100vh', paddingTop: '10px'
            }}>
              
          <form style={{ display: 'flex', flexDirection: 'column'}} onSubmit={handlePasswordReset}> 

            <br />
            <label style={{ textAlign:"left", fontSize:"15px", color:"#4A4F5A" }}>아이디</label>
            <input type='username' class="inputField" 
                    placeholder="  abcdef@google.com" value={username} onChange={onUsernameHandler}/>

            <label style={{ textAlign:"left", fontSize:"15px", color:"#4A4F5A" }}>비밀번호</label>
            <input type='password' class="inputField" 
                    placeholder="  재설정 비밀번호" value={password} onChange={onPasswordHandler}/>

            <label style={{ textAlign:"left", fontSize:"15px", color:"#4A4F5A" }}>비밀번호 확인</label>
            <input type='password' class="inputField" 
                    placeholder="  비밀번호 확인" value={verifyPassword} onChange={onVerifyPasswordHandler}/>

            <label style={{ textAlign:"left", fontSize:"15px", color:"#4A4F5A" }}>인증코드</label>
            <input type='authKey' class="inputField" 
                    placeholder="  인증코드를 입력하세요" value={authKey} onChange={onAuthKeyHandler}/>

            <button style={{color:"black", border: "none",
                            borderRadius:'10px', height: "50px", 
                            marginLeft:"8px" , marginTop:"44px" }}
                  type="submit" >변경하기</button>
            </form>
            

        </div>
      </div>
    );
  };

export default Find_pw;

