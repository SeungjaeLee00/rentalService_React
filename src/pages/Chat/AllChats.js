import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MessageApp.css';

function AllChats() {
  const [messages, setMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [viewMode, setViewMode] = useState('sent'); // 기본 뷰 모드

  useEffect(() => {
    fetchMessages();
  }, [viewMode]); // 클릭하면 메세지 패치

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://13.125.98.26:8080/messages/${viewMode}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

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
