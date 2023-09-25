import React from 'react';

const ViewProfile = ({ userData, startEditing }) => {
  return (
    <div className='my-data'>
      <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>나의 정보</h2>
      <h5 style={{ marginBottom: "20px" }}>나의 정보를 확인하세요</h5>
      <div className='default-data'>
        <br />
        <label className='email'>이메일</label>
        <p>{userData.username}</p>
        <br />
        <label className='nme'>이름</label>
        <p>{userData.nickname}</p>
        <br />
        <label className='phoneNum'>핸드폰 번호</label>
        <p>{userData.phoneNumber}</p>
        <br />
        <label className='address'>주소</label>
        <p>{userData.address.city}, {userData.address.district}, {userData.address.street}, {userData.address.zipCode}</p>
      </div>
      <button className="startEditingbtn" onClick={startEditing}>회원 정보 수정하기</button>
    </div>
  );
}

export default ViewProfile;
