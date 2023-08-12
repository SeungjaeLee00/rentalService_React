import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from '../NavBar';

function FindId() {
  return (
    <div className='page-container'>
      <div className='IdFind-container'>
        <div className='name'>
          <p>이름</p>
          <input></input>
        </div>
        <div className='phonenumber'>
          <p>휴대전화</p>
          <input></input>
          <button>인증번호 받기</button>
        </div>
      </div>
    </div>
  );
};


export default FindId;