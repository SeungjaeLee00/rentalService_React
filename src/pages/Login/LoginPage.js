// 모달창 아닌 로그인 페이지
import React, { useState } from 'react';
import {  Button, Form, FormGroup } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import KaKaoLogin from '../../socialLogin/KakaoLogin';
import NaverLogin from '../../socialLogin/NaverLogin';
import GoogleLogin from '../../socialLogin/GoogleLLogIn';
import { loginUser } from '../about_membership/user_action';
import HorizonLine from '../../components/HorizonLine';
import { useAuth } from '../../components/AuthContext';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import '../../style/LoginPage.css';

function LoginPage() {
    const dispatch = useDispatch();
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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

        

        axios.post('http://13.125.98.26:8080/auth/login', userData)
            .then(response => {
                const returnData = response.data;
                const { accessToken, refreshToken } = returnData.result.data;
                login(accessToken, refreshToken);
                if(response.status=='200')
                {
                    dispatch(loginUser(userData, password));
                    window.location.replace("/");
                }
            })
            .catch(error => {
                //회원가입 하지 않은 회원인경우
                if(error.response.data.code=='404')
                {
                    Swal.fire({
                        icon:'error',
                        text:'존재하지 않는 회원입니다.'
                    })  
                    //window.location.replace("/");
                }
                //비밀번호 틀린경우
                if(error.response.data.code=='409')
                {
                    Swal.fire({
                        icon:'error',
                        text:'비밀번호를 확인해주세요'
                    })  
                    //window.location.replace("/");
                }
                console.error(error);
            });
    };

    


    return (
        <div className='Login-wrap'>
            <Form onSubmit={handleLogin}>
                <FormGroup className='FormGroup'>
                    <h1>Billim</h1>
                    <p>서비스 이용을 위해 로그인 해주세요.</p>

                    <br />
                    <input type='Id' className="inputField" placeholder="  아이디" value={username}
                        onChange={onUsernameHandler} style={{ marginBottom: "20px" }} />

                    <br />
                    <input type='password' className="inputField" placeholder="  비밀번호" value={password}
                        onChange={onPasswordHandler} />

                    <div className='loginbtn'>
                        <Button color="dark" type="submit">Login</Button>
                    </div>

                    <div className="small" style={{ marginLeft: "40px" }}>
                        <NavLink style={({ isActive }) => ({ color: isActive ? 'yellow' : 'gray' })} to="/find-id">아이디 찾기</NavLink>{' | '}
                        <NavLink style={({ isActive }) => ({ color: isActive ? 'yellow' : 'gray' })} to="/find-pw">비밀번호 찾기</NavLink>{' | '}
                        <NavLink style={({ isActive }) => ({ color: isActive ? 'yellow' : 'gray' })} to="/signup">회원 가입</NavLink>
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