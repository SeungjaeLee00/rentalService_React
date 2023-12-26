import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import '../../style/signup.css'
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import Address from '../../components/Address';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Signup() {
    const navigate = useNavigate();
    //email -> useRef로 설정. useState로 하면 불필요한 리렌더링 발생 , 
    //실사간 유효성 검사 x -> 인증하기 버튼을 클릭하기 때문.
    const email = useRef();
    //비밀번호 확인 
    const verifypw = useRef();
    //이메일인증 확인 -> 인증메일 보내면 -> 확인문구 출력 
    const [emailcheck, setEmailCheck] = useState(false);
    //우편번호 표시 state 
    const [zipcode, setZipCode] = useState();
    //주소 오리지널 값 state , db에 넣기위한 형식 변경된 주소 값 
    const [originaddress, setOriginAddress] = useState();
    //사용자 화면에 표시하기 위한 주소값
    const [address, setAddress] = useState();
    //주소모달 open state 
    const [addressisopen, setAddressIsOpen] = useState(false);

    const onSubmit = (data) => {
        console.log(data.password);
        console.log(verifypw);
        //주소가 선택되지 않았으면
        if (!originaddress) {
            alert('주소를 선택해주세요');
            addresstoggle();
        }
        else {
            //이메일 따로추가. ref와 register 같이 사용 x 
            data.username = email.current.value;
            //address 따로추가. 지도 라이브러리사용.
            let address = {
                city: originaddress[1],
                district: originaddress[2],
                street: originaddress[3],
                zipCode: originaddress[4]
            }
            //data에 address 추가 
            data.address = address;
            if (data.password != verifypw.current.value) {
                alert('비밀번호가 일치하지 않습니다');
                verifypw.current.focus();
            }
            else {
                console.log(data);
                axios.post('/api/auth/sign-up', data)
                    .then(response => {
                        console.log(response);
                        alert('회원가입이 완료되었습니다');
                        navigate('/loginpage');
                        
                        
                    }).catch(error => {
                        if (error.response.data.result.msg == "해당 이메일로 가입된 계정이 이미 존재합니다.") {
                            alert('해당 이메일로 가입된 계정이 이미 존재합니다.')
                        }
                        else if (error.response.data.result.msg == "인증번호가 일치하지 않습니다.") {
                            alert("인증번호가 일치하지 않습니다.")
                        }
                        else if (error.response.data.result.msg == "해당 닉네임은 이미 사용중입니다.") {
                            alert("해당 닉네임은 이미 사용중입니다.")
                        }
                        console.log(error);
                    })
            }
        }



    }

    const { register, handleSubmit, formState: { errors }, } = useForm();

    const SendEmail = () => {

        //사용자가 이메일을 입력했으면 
        if (email.current.value) {
            console.log(email.current.value);
            axios.post('/api/email/sign-up?email=' + email.current.value)
                .then(response => {
                    setEmailCheck(true);
                    console.log('이메일 전송 성공:', response.data);
                    alert('이메일을 확인해주세요');

                })
                .catch(error => {
                    if (error.response.data.code == '409') {
                        alert('이미 이메일을 전송하였습니다.');
                    }
                    console.log(error);
                });
        }
        //이메일을 입력하지 않은 경우.
        else {
            alert('이메일을 입력해주세요');
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

    useEffect(() => {
        //페이지 로드시 이메일 input에 자동으로 focus 
        email.current.focus();
    }, [])

    return (
        <div className='signupwrap'>
            <div className='signupTop'>
            <h2 >회원가입</h2>
            <p>Billim을 시작해보세요!</p>
            </div>
            <div className='signupform'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='email-wrap'>
                        <div className='emailTop'>
                            <label>이메일</label>
                            <input className="inputField"
                                ref={email}
                                placeholder="abcdef@google.com" />
                        </div>
                        <div className='emailbtm'>
                        {emailcheck ? <h5 style={{ color: "blue" }}>이메일을 전송하였습니다</h5> : null}
                        <button className='emailbtn' onClick={(e) => {
                                //새로고침방지
                                e.preventDefault();
                                SendEmail();
                            }}> 인증 </button>
                        </div>
                    </div>

                    <div className='key-wrap'>
                        <div className='keyTop'>
                            <label>이메일 인증키</label>
                            <input className="inputField"
                                placeholder="인증번호를 입력하세요" {...register('authKey', {
                                    required: '인증번호를 입력해주세요',
                                })} />
                        </div>
                        {errors.authKey && <p>{errors.authKey.message}</p>}
                    </div>

                    <div className='nickname-wrap'>
                        <div>
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
                        </div>
                        {errors.nickname && <p>{errors.nickname.message}</p>}
                    </div>

                    <div className='password-wrap'>
                        <div>
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
                        </div>
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>

                    <div className='repassword-wrap'>
                        <label>비밀번호 확인</label>
                        <input type='password' className="inputField" ref={verifypw} />
                    </div>

                    <div className='phone-wrap'>
                        <div>
                            <label >핸드폰 번호</label>
                            <input className="inputField"
                                placeholder="01012345678" {...register('phoneNumber', {
                                    required: '핸드폰번호를 입력해주세요'
                                })} />
                        </div>
                        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
                    </div>

                    <div className='address-wrap'>
                        <div className='addressTop'>
                            <label >주소</label>
                            <div>
                                {/* 우편번호 zipcode (ex. 50139) */}
                                 <input className='inputZipcode' value={zipcode} onClick={() => { addresstoggle() }}></input>
                                 <button onClick={(e) => {
                                   addresstoggle();
                                   e.preventDefault();
                                 }}>주소찾기</button>
                            </div>
                        </div>
                        <div className='addressbtm'>
                            <label>상세주소</label>
                            <input className='inputAddress' value={address} onClick={() => { addresstoggle() }} ></input>
                        </div>
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