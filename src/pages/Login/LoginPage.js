// 모달창 아닌 로그인 페이지
import React, { useState } from 'react';
import {  Button, Form, FormGroup } from 'reactstrap';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import KaKaoLogin from '../../socialLogin/KakaoLogin';
import NaverLogin from '../../socialLogin/NaverLogin';
import GoogleLogin from '../../socialLogin/GoogleLLogIn';
import HorizonLine from '../../components/HorizonLine';
import { useAuth } from '../../components/AuthContext';
import { useEffect } from 'react';
import '../../style/LoginPage.css';
import { useRef } from 'react';

function LoginPage() {
    const location = useLocation();
    console.log(location);
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const InputId= useRef(null);

    const onUsernameHandler = (event) => {
        setUsername(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    useEffect(()=>{
        //이전 토큰제거
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    },[])

    const handleLogin = (event) => {
        event.preventDefault();

        const userData = {
            username: username,
            password: password
        };

        

        axios.post('/api/auth/login', userData)
            .then(response => {
                console.log(response);
                const returnData = response.data;
                const { accessToken, refreshToken } = returnData;
                login(accessToken, refreshToken);
                if(response.status=='200')
                {
                    window.location.replace("/");
                }
            })
            .catch(error => {
                console.log(error);
                //회원가입 하지 않은 회원인경우
                if(error.response.data.code=='404')
                {
                    alert('존재하지 않는 회원입니다.')
                }
                //비밀번호 틀린경우
                if(error.response.data.code=='409')
                {
                    alert('비밀번호를 확인해주세요.')
                }
            });
    };
    useEffect(()=>{
        InputId.current.focus();
    },[])
    


    return (
        <div className='Login-wrap'>
            <Form onSubmit={handleLogin}>
                <FormGroup className='login-FormGroup'>
                    <h1>Billim</h1>
                    <p>서비스 이용을 위해 로그인 해주세요.</p>

                    <br />
                    <input type='Id' className="inputField" placeholder="아이디" value={username}
                        onChange={onUsernameHandler} style={{ marginBottom: "20px" }} ref={InputId} />

                    <br />
                    <input type='password' className="inputField" placeholder="비밀번호" value={password}
                        onChange={onPasswordHandler} />

                    <div className='loginbtn'>
                        <Button color="dark" type="submit">로그인</Button>
                    </div>

                    <div className="small" >
                        <NavLink  className="find-pw" to="/find-pw">비밀번호 찾기</NavLink>{' | '}
                        <NavLink  className="signup" to="/signup">회원 가입</NavLink>
                    </div>

                    <HorizonLine />
                    <div className='social_login' style={{ flexDirection: 'column' }}>
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