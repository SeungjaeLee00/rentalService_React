import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NavBar from '../NavBar';
import '../../App.css'

function FindId() {
  
  const about = "등록된 휴대폰 번호를 인증하시면 \n 사용중인 계정의 아이디를 알려드립니다."  

  let navigate = useNavigate();  // hook: page 이동을 도와줌
  const [PhoneNumber, setPhoneNumber] = useState("");

  const onPhoneNumberHandler = (event) => {
    setPhoneNumber(event.currentTarget.value);
  }

  return (
      <div className='App'>
        <NavBar />
        <br />
        <h3>아이디 찾기</h3>
        <p>{about}</p>
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: '', 
            width: '100%', height: '100vh', paddingTop: '10px', float:"left"
            }}>
              
          <form style={{ display: 'flex', flexDirection: 'column'}}>

            <br />
            <label style={{ textAlign:"left", fontSize:"15px", color:"#4A4F5A" }}>핸드폰 번호(숫자만 입력)</label>
            <input type='phonenumber' class="inputField" 
                    placeholder="  010-1234-5678" value={PhoneNumber} onChange={onPhoneNumberHandler}/>
            </form>
            <button style={{color:"black", border: "none",
                            borderRadius:'10px', height: "50px", 
                            marginLeft:"8px" , marginTop:"44px" }}
                    onClick={() => navigate('/foundId')}>인증하기</button>
        </div>
      </div>
    );
  };

  
  export default FindId;

  // if문 넣어서 입력한 아이디를 찾을 수 없으면 찾을 수 없다고 팝업 띄우고 회원가입 같이 띄우기