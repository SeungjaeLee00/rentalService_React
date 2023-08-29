import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './MessageApp.css';
import { useAuth } from '../Login/AuthContext';


function AllChats() {
  const navigate = useNavigate();

  const { isAuthenticated, accessToken } = useAuth();

  const [messages, setMessages] = useState([]);
  const [viewMode, setViewMode] = useState('sent'); // 기본 뷰 모드

  const fetchMessages = async () => {
    try {
      if (accessToken) {
        const response = await axios.get(`http://13.125.98.26:8080/messages/${viewMode}`, {
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
        <button onClick={() => setViewMode('sent')}>보낸 쪽지함</button>
        <button onClick={() => setViewMode('received')}>받은 쪽지함</button>
      </div>
      <div className="message-list">
        <h2>{viewMode === 'sent' ? '보낸 쪽지함' : '받은 쪽지함'}</h2>
        <ul>
          {/* {messages.map(message => (
            <li key={message.id}>
              <strong>From:</strong> {message.sent}, <strong>To:</strong> {message.received}, <strong>Message:</strong> {message.text}
            </li>
          ))} */}
        </ul>
      </div>

    </div>
  );
}

export default AllChats;
