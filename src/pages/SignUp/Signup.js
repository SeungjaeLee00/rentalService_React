import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import KaKaoLogin from '../../socialLogin/KakaoLogin';
import NaverLogin from '../../socialLogin/NaverLogin';
import GoogleLogin from '../../socialLogin/GoogleLLogIn';
import { registerUser } from '../about_membership/user_action';
import { useNavigate } from 'react-router-dom';
import HorizonLine from '../../components/HorizonLine';
import axios from 'axios';

function Signup () {
    
    let navigate = useNavigate();  // hook: page 이동을 도와줌
    
    const [username, setUserName] = useState("");
    const [authKey, setauthKey] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [street, setStreet] = useState('');
    const [zipCode, setZipCode] = useState('');
    
    const onUserNameHandler = (event) => {
        setUserName(event.currentTarget.value);
    }
    const onKeyHandler = (event) => {
        setauthKey(event.currentTarget.value);
    }
    const onNicknameHandler = (event) => {
        setNickname(event.currentTarget.value);
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

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };
    
    const handleDistrictChange = (event) => {
        setDistrict(event.target.value);
    };
    
    const handleStreetChange = (event) => {
        setStreet(event.target.value);
    };
    
    const handleZipCodeChange = (event) => {
        setZipCode(event.target.value);
    };

    const handleSendUserName = () => {
        axios.post('http://13.125.98.26:8080/email/sign-up?email=' + username )
          .then(response => {
            console.log('이메일 전송 성공:', response.data);
          })
          .catch(error => {
            console.error('이메일 전송 실패:', error);
          });
      };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const address = {
            city: city,
            district: district,
            street: street,
            zipCode: zipCode
          };

        const dataToSend = {
            username: username,
            authKey: authKey,
            nickname: nickname,
            password: password,
            phoneNumber: phoneNumber,
            address: address
        }
        if(password !== confirmPassword){
            return alert('비밀번호와 비밀번호 확인이 같지 않습니다.')
        }

        axios.post('http://13.125.98.26:8080/auth/sign-up', dataToSend)
        .then(response => {
          console.log('회원가입 성공:', response.data);
          if ((response.status = 200)) {
            return navigate("/");
            }
        })
        .catch(error => {
          console.error('회원가입 실패:', error);
        });
    };
    
    return (
        <div className='App'>
        <h2 style={{marginTop:"30px", marginBottom:"10px"
            }}>회원가입</h2>
            <h5 style={{marginBottom:"20px"}}>뭐든빌리개를 시작해보세요!</h5>

        <div style={{ 
                display: 'flex', justifyContent: 'center', alignItems: '', 
                width: '100%', height: '100vh', paddingTop: '10px', borderWidth: 1
                }}>
                
                <form style={{ display: 'flex', flexDirection: 'column', }} 
                        onSubmit={onSubmitHandler} >
        
                        <label style={{ textAlign:"left" }}>이메일</label> 
                        <input type='username' class="inputField" 
                                placeholder="  abcdef@google.com" value={username} onChange={onUserNameHandler} />
                        <button  style={{color:"black", border: "none",
                                            borderRadius:'10px', marginTop:"10px" }}
                                            onClick={handleSendUserName}> 인증하기 </button>      
                        <br />

                        <label style={{ textAlign:"left" }}>이메일 인증키</label>
                        <input type="authKey" class="inputField"
                            placeholder="  인증번호를 입력하세요" value={authKey} onChange={onKeyHandler} />
                        <br />

                        <label style={{ textAlign:"left" }}>이름</label> 
                        <input type='nickname' class="inputField" 
                                placeholder="  ex) jaejae" value={nickname} onChange={onNicknameHandler} />
                        <br />

                        <label style={{ textAlign:"left" }}>비밀번호</label>
                        <input type='password' class="inputField" 
                                placeholder="  영문, 숫자, 특수문자 포함 8자 이상" value={password} onChange={onPasswordHandler}/>
                        <br />

                        <label style={{ textAlign:"left" }}>비밀번호 확인</label>
                        <input type='password' class="inputField" 
                                placeholder="" value={confirmPassword} onChange={onConfirmPasswordHandler}/>
                        <br />

                        <label style={{ textAlign:"left" }}>핸드폰 번호(숫자만 입력)</label>
                        <input type='text' class="inputField" 
                                placeholder="  010-1234-5678" value={phoneNumber} onChange={onPhoneNumberHandler}/>
                        <br />
                        
                        <label style={{ textAlign:"left" }}>주소</label>
                        <input type='text' class="inputField" 
                                placeholder=" 도시" value={city} onChange={handleCityChange}/>
                        <input type='text' class="inputField" 
                                placeholder="  지역(구)" value={district} onChange={handleDistrictChange}/>
                        <input type='text' class="inputField" 
                                placeholder="  번지(동)" value={street} onChange={handleStreetChange}/>
                        <input type='text' class="inputField" 
                                placeholder="  우편번호" value={zipCode} onChange={handleZipCodeChange}/>
                        <br />
                        
                        <button type="submit" style={{padding:"10px", marginTop:"8px", 
                                backgroundColor:"#4A4F5A", color:"white", borderRadius:'10px', border:"none"}} >가입하기</button>
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