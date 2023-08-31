import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../Login/AuthContext';

function My_Reports() {
    const navigate = useNavigate();
    const { accessToken, isAuthenticated } = useAuth();
    const [data, setData] = useState('');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/loginpage');
            return;
        }
        if (accessToken) {
            const apiUrl = 'http://13.125.98.26:8080/reports/myPage';
            try {
                axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                    .then(response => {
                        console.log('신고내역 불러오기 성공:', response.data);
                        setData(response.data);
                    })
                    .catch(error => {
                        console.error('API 요청 오류:', error);

                        if (error.response && error.response.status === 401) {
                            console.error('AccessToken이 만료되었습니다. 로그인 페이지로 이동합니다.');
                            navigate('/loginpage');
                        }
                    });
            } catch (error) {
                console.error('API 요청 오류:', error);
            }
        }
    }, [accessToken, navigate]);
    return (
        <div>
            <h2>신고내역</h2>
            {data ? (
                <p>{data}</p>
            ) : (
                <p>데이터를 불러올 수 없습니다.</p>
            )}
        </div>
    )
}
export default My_Reports;