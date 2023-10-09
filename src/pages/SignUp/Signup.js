import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../../style/signup.css'
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import Address from '../../components/Address';
import { useEffect } from 'react';


function Signup() {
    //email -> useRef로 설정. useState로 하면 불필요한 리렌더링 발생 , 
    //실사간 유효성 검사 x -> 인증하기 버튼을 클릭하기 때문.
    const email = useRef();
    const [emailcheck, setEmailCheck] = useState(false);
    const [zipcode, setZipCode] = useState();
    const [originaddress, setOriginAddress] = useState();
    const [address, setAddress] = useState();

    const [password, setPassword] = useState();
    const [repassword, setRePassword] = useState();
    const [addressisopen, setAddressIsOpen] = useState(false);

    const onSubmit = (data) => {
        //이메일 따로추가. ref와 register 같이 사용 x 
        data.username = email.current.value;
        //address 따로추가. 지도 라이브러리사용.
        let address = {
            city: originaddress[1],
            district: originaddress[2],
            street: originaddress[3],
            zipCode: originaddress[4]
        }
        data.address = address;
    
        if (password != repassword) {
            alert('비밀번호를 확인해주세요');
        }
      
        axios.post('/auth/sign-up', data)
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            })
    }

    const { register, handleSubmit, formState: { errors }, } = useForm();

    const SendEmail = () => {

        //사용자가 이메일을 입력했으면 
        if (email.current.value) {
            console.log(email.current.value);
            axios.post('/email/sign-up?email=' + email.current.value)
                .then(response => {
                    setEmailCheck(true);
                    console.log('이메일 전송 성공:', response.data);

                })
                .catch(error => {
                    if(error.response.data.code=='409')
                    {
                        alert('이미 이메일을 전송하였습니다.');
                    }
                    console.error('이메일 전송 실패:', error.response.data.result);
                });
        }
        //이메일을 입력하지 않은 경우.
        else {
            alert('이메일을 확인해주세요');
            email.current.focus();
        }

    };
    //모달창 on/open 
    const addresstoggle = () => {
        setAddressIsOpen(!addressisopen);
    }
    //우편번호 state set 함수
    const zipcodehandle = (x) => {
        setZipCode(x);
    }
    const addresshandle = (x) => {
        setOriginAddress(x);
        let temp = x[0] + " " + x[1] + " " + x[2] + " " + x[3] + " " + x[4];
        setAddress(temp);
    }

    useEffect(()=>{
        //페이지 로드시 이메일 input에 자동으로 focus 
        email.current.focus();
    },[])

    return (
        <div className='signupwrap'>
            <h2 style={{ marginTop: "30px", marginBottom: "10px", fontWeight: "bold" }}>회원가입</h2>
            <p style={{ marginTop: "10px", marginBottom: "20px", fontSize: "20px" }}>Billim을 시작해보세요!</p>

            <div className='signupform'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='email-wrap'>
                        <div>
                        <label>이메일</label>
                        <input className="inputField"
                            ref={email}
                            placeholder="abcdef@google.com" />
                        <button className='emailbtn' onClick={(e) => {
                            //새로고침방지
                            e.preventDefault();
                            SendEmail();
                        }}> 인증 </button>
                        </div>
                        {emailcheck ? <h5 style={{color:"black"}}>이메일을 전송하였습니다</h5> : null}
                    </div>

                    <div className='key-wrap'>
                        <label>이메일 인증키</label>
                        <input className="inputField"
                            placeholder="인증번호를 입력하세요" {...register('authKey', {
                                required: '인증번호를 입력해주세요',
                            })} />
                        {errors.authKey && <p>{errors.authKey.message}</p>}
                    </div>

                    <div className='nickname-wrap'>
                        <label>닉네임</label>
                        <input className="inputField"
                            placeholder="최소 2자~ 최대15자" {...register('nickname', {
                                required: '닉네임을 입력해주세요',
                                minLength: {
                                    value: 2,
                                    message: '최소 2자 이상을 입력해주세요'
                                },
                                maxLength: {
                                    value: 15,
                                    message: '최대 15자 이하를 입력해주세요'
                                }
                            })} />
                        {errors.nickname && <p>{errors.nickname.message}</p>}
                    </div>

                    <div className='password-wrap'>
                        <label>비밀번호</label>
                        <input type='password' id='password' className="inputField"
                            placeholder="영문, 숫자, 특수문자 포함 8자 이상" {...register('password', {
                                required: '비밀번호를 입력해주세요',
                                minLength: {
                                    value: 8,
                                    message: '최소 8자 이상의 비밀번호를 입력해주세요'
                                },
                                pattern: {
                                    value:
                                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                                    message:
                                      '비밀번호는 숫자, 영문, 특수문자를 포함한 8글자 이상이어야 합니다.',
                                  },
                            })} />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>

                    <div className='repassword-wrap'>
                        <label>비밀번호 확인</label>
                        <input type='password' className="inputField" />
                    </div>

                    <div className='phone-wrap'>
                        <label >핸드폰 번호</label>
                        <input className="inputField"
                            placeholder="01012345678" {...register('phoneNumber', {
                                required: '핸드폰번호를 입력해주세요'
                            })} />
                        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
                    </div>

                    <div className='address-wrap'>
                        <div>
                        <label >주소</label>
                        {/* 우편번호 zipcode (ex. 50139) */}
                        <input className='inputZipcode' value={zipcode} onClick={() => { addresstoggle() }}></input>
                        <button onClick={(e) => {
                            addresstoggle();
                            e.preventDefault();
                        }}>주소찾기</button>
                        </div>
                        <input className='inputAddress' value={address} onClick={() => { addresstoggle() }} ></input>
                    </div>


                    {/* 주소찾기 클릭시 열리는모달 */}
                    {addressisopen && <Address addresstoggle={addresstoggle} zipcodehandle={zipcodehandle} addresshandle={addresshandle} />}

                    <button className='submitbtn' type="submit">가입하기</button>
                </form>


            </div>
        </div>
    );
};

export default Signup;