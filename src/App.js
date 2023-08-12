import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, useNavigate } from 'react-router-dom';

import './App.css';
import NavBar from './pages/NavBar';
import Signup from './pages/Signup';
import Main from'./pages/Main';
import ItemMain from './pages/about_Item/ItemMain';
import FindId from './pages/about_membership/FindId';
import FindPw from './pages/about_membership/Find_pw';
import Upload_Item from './pages/my_page/Upload_Item';
import FoundId from './pages/about_membership/FoundId';
import LoginPage from './pages/LoginPage';
// import { LoginSharp } from '@mui/icons-material';
import Detail from './pages/about_Item/Detail';


function App() {

  return (
    <div className="root-wrap">
      <NavBar />
      <Routes>
        {/* 메인 페이지 -> Login.js  */}
        <Route exact path="/" element={<Main />} />
        {/* 회원가입 */}
        <Route exact path="/signup" element={<Signup />} />

        <Route exact path="/find-id" element={<FindId />} />
        <Route exact path="/find-pw" element={<FindPw />} />
        
        <Route exact path="/found-id" element={<FoundId />} />
        
        <Route exact path="/loginpage" element={<LoginPage />} />
        
        {/* 로그인하고 보이는 첫 창*/}
        <Route exact path="/itemmain" element={<ItemMain />} />
        
        <Route exact path="/itemmain/upload-item" element={<Upload_Item />} />
        <Route exact path='/itemmain/detail' element={<Detail />} />
        
      </Routes>
    </div>


  );
}


export default App;