import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '../NavBar';
import '../../App.css'

function Find_pw() {
  
  const about = "비밀번호를 잃어버리셨나요? \n 뭐든빌리개에 가입한 이메일을 정확히 입력해 주세요. \n 이메일을 통해 비밀번호 변경 링크가 전송됩니다."  

  let navigate = useNavigate();  // hook: page 이동을 도와줌
  const [Email, setEmail] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  }

  return (
      <div className='App'>
        <NavBar />
        <br />
        <h3>비밀번호 찾기</h3>
        <p>{about}</p>
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: '', 
            width: '100%', height: '100vh', paddingTop: '10px'
            }}>
              
          <form style={{ display: 'flex', flexDirection: 'column'}}>

            <br />
            <label style={{ textAlign:"left", fontSize:"15px", color:"#4A4F5A" }}>비밀번호 재설정</label>
            <input type='email' class="inputField" 
                    placeholder="  abcdef@google.com" value={Email} onChange={onEmailHandler}/>
            </form>
            <button style={{color:"black", border: "none",
                            borderRadius:'10px', height: "50px", 
                            marginLeft:"8px" , marginTop:"44px" }}
                    onClick={() => navigate('/resetPW')}>인증 메일 전송하기</button>
        </div>
      </div>
    );
  };

  
  export default Find_pw;