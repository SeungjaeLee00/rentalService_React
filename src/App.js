import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar';
import Signup from './pages/SignUp/Signup';
import Main from './pages/Initial_Screen/Main';
import ItemMain from './pages/about_Item/ItemMain';
import FindId from './pages/about_membership/FindId';
import FindPw from './pages/about_membership/Find_pw';
import ResetPW from './pages/about_membership/ResetPW';
import Upload_Item from './pages/my_page/Upload_Item';
import FoundId from './pages/about_membership/FoundId';
import LoginPage from './pages/Login/LoginPage';
import Chat from './pages/Chat/Chat';


import Detail from './pages/about_Item/Detail';
import { LoginSharp, RoundaboutLeft } from '@mui/icons-material';
import Edit_membership from './pages/my_page/Edit_membership';
import AllChats from './pages/Chat/AllChats';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('accessToken'));


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
        <Route exact path='/reset-pw' element={<ResetPW />} />


        <Route exact path="/found-id" element={<FoundId onLogin={() => setIsLoggedIn(true)} />} />

        <Route exact path="/loginpage" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />

        {/* 로그인하고 보이는 첫 창*/}
        <Route exact path="/itemmain" element={<ItemMain />} />

        <Route exact path="/itemmain/upload-item" element={<Upload_Item />} />
        <Route exact path='/itemmain/detail' element={<Detail />} />
        <Route exact path='/itemmain/detail/chat' element={<Chat />} />



        <Route exact path='/my-page/edit-membership' element={<Edit_membership />} />
        <Route exact path='/my-page/chats' element={<AllChats />} />
      </Routes>
    </div>


  );
}


export default App;