import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import NavBar from '../NavBar';
import '../../App.css'

function FoundId() {

  return (
      <div className='App'>
        <NavBar />
        <br />

        <h5 style={{ marginTop: "50px", marginBottom: "40px" }}>회원님의 아이디는</h5>
        <h2 style={{marginBottom: "20px"}}>(나중에props로받아와야함)</h2>
        <h5>입니다.</h5>

        <div style={{ marginTop:"20px" }}>
            <NavLink style={({ isActive }) => ({ color: isActive ? 'yellow' : 'gray' })} to="/find-pw">비밀번호 찾기</NavLink>{' | '}
            <NavLink style={({ isActive }) => ({ color: isActive ? 'yellow' : 'gray' })} to="/loginpage">로그인</NavLink>        
        </div>

      </div>
    );
  };

  
  export default FoundId;