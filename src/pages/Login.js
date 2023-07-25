import React, { useState } from 'react';
import '../modal.css';
import '../App.css';
import { Label, Input, Button, Form, FormGroup } from 'reactstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import KaKaoLogin from '../socialLogin/KakaoLogin';
import NaverLogin from '../socialLogin/NaverLogin';
import GoogleLogin from '../socialLogin/GoogleLLogIn';
import { loginUser } from '../pages/about_membership/user_action';
import HorizonLine from './HorizonLine';


const Login = (props) => {

  let navigate = useNavigate();  // hook: page 이동을 도와줌
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  const dispatch = useDispatch();

  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");

  const onIdHandler = (event) => {
      setId(event.currentTarget.value);
  }
  const onPasswordHandler = (event) => {
      setPassword(event.currentTarget.value);
  }
  const onSubmitHandler = (event) => {
      // 버튼만 누르면 리로드 되는것을 막아줌
      event.preventDefault();

      console.log('Id', Id);
      console.log('Password', Password);
      
      let body = {
          Id: Id,
          password: Password,
      }

      dispatch(loginUser(body));
  }


  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'Login'}>
      {open ? (
        <section>
          <header>
            <button className="close" onClick={close}> X </button>
          </header>

          <main>
          <Form onSubmit={''}>
            <FormGroup>
              <h4>뭐든빌리개</h4>
              <p style={{fontSize:"13px", color:"#4A4F5A"}}>서비스 이용을 위해 로그인 해주세요.</p>
              <br/>
              <input type='Id' class="inputField" placeholder="  아이디" value={Id} 
                onChange={onIdHandler} style={{marginBottom:"20px"}}/>
              <input type='password' class="inputField" placeholder="  비밀번호" value={Password} 
                onChange={onPasswordHandler}/>
              
              <div className='loginbtn'>
                <Button color="dark" onClick = {() => navigate('/itemmain')}>Login</Button>
              </div>
              <div className = "small">
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
          </main>

          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
   
  );
};

export default Login;