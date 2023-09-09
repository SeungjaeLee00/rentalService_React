import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../components/AuthContext';

function Edit_membership() {
  const navigate = useNavigate();
  const actoken = localStorage.accessToken;
  const retoken = localStorage.refreshToken;
  const { isAuthenticated, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태

  const handleLogout = () => {
    logout();
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedData({ ...userData });
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      formData.append('username', editedData.username);
      formData.append('password', editedData.password);
      formData.append('nickname', editedData.nickname);
      formData.append('phoneNumber', editedData.phoneNumber);
      formData.append('introduce', editedData.introduce);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      formData.append('city', editedData.address.city);
      formData.append('district', editedData.address.district);
      formData.append('street', editedData.address.street);
      formData.append('zipCode', editedData.address.zipCode);

      const response = await axios.patch('http://13.125.98.26:8080/members', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${actoken}` },
        headers: { Auth: retoken },
      });

      if (response.data.success) {
        console.log('회원 정보 수정 성공:', response.data);
        setIsEditing(false);
        setUserData(editedData);
      } else {
        console.error('서버 응답 오류:', response.data.error);
      }
    } catch (error) {
      console.error('API members 요청 오류:', error);

      if (error.response && error.response.status === 401) {
        console.error('AccessToken이 만료되었습니다. 로그인 페이지로 이동합니다.');
        navigate('/loginpage');
      }
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImageFile(selectedFile);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/loginpage');
      return;
    }

    if (isAuthenticated) {
      const apiUrl = 'http://13.125.98.26:8080/members/my-profile';
      try {
        axios.get(apiUrl, {
          headers: { Authorization: `Bearer ${actoken}` },
          headers: { Auth: retoken },
        })
          .then(response => {
            console.log('회원 정보 불러오기 성공:', response.data);
            setUserData(response.data.result.data);
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
  }, [actoken, navigate]);

  return (
    <div>
      <h2>User Profile</h2>
      {userData && !isEditing ? (
        <div>
          <p>ID: {userData.id}</p>
          <p>Username: {userData.username}</p>
          <p>Nickname: {userData.nickname}</p>
          <p>Phone Number: {userData.phoneNumber}</p>
          {/* <p>Introduce: {userData.introduce}</p> */}
          {/* <p>Image: {userData.image}</p> */}
          <p>Address: {userData.address.city}, {userData.address.district}, {userData.address.street}, {userData.address.zipCode}</p>
          <button onClick={handleEditClick}>본인정보 수정</button>
        </div>
      ) : null}

      {isEditing ? (
        <div>
          {/* <p>ID: {editedData.id}</p> */}
          <label htmlFor="username">이메일:</label>
          <input
            type="text"
            id="username"
            value={editedData.username}
            onChange={(e) => setEditedData({ ...editedData, username: e.target.value })}
          />
          <br />
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={editedData.password}
            onChange={(e) => setEditedData({ ...editedData, password: e.target.value })}
          />
          <br />
          <label htmlFor="nickname">이름:</label>
          <input
            type="text"
            id="nickname"
            value={editedData.nickname}
            onChange={(e) => setEditedData({ ...editedData, nickname: e.target.value })}
          />
          <br />
          <label htmlFor="phoneNumber">핸드폰 번호:</label>
          <input
            type="text"
            id="phoneNumber"
            value={editedData.phoneNumber}
            onChange={(e) => setEditedData({ ...editedData, phoneNumber: e.target.value })}
          />
          <br />
          <label htmlFor="introduce">소개:</label>
          <textarea
            id="introduce"
            value={editedData.introduce}
            onChange={(e) => setEditedData({ ...editedData, introduce: e.target.value })}
          />
          <br />
          <label htmlFor="image">사진:</label>
          <input
            type="file"
            id="image"
            accept=".jpg"
            onChange={handleImageChange}
          />
          <br />
          <label htmlFor="city">도시:</label>
          <input
            type="text"
            id="city"
            value={editedData.address.city}
            onChange={(e) => setEditedData({ ...editedData, address: { ...editedData.address, city: e.target.value } })}
          />
          <br />
          <label htmlFor="district">지역(구):</label>
          <input
            type="text"
            id="district"
            value={editedData.address.district}
            onChange={(e) => setEditedData({ ...editedData, address: { ...editedData.address, district: e.target.value } })}
          />
          <br />
          <label htmlFor="street">번지(동):</label>
          <input
            type="text"
            id="street"
            value={editedData.address.street}
            onChange={(e) => setEditedData({ ...editedData, address: { ...editedData.address, street: e.target.value } })}
          />
          <br />
          <label htmlFor="zipCode">우편번호:</label>
          <input
            type="text"
            id="zipCode"
            value={editedData.address.zipCode}
            onChange={(e) => setEditedData({ ...editedData, address: { ...editedData.address, zipCode: e.target.value } })}
          />
          <br />
          <button onClick={handleSaveClick}>저장</button>
        </div>
      ) : null}

      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}

export default Edit_membership;
