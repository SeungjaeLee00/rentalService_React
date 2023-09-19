import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../components/AuthContext';

function My_Reports() {
    const navigate = useNavigate();
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;

    const { isAuthenticated } = useAuth();
    const [reportList, setReportList] = useState([]);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/loginpage');
            return;
        }
        if (isAuthenticated) {
            const apiUrl = 'http://13.125.98.26:8080/reports/myPage';
            try {
                axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${actoken}`,
                        Auth: retoken
                      },
                })
                    .then(response => {
                        console.log('신고내역 불러오기 성공:', response.data);
                        setReportList(response.data.result.data.reportList);
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
    }, [actoken, navigate, isAuthenticated]);

    const deleteReport = async (reportId) => {
        try {
            const response = await axios.delete(`http://13.125.98.26:8080/reports/${reportId}`, {
                headers: { Authorization: `Bearer ${actoken}` },
                headers: { Auth: retoken },
            });

            if (response.data.success) {
                console.log('신고 삭제 성공:', response.data);
                fetchReportList();
            } else {
                console.error('서버 응답 오류:', response.data.error);
            }
        } catch (error) {
            console.error('API 요청 오류:', error);
        }
    };

    const fetchReportList = () => {
        // 신고 목록을 다시 불러옴
        axios.get('http://13.125.98.26:8080/reports/myPage', {
            headers: { Authorization: `Bearer ${actoken}` },
            headers: { Auth: retoken },
        })
        .then(response => {
            if (response.data.success) {
                console.log('신고내역 불러오기 성공:', response.data);
                setReportList(response.data.result.data.reportList);
            } else {
                console.error('서버 응답 오류:', response.data.error);
            }
        })
        .catch(error => {
            console.error('API 요청 오류:', error);
        });
    };

    return (
        <div>
            <h2>신고내역</h2>
            <ul>
                {reportList.map(report => (
                    <li key={report.reportId}>
                        <div className='report-info'>
                            <strong className="report-info-item">신고자 닉네임: {report.reporter_nickname}</strong>
                            <p className="report-info-item">신고 종류: {report.reportType}</p>
                            <p className="report-info-item">신고 내용: {report.content}</p>
                            <button onClick={() => deleteReport(report.reportId)}>삭제</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default My_Reports;
