import React from 'react';

const EditForm = ({ editedData, setEditedData, handleSaveClick, handleImageChange }) => {
    return (
        <div className='edit-form'>
            <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>나의 정보</h2>
            <h5 style={{ marginBottom: "20px" }}>나의 정보 수정하기</h5>
            <div className='editing-data'>
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
            </div>
            <button className="endEditingbtn" onClick={handleSaveClick}>수정하기</button>
        </div>
    );
}

export default EditForm;
