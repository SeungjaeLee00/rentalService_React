import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MessageApp.css';
import { useAuth } from '../../components/AuthContext';

function AllChats() {
  const navigate = useNavigate();
  const actoken = localStorage.accessToken;
  const retoken = localStorage.refreshToken;

  const { isAuthenticated } = useAuth();
  const [messageList, setMessageList] = useState([]);
  const [viewMode, setViewMode] = useState('sent');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchedMemberName, setSearchedMemberName] = useState('');
  const [searchedMessages, setSearchedMessages] = useState([]);


  const handleCloseModal = () => {
    setModalOpen(false);
  }

  const handleSearchInputChange = (event) => {
    setSearchedMemberName(event.target.value);
  }

  const fetchMessages = async () => {
    if (isAuthenticated) {
      try {
        const response = await axios.get(`http://13.125.98.26:8080/messages/${viewMode}`, {
          headers: {
            Authorization: `Bearer ${actoken}`,
          },
          headers: { Auth: retoken },
        });
        if (response.data.success) {
          console.log('메시지 불러오기 성공:', response.data);
          setMessageList(response.data.result.data.messageList);
        } else {
          console.error('서버 응답 오류:', response.data.error);
        }
      } catch (error) {
        console.error('API 요청 오류:', error);

        if (error.response && error.response.status === 401) {
          console.error('AccessToken이 만료되었습니다. 로그인 페이지로 이동합니다.');
          navigate('/loginpage');
        }
      }
    }
  };

  const handleSearchName = () => {
    const url = viewMode === 'sent'
      ? `http://13.125.98.26:8080/messages/sent?receiverName=${searchedMemberName}`
      : `http://13.125.98.26:8080/messages/received?senderName=${searchedMemberName}`;

    axios.get(url, {
      headers: {
        Authorization: `Bearer ${actoken}`,
        Auth: retoken,
      },
    })
      .then(response => {
        if (response.data.success) {
          console.log('메시지 상세 정보 불러오기 성공:', response.data);
          setSearchedMessages(response.data.result.data.messageList);
        } else {
          console.error('서버 응답 오류:', response.data.error);
        }
      })
      .catch(error => {
        console.error('API 요청 오류:', error);
      });
  }

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    setModalOpen(true);
  }


  const deleteMessage = async (messageId) => {
    try {
      const response = await axios.delete(`http://13.125.98.26:8080/messages/${messageId}/${viewMode}`, {
        headers: {
          Authorization: `Bearer ${actoken}`,
          Auth: retoken
        },
      });
      if (response.data.success) {
        console.log('메시지 삭제 성공:', response.data);
        setMessageList(prevMessages => prevMessages.filter(message => message.id !== messageId));
        setSelectedMessage(null);
      } else {
        console.error('서버 응답 오류:', response.data.error);
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
    }
  };

  const navigateToChat = () => {
    navigate('/itemmain/detail/chat');
  };

  useEffect(() => {
    setMessageList([]);
    setSelectedMessage(null);

    if (isAuthenticated) {
      if (searchedMemberName === '') {
        fetchMessages();
      }
    } else {
      navigate('/loginpage');
    }
  }, [viewMode, isAuthenticated, navigate, searchedMemberName]);


  return (
    <div className="message-app">
      <div className="button-container">
        <button onClick={() => setViewMode('sent')}>보낸 쪽지함</button>
        <button onClick={() => setViewMode('received')}>받은 쪽지함</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="회원 이름 검색"
          value={searchedMemberName}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearchName}>검색</button>

        <h2>{viewMode === 'sent' ? '보낸 쪽지함' : '받은 쪽지함'}</h2>
        <ul>
          {searchedMemberName === ''
            ? messageList.map(message => (
              <li
                key={message.id}
                onClick={() => {
                  handleSelectMessage(message);
                }}
              >
                <div
                  className='message-info'
                  style={{
                    width: "100%",
                    borderBottom: "1px solid #aaa",
                    lineHeight: "0.1em",
                    margin: "30px 0 50px",
                  }}
                >
                  <button onClick={() => deleteMessage(message.id)}>삭제</button>
                  <strong className="message-info-item">
                    {viewMode === 'sent' ? 'To' : 'From'}: {message.receiverNickname}
                  </strong>
                  <p className="message-info-item">
                    내용: {message.content.length > 10 ? message.content.substring(0, 10) + '...' : message.content}
                  </p>
                  <button onClick={() => navigateToChat(message.receiverMember)}>쪽지 보내기</button>
                </div>
              </li>
            ))
            : searchedMessages.map(message => (
              <li
                key={message.id}
                onClick={() => {
                  handleSelectMessage(message);
                }}
              >
                <div
                  className='message-info'
                  style={{
                    width: "100%",
                    borderBottom: "1px solid #aaa",
                    lineHeight: "0.1em",
                    margin: "30px 0 50px",
                  }}
                >
                  <button onClick={() => deleteMessage(message.id)}>삭제</button>
                  <strong className="message-info-item">
                    {viewMode === 'sent' ? 'To' : 'From'}: {message.receiverNickname}
                  </strong>
                  <p className="message-info-item">
                    내용: {message.content.length > 10 ? message.content.substring(0, 10) + '...' : message.content}
                  </p>
                  <button onClick={() => navigateToChat(message.receiverMember)}>쪽지 보내기</button>
                </div>
              </li>
            ))}
        </ul>
      </div>

      {modalOpen && (
        <div className='openModal modal'>
          <section>
            <header>
              <button className="close" onClick={handleCloseModal}> X </button>
            </header>
            <main>
              <div className='message-info'>
                <strong className="message-info-item">
                  {viewMode === 'sent' ? 'To' : 'From'}: {selectedMessage.recevierNickname}
                </strong>
                <p className="message-info-item">내용: {selectedMessage.content}</p>
                <button onClick={() => navigateToChat(selectedMessage.receiverMember)}>쪽지 보내기</button>
              </div>
            </main>
            <footer>
              <button className="close" onClick={handleCloseModal}>
                close
              </button>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
}

export default AllChats;