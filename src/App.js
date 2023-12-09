import { Route, Routes } from 'react-router-dom';
import './style/App.css';
import { AuthProvider } from './components/AuthContext';
import Signup from './pages/SignUp/Signup';
import ItemMain from './pages/about_Item/ItemMain';
import FindPw from './pages/about_membership/Find_pw';
import ResetPW from './pages/about_membership/ResetPW';
import Upload_Item from './pages/my_page/Upload_Item';
import LoginPage from './pages/Login/LoginPage';
import Chat from './pages/Chat/Chat';
import Detail from './pages/about_Item/Detail';
import Edit_membership from './pages/my_page/Edit_Pages/Edit_membership';
import My_Reports from './pages/Report/My_Reports';
import Do_Report from './pages/Report/Do_Report'
import My_Review from './pages/Review/My_Review';
import Write_Review from './pages/Review/Write_Review';
import Category from './pages/about_Item/Category';
import ReNavBar from './components/ReNavBar';
import MyPage from './pages/my_page/MyPage';
import MyPost from './pages/my_page/MyPost'
import MyLike from './pages/my_page/MyLike'
import MyRent from './pages/my_page/MyRent';
import MyBorrow from './pages/my_page/MyBorrow';
import MyChat from './pages/Chat/MyChat'
import OneMessage from './pages/Chat/OneMessage';
import Footer from './components/Footer';
import Profile from './pages/my_page/Profile';
import NotFound from './components/NotFound';
import My_WriteReview from './pages/Review/My_WriteReview';
import Admin from './pages/Admin/Admin'
import HowToUse from './pages/Etc/HowToUse';



function App() {
  return (
    <div className="root-wrap">
      <ReNavBar />
      <div className='body'>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<ItemMain />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/*" element={<NotFound/>}/>
             
            <Route exact path="/find-pw" element={<FindPw />} />
            <Route exact path='/reset-pw' element={<ResetPW />} />
            <Route exact path="/loginpage" element={<LoginPage />} />

            <Route exact path='/itemmain/detail/profile' element={<Profile />} />
            <Route exact path="/itemmain/upload-item" element={<Upload_Item />} />
            <Route exact path='/itemmain/detail/:id' element={<Detail />} />
            <Route exact path='/itemmain/detail/chat' element={<Chat />} />
            <Route exact path='/category/:search' element={<Category />} />

            <Route exact path='/howtouse' element={<HowToUse/>}/>
            
            <Route exact path='/my-page/chats' element={<MyChat />} />
            <Route exact path='/my-page/chats/message/:id' element={<OneMessage />} />
            <Route exact path='/my-page/reports' element={<My_Reports />} />

            <Route exact path='/report' element={<Do_Report />} />
            <Route exact path='/reviews/write-review' element={<Write_Review />} />

            <Route exact path="/my-page" element={<MyPage />}>
              <Route exact path="post" element={<MyPost />}></Route>
              <Route exact path="like" element={<MyLike />}></Route>
              <Route exact path='rent' element={<MyRent />}></Route>
              <Route exact path='borrow' element={<MyBorrow />}></Route>
              <Route exact path='my-review' element={<My_Review />} />
              <Route exact path='my-write-review' element={<My_WriteReview/>}/>
              <Route exact path='/my-page/edit-membership' element={<Edit_membership />} />
            </Route>

            <Route exact path="/admin" element={<Admin/>}></Route>
          </Routes>
        </AuthProvider>
      </div>
      {/* 하단 footer */}
      <Footer />
    </div>
  );
}


export default App;