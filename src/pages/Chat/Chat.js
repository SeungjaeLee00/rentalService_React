import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './ChatForm.css';
import { useAuth } from '../Login/AuthContext';

function Chat() {

  let navigate = useNavigate();
  const [message, setMessage] = useState('');
  const { isAuthenticated } = useAuth();

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim() !== '') {
      //   onSendMessage(message);
      setMessage('');
    }
  };

  if ( !isAuthenticated ) {
    navigate('/loginpage');
  }

  return (
    <div className="chat-form-container">
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          placeholder="메세지를 입력하세요..."
          value={message}
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
      </form>

      <button onClick={() => navigate('/my-page/chats')}>쪽지함</button>
    </div>
  );
}

export default Chat;
