import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../components/AuthContext';
import ReportContent from './ReportContent.js';
import '../../style/ReportList.css';

function My_Reports() {
    const navigate = useNavigate();
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;

    const { isAuthenticated } = useAuth();
    const [reportList, setReportList] = useState([]);
    const [title, setTitle] = useState([]);
    const [content, setContent] = useState([]);
    const [selectedType, setSelectedType] = useState("ALL");
    const [postInfo, setPostInfo] = useState({});
    const [isActive1, setIsActive1] = useState(true);
    const [isActive2, setIsActive2] = useState(false);
    const [isActive3, setIsActive3] = useState(false);
    

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

    // 신고 삭제
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

    // 신고 목록을 다시 불러옴
    const fetchReportList = () => {
        axios.get('http://13.125.98.26:8080/reports/myPage', {
            headers: {
                Authorization: `Bearer ${actoken}`,
                Auth: retoken
            }
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

    // 게시물 정보를 가져오는 함수
    const fetchPostInfo = async (postId) => {
        try {
            const response = await axios.get(`http://13.125.98.26:8080/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${actoken}`,
                    Auth: retoken
                },
            });

            if (response.data.success) {
                return response.data.result.data;
            } else {
                console.error('게시물 정보 요청 실패:', response.data.error);
                return null;
            }
        } catch (error) {
            console.error('API 요청 오류:', error);
            return null;
        }
    };

    // 게시물 정보 가져오기
    useEffect(() => {
        const getPostInfo = async () => {
            const info = {};
            for (const report of reportList) {
                // postId가 null이 아닌 경우에만 요청함
                if (report.reportType === "POST_REPORT" && report.postId) {
                    const postIdAsLong = Number(report.postId); // long
                    const postInfo = await fetchPostInfo(postIdAsLong);
                    if (postInfo) {
                        info[postIdAsLong] = postInfo;
                    }
                }
            }
            setPostInfo(info);
        };
        getPostInfo();
    }, [reportList]);


    const handleTypeChange = (type) => {
        setSelectedType(type);

        setIsActive1(type === "ALL");
        setIsActive2(type === "BUG");
        setIsActive3(type === "POST_REPORT");
    };

    return (
        <div className="report-wrap">
            <a className="reportslist">신고내역</a>
            <div className='report-info'>
                {/* 신고 유형 선택 */}
                <div className="type-selector">
                    <button className={isActive1 ? "all" : "buttonDefault"}
                        onClick={() => handleTypeChange("ALL")}>모두</button>
                    <button className={isActive2 ? "bug" : "buttonDefault"} 
                        onClick={() => handleTypeChange("BUG")}>버그</button>
                    <button className={isActive3 ? "post_" : "buttonDefault"}
                        onClick={() => handleTypeChange("POST_REPORT")}>게시물 신고</button>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>신고한 내역</th>
                            <th>신고 내용</th>
                            <th>삭제</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportList.map((report, index) => (
                            // 선택된 신고 유형에 따라 표시
                            (selectedType === "ALL" || report.reportType === selectedType) && (
                                <tr key={report.reportId}>
                                    <td>
                                        {report.reportType === "BUG" ? (
                                            <p>버그</p>
                                        ) : (
                                            <div>
                                                <p className='report-info-post'>{postInfo[report.postId]?.title}</p>
                                                <ReportContent content={postInfo[report.postId]?.content} />
                                            </div>
                                        )}
                                    </td>
                                    <td><p className="report-info-item">{report.content}</p></td>
                                    <td><button onClick={() => deleteReport(report.reportId)}>삭제</button></td>
                                </tr>
                            )
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default My_Reports;
