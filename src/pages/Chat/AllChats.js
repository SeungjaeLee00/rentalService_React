import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './MessageApp.css';

function AllChats() {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const accessToken = state && state.accessToken;
    const refreshToken = state && state.refreshToken;

    const [messages, setMessages] = useState([]);

    // const accessToken = localStorage.getItem('accessToken');
    // const refreshToken = localStorage.getItem('refreshToken');

    const [viewMode, setViewMode] = useState('sent'); // 기본 뷰 모드

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`http://13.125.98.26:8080/messages/${viewMode}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setMessages(response.data.messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    useEffect(() => {
        if (accessToken && refreshToken) {
            fetchMessages();
        } else {
            navigate('/loginpage');
        }
    }, [viewMode, accessToken, refreshToken, navigate]);

    return (
        <div className="message-app">
            <div className="button-container">
                <button onClick={() => setViewMode('sent')}>보낸 쪽지함</button>
                <button onClick={() => setViewMode('received')}>받은 쪽지함</button>
            </div>
            {/* <p>AccessToken: {accessToken}</p>
            <p>RefreshToken: {refreshToken}</p> */}
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
