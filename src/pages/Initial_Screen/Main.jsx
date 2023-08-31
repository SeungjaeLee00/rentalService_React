import React from "react"
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Login from '../Login/Login';
import { useEffect } from "react";
import axios from 'axios';

export default function Main() {

    let navigate = useNavigate();

    // const [data, setData] = useState("");
    const [showLoginPopup, setshowLoginPopup] = useState(false);

    const openloginModal = () => {
        setshowLoginPopup(true);
    };
    const closeloginModal = () => {
        setshowLoginPopup(false);
    };
    return (
        <div className="page-container-main">
            <div className='main-bg'></div>
            <div className='more_info'>
                <div className='col'>
                    <img src='' />
                    <h4>무엇이든 빌리세요!</h4>
                    <p>당장 내일 필요한데 또 내일만 쓸 물건을 사긴 그렇잖아요? 해서 준비했습니다!</p>
                </div>
            </div>

            <div className='login'>
                <div className='col'>
                    <Button onClick={openloginModal} variant="secondary" size="lg"> 로 그 인 </Button>{' '}
                    <Button onClick={() => navigate('/signup')} variant="secondary" size="lg" > 회원가입 </Button>

                    <Login open={showLoginPopup} close={closeloginModal} ></Login>
                </div>
            </div>
        </div>
    )
}