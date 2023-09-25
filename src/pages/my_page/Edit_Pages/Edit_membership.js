import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../style/modal.css'
import { useAuth } from '../../../components/AuthContext';

const Edit_membership = (props) => {
  const navigate = useNavigate();
  const actoken = localStorage.accessToken;
  const retoken = localStorage.refreshToken;
  const { isAuthenticated } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const [store, setStore] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [password, setPassword] = useState('');
  

  const openModal = () => {
    setIsEditing(true); // 수정 모드로 변경
    // setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsEditing(false); // 수정 모드 종료
    setIsModalOpen(false);
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      formData.append('password', editedData.password);
      formData.append('nickname', editedData.nickname);
      formData.append('phoneNumber', editedData.phoneNumber);
      formData.append('introduce', editedData.introduce);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      formData.append('address.city', editedData.address.city);
      formData.append('address.district', editedData.address.district);
      formData.append('address.street', editedData.address.street);
      formData.append('address.zipCode', editedData.address.zipCode);

      const response = await axios.patch('http://13.125.98.26:8080/members', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${actoken}`, Auth: retoken },
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

  const myprofile = async () => {
    const apiUrl = 'http://13.125.98.26:8080/members/my-profile';
    try {
      setError(null);
      setStore(null);
      setLoading(true);
      axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${actoken}`, Auth: retoken },
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
      setError(error);
    }
    setLoading(false);
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImageFile(selectedFile);
  };

  // const onPasswordHandler = (e) => {
  //   setPassword(e.target.value);
  // };

  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   if (password === userData.password) {
  //     setIsPasswordVerified(true);
  //     setIsEditing(true);
  //     setIsModalOpen(false);
  //   } else {
  //     alert('비밀번호가 일치하지 않습니다.');
  //   }
  // };

  useEffect(() => {
    setEditedData({ ...userData });
    return () => {
      if (!isAuthenticated) {
        navigate('/loginpage');
        return;
      }
      if (isAuthenticated) {
        myprofile();
      }
    }
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러</div>;

  return (
    <div>
      {userData && !isEditing ? (
        <div>
          <p>이메일: {userData.username}</p>
          <p>이름: {userData.nickname}</p>
          <p>핸드폰 번호: {userData.phoneNumber}</p>
          <p>주소 : {userData.address.city}, {userData.address.district}, {userData.address.street}, {userData.address.zipCode}</p>
          <button onClick={openModal}>회원 정보 수정하기</button>
        </div>
      ) : null}

      {/* {isModalOpen ? (
        <div className="openModal modal">
          <section>
            <header>
              <button className="close" onClick={closeModal}> X </button>
            </header>

            <main>
              <form onSubmit={onSubmitHandler}>
                <h4>뭐든빌리개</h4>
                <p style={{ fontSize: "13px", color: "#4A4F5A" }}>회원 정보 수정을 위해 비밀번호를 입력해주세요.</p>
                <br />
                <input
                  type='password'
                  className="inputField"
                  placeholder="  비밀번호"
                  value={password}
                  onChange={onPasswordHandler}
                />
                <button color="dark" type="submit">확인</button>
              </form>
            </main>

            <footer>
              <button className="close" onClick={closeModal}>
                close
              </button>
            </footer>
          </section>
        </div>
      ) : null} */}

      {isEditing ? (
        <div>
          <br />
          <label htmlFor="password">새 비밀번호:</label>
          <input
            type="password"
            id="password"
            value={editedData.password}
            onChange={(e) => setEditedData({ ...editedData, password: e.target.value })}
          />
          <br />
          <label htmlFor="nickname">이름: </label>
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
          <label htmlFor="image">프로필 사진:</label>
          <input
            type="file"
            id="image"
            accept=".jpg, .png, .jpeg, .gif, .bmp"
            onChange={handleImageChange}
          />
          <br />
          <label htmlFor="city">시:</label>
          <input
            type="text"
            id="city"
            value={editedData.address.city}
            onChange={(e) => setEditedData({ ...editedData, address: { ...editedData.address, city: e.target.value } })}
          />
          <br />
          <label htmlFor="district">구:</label>
          <input
            type="text"
            id="district"
            value={editedData.address.district}
            onChange={(e) => setEditedData({ ...editedData, address: { ...editedData.address, district: e.target.value } })}
          />
          <br />
          <label htmlFor="street">동:</label>
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
          <button onClick={handleSaveClick}>수정하기</button>
        </div>
      ) : null}
    </div>
  );
}

export default Edit_membership;