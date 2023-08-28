import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../Login/AuthContext';

function Edit_membership() {
  const navigate = useNavigate();
  const { accessToken, isAuthenticated, logout } = useAuth();
  const [data, setData] = useState('');

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    if ( !isAuthenticated ) {
      navigate('/loginpage');
      return;
    }
    
    if (accessToken) {
        axios.get('http://13.125.98.26:8080/members/my-profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(response => {
          setData(response.data);
          console.log('회원 정보 불러오기 성공:', response.data);
        })
        .catch(error => {
          console.error('API 요청 오류:', error);
        });
      }
    }, [accessToken, isAuthenticated, navigate]);

  return (
    <div>
    <h2>User Profile</h2>
    {/* {data ? (
        <p>서버에서 받은 데이터: {data}</p>
    ) : (
    <p>데이터를 불러올 수 없습니다.</p>
    )} */}
    <p>서버에서 받은 데이터: {data}</p>
    <button onClick={ handleLogout }>로그아웃</button>
  </div>
  );
}

export default Edit_membership;
    

    // const [nickname, setNickname] = useState("");
    // const [password, setPassword] = useState("");
    // const [phoneNumber, setPhoneNumber] = useState("");

    // const [city, setCity] = useState('');
    // const [district, setDistrict] = useState('');
    // const [street, setStreet] = useState('');
    // const [zipCode, setZipCode] = useState('');

    // const [introduce, setIntroduce] = useState('');
    // const [image, setImage] = useState("");

    // const [isEditing, setIsEditing] = useState(false);

    // const onNicknameHandler = (event) => {
    //     setNickname(event.currentTarget.value);
    // }
    // const onPasswordHandler = (event) => {
    //     setPassword(event.currentTarget.value);
    // }
    // const onPhoneNumberHandler = (event) => {
    //     setPhoneNumber(event.currentTarget.value);
    // }
    // const handleCityChange = (event) => {
    //     setCity(event.target.value);
    // }
    // const handleDistrictChange = (event) => {
    //     setDistrict(event.target.value);
    // }
    // const handleStreetChange = (event) => {
    //     setStreet(event.target.value);
    // }
    // const handleZipCodeChange = (event) => {
    //     setZipCode(event.target.value);
    // }
    // const onIntroduceHandler = (event) => {
    //     setIntroduce(event.currentTarget.value);
    // }
    // const setImgHandler = (event) => {
    //     var reader = new FileReader();
    
    //     reader.onload = function(event) {
    //       setImage(event.target.result);
    //     };
    
    //     reader.readAsDataURL(event.target.files[0]);
    //   }

    // const onIsEditingHandler = (event) => {
    //     event.preventDefault();

    //     const address = {
    //         city: city,
    //         district: district,
    //         street: street,
    //         zipCode: zipCode
    //       };

    //     const dataToSend = {
    //         nickname: nickname,
    //         password: password,
    //         phoneNumber: phoneNumber,
    //         address: address,
    //         introduce: introduce,

    //     }

    // }

//     return(
//         <div className='App'>
//             <h1>회원정보수정</h1>
//         </div>
//     )
// };


// 'http://13.125.98.26:8080/members/my-profile'