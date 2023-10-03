import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../style/modal.css'
import '../../../style/Edit_membership.css'
import { useAuth } from '../../../components/AuthContext';
import ViewProfile from './ViewProfile'; 
import EditForm from './EditForm';

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

  const startEditing = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
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
        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${actoken}`, 'Auth': retoken },
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
    try {
      setError(null);
      setStore(null);
      setLoading(true);
      const response = await axios.get("/members/my-profile", {
        headers: {
          'Authorization': `Bearer ${actoken}`,
          'Auth': retoken
        }
      })
      setUserData(response.data.result.data);
    } catch (error) {
      console(error);
      setError(error);
    }
    setLoading(false);
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImageFile(selectedFile);
  };

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
  if (!userData) return null;

  return (
    <div>
      <div className='editmy-top'>
        <p>기본 회원정보</p>
      </div>
    <ViewProfile userData={userData} startEditing={startEditing} />
  </div>
  );
}

export default Edit_membership;