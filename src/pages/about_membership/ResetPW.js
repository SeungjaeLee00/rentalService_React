import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, useNavigate } from "react-router-dom";
import '../../style/LoginPage.css'
import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';



function Find_pw() {

  let navigate = useNavigate();  // hook: page 이동을 도와줌
  const { state } = useLocation();
  const { register, handleSubmit, setError, formState: { errors }, } = useForm({ mode: 'onBlur' });

  //비밀번호 , 비밀번호 확인 
  const onValid = (data) => {
    if (data.password != data.verifyPassword) {
      setError(
        'verifyPassword',
        { message: '비밀번호가 일치하지 않습니다' },
        { shouldFocus: true },
      );
    }
  }
  //변경하기 버튼 클릭시 실행되는 
  const onSubmit = (data) => {
    //비밀번호 == 비밀번호 확인
    onValid(data);
    data.username = state;
    axios.post('/password-reset', data)
    .then(response=>{
      alert('비밀번호가 변경되었습니다. 로그인 페이지로 이동합니다.')
      navigate("/loginpage");
    })
    .catch(error=>{
      if (error.response.data.code == '404') {
        alert('존재하지 않는 회원입니다. 아이디를 확인해주세요');
      }
      else if (error.response.data.code == '409') {
        alert('인증코드를 확인해주세요');
      }
    })

  }

  return (
    <div className='App'>
      <br />
      <h3 style={{ fontWeight: "bold" }}>비밀번호 재설정</h3>
      <div className='resetpw-wrap'>

        <form onSubmit={handleSubmit(onSubmit)}>

          <br />
          <label>인증코드</label>
          <input className="inputField" placeholder="인증코드를 입력하세요"
            {...register('authKey', {
              required: '인증코드를 입력하세요'
            })} />
          {errors.authKey && <p>{errors.authKey.message}</p>}

          <label>새로운 비밀번호</label>
          <input type='password' className="inputField" placeholder="영문, 숫자, 특수문자 포함 8자 이상"
            {...register('password', {
              required: '비밀번호를 입력하세요',
              minLength: {
                value: 8,
                message:
                  '비밀번호는 숫자, 영문, 특수문자를 포함한 8글자 이상이어야 합니다.',
              },
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  '비밀번호는 숫자, 영문, 특수문자를 포함한 8글자 이상이어야 합니다.',
              },
            })} />
          {errors.password && <p>{errors.password.message}</p>}

          <label>비밀번호 확인</label>
          <input type='password' className="inputField" placeholder="비밀번호를 한번 더 입력해주세요"
            {...register('verifyPassword', {
              required: '비밀번호를 입력하세요',
              minLength: {
                value: 8,
                message:
                  '비밀번호는 숫자, 영문, 특수문자를 포함한 8글자 이상이어야 합니다.',
              },
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  '비밀번호는 숫자, 영문, 특수문자를 포함한 8글자 이상이어야 합니다.',
              },
            })} />
          {errors.verifyPassword && <p>{errors.verifyPassword.message}</p>}
          <button type="submit" >변경하기</button>
        </form>


      </div>
    </div>
  );
};

export default Find_pw;

