import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import KaKaoLogin from '../socialLogin/KakaoLogin';
import NaverLogin from '../socialLogin/NaverLogin';
import GoogleLogin from '../socialLogin/GoogleLLogIn';
import NavBar from './NavBar';
import '../App.css';
import { registerUser } from '../pages/about_membership/user_action';
import { useNavigate } from 'react-router-dom';
import HorizonLine from './HorizonLine';
import DaumPostcode from 'react-daum-postcode';

function Signup (props) {

  const dispatch = useDispatch();
  let navigate = useNavigate();  // hook: page 이동을 도와줌


  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Address, setAddress] = useState("");


  const onUsernameHandler = (event) => {
      setUsername(event.currentTarget.value);
  }
  const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value);
  }
  const onConfirmPasswordHandler = (event) => {
      setConfirmPassword(event.currentTarget.value);
  }
  const onPhoneNumberHandler = (event) => {
    setPhoneNumber(event.currentTarget.value);
  }
  const onAddressHandler = (event) => {
    setAddress(event.currentTarget.value);
  }

  const onSubmitHandler = (event) => {
      event.preventDefault();

      if(Password !== ConfirmPassword){
          return alert('비밀번호와 비밀번호 확인이 같지 않습니다.')
      }

      let body = {
          username: Username,
          password: Password,
          confirmPassword: ConfirmPassword,
          phonenumber: PhoneNumber,
          addess: Address
      }

      dispatch(registerUser(body))
      .then(response => {
          if(response.payload.success){
              props.history.push('/itemmain')
          } else {
              alert('Error')
          }
      })
  }

  return (
    <div className='App'>
      <NavBar />
      <h1 style={{marginTop:"60px", marginBottom:"10px"
          }}>회원가입</h1>
          <h4 style={{marginBottom:"30px"}}>뭐든빌리개를 시작해보세요!</h4>

      <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: '', 
            width: '100%', height: '100vh', paddingTop: '10px', 
            }}>
            
            <form style={{ display: 'flex', flexDirection: 'column'}}
                onSubmit={onSubmitHandler}
            >
                <label style={{ textAlign:"left" }}>이름</label> 
                <input type='username' class="inputField" 
                        placeholder="  ex) jaejae" value={Username} onChange={onUsernameHandler} />
                <br />
                <label style={{ textAlign:"left" }}>비밀번호</label>
                <input type='password' class="inputField" 
                        placeholder="  영문, 숫자, 특수문자 포함 8자 이상" value={Password} onChange={onPasswordHandler}/>
                <br />
                <label style={{ textAlign:"left" }}>비밀번호 확인</label>
                <input type='password' class="inputField" 
                        placeholder="" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
                <br />
                <label style={{ textAlign:"left" }}>핸드폰 번호</label>
                <input type='phonenumber' class="inputField" 
                        placeholder="  010-1234-5678" value={PhoneNumber} onChange={onPhoneNumberHandler}/>
                <br />
                <label style={{ textAlign:"left" }}>주소</label>
                <input type='address' class="inputField" 
                        placeholder="" value={Address} onChange={onAddressHandler}/>
                <br />
                <button formAction='' style={{padding:"10px", marginTop:"8px", 
                        backgroundColor:"#4A4F5A", color:"white", borderRadius:'10px'}} 
                        onClick = {() => navigate('/itemmain')} >가입하기</button>
                <HorizonLine />
                <NaverLogin/>
                <KaKaoLogin/>
                <GoogleLogin />
            </form>
        </div>
  </div>
  );
};
  
  export default Signup;