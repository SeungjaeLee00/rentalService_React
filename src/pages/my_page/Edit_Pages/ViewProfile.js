import React from 'react';
import { useNavigate } from 'react-router-dom';

const ViewProfile = (props) => {
  console.log(props.userData);

  const navigate = useNavigate();
  if(!props.userData||!props.userData.address) return null;
  return (
    <div className='my-data'>
      <table className='my-datatable'>
        <tbody className='my-datatbody'>
          <tr>
            <td>이메일</td>
            <td style={{fontWeight:"bold"}}>{props.userData.username}</td>
          </tr>
          <tr>
            <td>닉네임</td>
            <td style={{fontWeight:"bold"}}>{props.userData.nickname}</td>
          </tr>
          <tr>
            <td>핸드폰 번호</td>
            <td style={{fontWeight:"bold"}}>{props.userData.phoneNumber}</td>
          </tr>
          <tr>
            <td>주소</td>
            <td style={{fontWeight:"bold"}}>{props.userData.address.city} {props.userData.address.district}
             {props.userData.address.street} {props.userData.address.zipCode}</td>
          </tr>
          <tr>
            <td>소개</td>
            <td style={{fontWeight:"bold"}}>{props.userData2.introduce}</td>
          </tr>
          <tr>
            <td>프로필사진</td>
            <td style={{fontWeight:"bold"}}><img style={{width:"100px", height:"130px"}} src={'https://sharingplatformbucket.s3.ap-northeast-2.amazonaws.com/memberProfile/'+
          props.userData2.profileImageName}></img></td>
          </tr>
        </tbody>
      </table>
     <div className='btn-wrap'>
      <button className="EditBtn" onClick={()=>{props.startEditing()}}>회원정보수정</button>
      <button className="EditBtn" onClick={()=>{navigate('/find-pw')}}>비밀번호변경</button>
      </div>
      
    </div>
  );
}

export default ViewProfile;
