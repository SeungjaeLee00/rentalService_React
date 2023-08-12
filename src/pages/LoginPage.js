// 모달창 아닌 로그인 페이지

import React, { useState } from 'react';
import '../App.css';
import { Label, Input, Button, Form, FormGroup } from 'reactstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import KaKaoLogin from '../socialLogin/KakaoLogin';
import NaverLogin from '../socialLogin/NaverLogin';
import GoogleLogin from '../socialLogin/GoogleLLogIn';
import { loginUser } from './about_membership/user_action';
import HorizonLine from './HorizonLine';


function LoginPage (props) {

  let navigate = useNavigate();  // hook: page 이동을 도와줌

  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");

  const onIdHandler = (event) => {
      setId(event.currentTarget.value);
  }
  const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: '', 
                    width: '100%', height: '100vh', paddingTop: '10px', marginTop: "20px"}}>
        <Form onSubmit={''} style={{ display: 'flex', flexDirection: 'column'}} >
            <FormGroup>
                <h4>뭐든빌리개</h4>
                <p style={{fontSize:"13px", color:"#4A4F5A"}}>서비스 이용을 위해 로그인 해주세요.</p>
                
                <br/>
                <input type='Id' class="inputField" placeholder="  아이디" value={Id} 
                    onChange={onIdHandler} style={{marginBottom:"20px"}}/>
                
                <br />
                <input type='password' class="inputField" placeholder="  비밀번호" value={Password} 
                    onChange={onPasswordHandler}/>
                
                <div className='loginbtn'>
                    <Button color="dark" style={{marginLeft:"120px"}} onClick = {() => navigate('/itemmain')}>Login</Button>
                </div>
                
                <div className = "small" style={{marginLeft:"40px"}}>
                    <NavLink style={({ isActive }) => ({ color: isActive ? 'yellow' : 'gray' })} to="/find-id">아이디 찾기</NavLink>{' | '}
                    <NavLink style={({ isActive }) => ({ color: isActive ? 'yellow' : 'gray' })} to="/find-pw">비밀번호 찾기</NavLink>{' | '}
                    <NavLink style={({ isActive }) => ({ color: isActive ? 'yellow' : 'gray' })} to="/signup">회원 가입</NavLink>
                </div>
                
                <HorizonLine />
                
                <div className='social_login' style={{flexDirection: 'column'}}>
                    <NaverLogin />
                    <KaKaoLogin />
                    <GoogleLogin />
                
                </div> 
            </FormGroup>
          </Form>
    </div>
   
  );
};

export default LoginPage;