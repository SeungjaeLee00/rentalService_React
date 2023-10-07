import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../style/signup.css'
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

function Signup() {
    //email -> useRef로 설정. useState로 하면 불필요한 리렌더링 발생 , 
    //실사간 유효성 검사 x -> 인증하기 버튼을 클릭하기 때문.
    const email = useRef();
    const [emailcheck, setEmailCheck] = useState(false);
    
    const[password,setPassword]=useState();
    const[repassword,setRePassword]=useState();
    const[checkpw,setCheckpw]=useState(false);

    const onSubmit = (data) => { 
        //이메일 따로추가. ref와 register 같이 사용 x 
        data.username=email.current.value;
        console.log(data);
        if(password!=repassword)
        {
            alert('비밀번호를 확인해주세요');
        }
        
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
                    console.error('이메일 전송 실패:', error.response.data.result);
                });
            }
        //이메일을 입력하지 않은 경우.
        else
        {
            alert('이메일을 확인해주세요');
            email.current.focus();
        }

    };

    // const onSubmitHandler = (event) => {
    //     event.preventDefault();

    //     if(password !== confirmPassword){
    //         return alert('비밀번호와 비밀번호 확인이 같지 않습니다.')
    //     }

    //     axios.post('/auth/sign-up', dataToSend)
    //     .then(response => {
    //       console.log('회원가입 성공:', response.data);
    //       if ((response.status = 200)) {
    //         return navigate("/");
    //         }
    //     })
    //     .catch(error => {
    //       console.error('회원가입 실패:', error);
    //     });
    // };

    return (
        <div className='signupwrap'>
            <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>회원가입</h2>
            <p style={{ marginBottom: "20px" }}>Billim을 시작해보세요!</p>
            
            <div className='signupform'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>이메일</label>
                    <input className="inputField" 
                       ref={email}
                        placeholder="  abcdef@google.com" />
                    {emailcheck ? <p style={{ color: "black" }}>이메일을 전송하였습니다</p> : null}
                    <button onClick={(e) => {
                        //새로고침방지
                        e.preventDefault();
                        SendEmail();
                    }}> 인증하기 </button>

                    <label>이메일 인증키</label>
                    <input className="inputField"
                        placeholder="  인증번호를 입력하세요" {...register('authKey',{
                            required:'인증번호를 입력해주세요',
                        })} />
                    {errors.authKey&&<p>{errors.authKey.message}</p>}

                    <label>이름</label>
                    <input className="inputField"
                        placeholder="최소 2자~ 최대15자" {...register('nickname', {
                            required:'닉네임을 입력해주세요',
                            minLength:{
                                value:2,
                                message:'최소 2자 이상을 입력해주세요'
                            },
                            maxLength:{
                                value:15,
                                message:'최대 15자 이하를 입력해주세요'
                            }
                        })} />
                    {errors.nickname&&<p>{errors.nickname.message}</p>}


                    <label>비밀번호</label>
                    <input type='password' id='password' className="inputField"
                        placeholder="  영문, 숫자, 특수문자 포함 8자 이상" {...register('password',{
                            required:'비밀번호를 입력해주세요',
                            minLength:{
                                value:8,
                                message:'최소 8자 이상의 비밀번호를 입력해주세요'
                            }
                        })} />
                    {errors.password&&<p>{errors.password.message}</p>}
                    
                    <label>비밀번호 확인</label>
                    <input type='password' className="inputField"/>
                    
                    <label >핸드폰 번호</label>
                    <input className="inputField"
                        placeholder="  01012345678" {...register('phoneNumber',{
                            required:'핸드폰번호를 입력해주세요'
                        })} />
                    {errors.phoneNumber&&<p>{errors.phoneNumber.message}</p>}
                    <label >주소</label>
                    <input className="inputField"
                        placeholder=" 도시" {...register('address.city')} />
                    <input className="inputField"
                        placeholder="  지역(구)" {...register('address.district')} />
                    <input className="inputField"
                        placeholder="  번지(동)" {...register('address.street')} />
                    <input className="inputField"
                        placeholder="  우편번호" {...register('address.zipCode')} />


                    <button type="submit">가입하기</button>
                </form>


            </div>
        </div>
    );
};

export default Signup;