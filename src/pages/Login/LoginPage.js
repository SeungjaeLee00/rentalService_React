// 모달창 아닌 로그인 페이지
import React, { useState } from 'react';
import '../../App.css';
import { Label, Input, Button, Form, FormGroup } from 'reactstrap';
import { NavLink, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import axios from 'axios';

import KaKaoLogin from '../../socialLogin/KakaoLogin';
import NaverLogin from '../../socialLogin/NaverLogin';
import GoogleLogin from '../../socialLogin/GoogleLLogIn';
import { loginUser } from '../about_membership/user_action';
import HorizonLine from '../../components/HorizonLine';
import { useAuth } from '../../components/AuthContext';


function LoginPage(props) {
    let navigate = useNavigate();
    const { login } = useAuth();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState('');

    const onUsernameHandler = (event) => {
        setUsername(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const handleLogin = (event) => {
        event.preventDefault();

        const userData = {
            username: username,
            password: password
        };

        axios.post('http://13.125.98.26:8080/auth/login', userData)
            .then(response => {
                setMessage('로그인 성공');
                console.log('로그인 성공:', response.data);

                const returnData = response.data;
                const { accessToken, refreshToken } = returnData.result.data;
                login(accessToken, refreshToken);

                console.log('토큰: ', returnData.result.data);

                if ((response.status = 200)) {
                    return navigate("/itemmain");
                }
            })
            .catch(error => {
                console.error('로그인 실패:', error);
                setMessage('로그인에 실패하였습니다.');
            });
    };


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: '',
            width: '100%', height: '100vh', paddingTop: '10px', marginTop: "20px"
        }}>
            <Form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }} >
                <FormGroup>
                    <h4>뭐든빌리개</h4>
                    <p style={{ fontSize: "13px", color: "#4A4F5A" }}>서비스 이용을 위해 로그인 해주세요.</p>

                    <br />
                    <input type='Id' class="inputField" placeholder="  아이디" value={username}
                        onChange={onUsernameHandler} style={{ marginBottom: "20px" }} />

                    <br />
                    <input type='password' class="inputField" placeholder="  비밀번호" value={password}
                        onChange={onPasswordHandler} />

                    <div className='loginbtn'>
                        <Button color="dark" style={{ marginLeft: "120px" }} type="submit">Login</Button>
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