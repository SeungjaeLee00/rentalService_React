import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './ChatForm.css';

function Chat() {

  let navigate = useNavigate();
  const [message, setMessage] = useState('');

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
