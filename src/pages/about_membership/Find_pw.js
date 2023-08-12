import '../../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import NavBar from '../NavBar';

function Find_pw() {
  return (
    <div className='page-container'>
      <div className='PwFind-container'>
        <h1>비밀번호를 찾고자 하는 아이디를 입력해주세요</h1>
        <input></input>
        <button>다음</button>
      </div>
      <div>
        <p>아이디가 기억나지 않는다면?</p>
        <Link to="/find-id">아이디 찾기</Link>
      </div>
    </div>
  );
};

export default Find_pw;