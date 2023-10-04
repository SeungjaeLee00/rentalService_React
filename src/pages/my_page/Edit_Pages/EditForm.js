import axios from 'axios';
import React, { useState } from 'react';

const EditForm = (props) => {
    const actoken = localStorage.accessToken;
  const retoken = localStorage.refreshToken;
    const [inputs,setInputs] = useState({
        email:`${props.userData.username}`,
        nickname:`${props.userData.nickname}`,
        phonenumber:`${props.userData.phoneNumber}`,
        city:`${props.userData.address.city}`,
        district:`${props.userData.address.district}`,
        street:`${props.userData.address.street}`,
        zipcode:`${props.userData.address.zipCode}`,
        introduce:`${props.userData2.introduce}`,
        image:`${props.userData2.profileImage.uniqueName}`
    });

    const {email,nickname,phonenumber,city,district,street,zipcode,introduce,image} = inputs; //비구조화 할당을 통해 값 추출

    const onChange=(e)=>{
        const {value,name} = e.target; // e.target에서 name과 value를 추출
        setInputs({
            ...inputs, //기존의 input 객체를 복사
            [name]:value // name키를 가진 값을 value로 설정
        });
    };

    const patchmyinfo = () =>{
        const formData = new FormData();
        formData.append('nickname', inputs.nickname);
        formData.append('phoneNumber', inputs.phonenumber);
        formData.append('address.city', inputs.city);
        formData.append('address.street', inputs.street);
        formData.append('address.zipCode', inputs.zipcode);
        formData.append('introduce', inputs.introduce);
        formData.append('image', inputs.profileImage.uniqueName);
        axios.patch('/members',formData,{
            headers: { 'Content-Type': 'multipart/form-data',
         'Authorization': `Bearer ${actoken}`, 'Auth':retoken }
        }).then(response=>{
            console.log(response);
        }).catch(error=>{
            console.log(error);
        })
    }
    
    return (
        <div className='edit-form'>
            <table className='my-datatable'>
                <tbody className='my-datatbody'>
                    {/* <button onClick={()=>{console.log(inputs)}}>데이터확인</button> */}
                    <tr>
                        <td>이메일</td>
                        <td><input  name="email" value={email} onChange={onChange}></input></td>
                    </tr>
                    <tr>
                        <td>닉네임</td>
                        <td><input  name="nickname" value={nickname} onChange={onChange}></input></td>
                    </tr>
                    <tr>
                        <td>핸드폰 번호</td>
                        <td><input  name="phoneNumber" value={phonenumber} onChange={onChange}></input></td>
                    </tr>
                    <tr>
                        <td>주소</td>
                        <td><input  name="city" value={city} onChange={onChange}></input> <input  name="district" value={district} onChange={onChange}></input>
                        <input  name="street" value={street} onChange={onChange}></input> <input  name="zipcode" value={zipcode} onChange={onChange}></input></td>
                    </tr>
                    <tr>
                        <td>소개</td>
                        <td><input style={{width:"500px"}} name="introduce" value={introduce} onChange={onChange}></input></td>
                    </tr>
                    <tr>
                        <td>프로필사진</td>
                        <td><input  name="image" value={image} onChange={onChange}></input></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={patchmyinfo}>수정하기</button>
        </div>
    );
}

export default EditForm;
