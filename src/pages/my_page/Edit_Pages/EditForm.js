import axios from 'axios';
import React, { useState } from 'react';
import Address from '../../../components/Address';

const EditForm = (props) => {
    console.log(props);
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
    //주소모달 open state 
    const [addressisopen, setAddressIsOpen] = useState(false);
    //우편번호 표시 state 
    const [zipnumber, setZipNumber] = useState();
    //사용자 화면에 표시하기 위한 주소값
    const [address, setAddress] = useState(props.userData.address.city+" "+props.userData.address.district+" "+props.userData.address.street+" "+props.userData.address.zipCode);
    //주소 오리지널 값 state 
    const [originaddress, setOriginAddress] = useState([props.userData.address.city, props.userData.address.district,
        props.userData.address.street, props.userData.address.zipCode]);

    //모달창 on/open 
    const addresstoggle = () => {
        setAddressIsOpen(!addressisopen);
    }
    //우편번호 state set 함수
    const zipcodehandle = (x) => {
        setZipNumber(x);
    }
    const addresshandle = (x) => {
        setOriginAddress(x);
        let temp = x[0] + " " + x[1] + " " + x[2] + " " + x[3] + " " + x[4];
        setAddress(temp);
    }
    const [inputs, setInputs] = useState({
        email: `${props.userData.username}`,
        nickname: `${props.userData.nickname}`,
        phonenumber: `${props.userData.phoneNumber}`,
        introduce: `${props.userData2.introduce}`,
    });
    const [file, setFile] = useState(props.userData2.profileImageName);


    const { email, nickname, phonenumber, introduce } = inputs; //비구조화 할당을 통해 값 추출

    const onChange = (e) => {
        const { value, name } = e.target; // e.target에서 name과 value를 추출
        setInputs({
            ...inputs, //기존의 input 객체를 복사
            [name]: value // name키를 가진 값을 value로 설정
        });
    };
    const saveFile = (e) => {
        setFile(e.target.files[0]);
    }

    const patchmyinfo = () => {
        const formData = new FormData();
        formData.append('nickname', inputs.nickname);
        formData.append('phoneNumber', inputs.phonenumber);
        formData.append('address.city', originaddress[1]);
        formData.append('address.district',originaddress[2]);
        formData.append('address.street', originaddress[3]);
        formData.append('address.zipCode', originaddress[4]);
        formData.append('introduce', inputs.introduce);
        formData.append('image', file);
        axios.patch('/api/members', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${actoken}`, 'Auth': retoken
            }
        }).then(response => {
            console.log(response);
            alert('회원정보가 수정되었습니다');
            window.location.replace('/');
        }).catch(error => {
            if (error.response.data.code == '409') {
                alert('해당 닉네임은 이미 사용중입니다')
            }
            console.log(error);
        })
    }

    return (
        <div className='edit-form'>
            <table className='my-datatable'>
                <tbody className='my-datatbody'>
                    <tr>
                        <td>이메일</td>
                        <td><input className='input-email' name="email" value={email} onChange={onChange}></input></td>

                    </tr>
                    <tr>
                        <td>닉네임</td>
                        <td>
                            <input className='input-nickname' name="nickname" value={nickname} onChange={onChange} />
                            {nickname.length < 2 || nickname.length > 15 ? <p>2자이상 15자이하</p> : null}
                        </td>

                    </tr>
                    <tr>
                        <td>핸드폰 번호</td>
                        <td><input className='input-phone' name="phoneNumber" value={phonenumber} onChange={onChange}></input></td>
                    </tr>
                    <tr>
                        <td>주소</td>
                        <td className='td-address'>        
                                <input className='inputaddress' value={address}  onClick={(e)=>{
                                    addresstoggle();
                                    e.preventDefault();
                                }}/>
                        </td>
                    </tr>
                    {/* 주소찾기 클릭시 열리는모달 */}
                    {addressisopen && <Address addresstoggle={addresstoggle} zipcodehandle={zipcodehandle} addresshandle={addresshandle} />}
                    <tr>
                        <td>소개</td>
                        <td><input className='input-introduce' name="introduce" value={introduce} onChange={onChange}/></td>
                    </tr>
                    <tr>
                        <td>프로필사진</td>
                        <td><input type='file' name="image" onChange={saveFile}></input></td>
                    </tr>
                </tbody>
            </table>
            <button className="CompleteEditBtn" onClick={patchmyinfo}>수정완료</button>
        </div>
    );
}

export default EditForm;
