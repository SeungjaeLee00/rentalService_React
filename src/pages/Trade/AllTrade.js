import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Login/AuthContext';


function AllTrade() {
  const navigate = useNavigate();

  const { isAuthenticated, accessToken } = useAuth();

  const [messages, setMessages] = useState([]);
  const [viewMode, setViewMode] = useState('rend-item'); // 기본 뷰 모드
  const [itemviewMode, setItemViewMode] = useState('true'); //기본 complete 모드

  const fetchMessages = async () => {
    try {
      if (accessToken) {
        const response = await axios.get(`http://13.125.98.26:8080/trades/${viewMode}?tradeComplete=${itemviewMode}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.success) {
          setMessages(response.data.messages);
        } else {
          console.error('서버 응답 오류:', response.data.error);
        }
      }
    } catch (error) {
      console.error('API 요청 오류:', error);

      if (error.response && error.response.status === 401) {
        console.error('AccessToken이 만료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/loginpage');
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    } else {
      navigate('/loginpage');
    }
  }, [accessToken, viewMode, isAuthenticated, navigate]);

  return (
    <div className="message-app">
      <div className="button-container">
        <button onClick={() => setViewMode('rend-item')}>빌려줄게요</button>
        <button onClick={() => setViewMode('borrow-item')}>빌려주세요</button>
      </div>
      <div>
        <h2>{viewMode === 'rend-item' ? '빌려줄게요' : '빌려주세요'}</h2>
        {messages ? (
            <ul>
              <p>{messages}</p>
            </ul>
        ) : (
            <p>데이터를 불러올 수 없습니다.</p>
        )}
      </div>

    </div>
  );
}

export default AllTrade;
