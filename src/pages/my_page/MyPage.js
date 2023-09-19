import '../../style/MyPage.css'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Nav from "../SideNav/Index";
import MyPageTop from '../../components/MyPageTop';
import WriteBtn from '../../components/WriteBtn';

export default function MyPage() {
  const actoken = localStorage.accessToken;
  const retoken = localStorage.refreshToken;


  const [mypost, setMyPost] = useState();
  const [myrent, setMyRent] = useState();
  const [myborrow, setMyBorrow] = useState();

  const [postloading, setPostLoading] = useState(null);
  const [rendloading, setRendLoading] = useState(null);
  const [borrowloading, setBorrowLoading] = useState(null);
  const [error, setError] = useState();

  const fetchMyPosts = async () => {
    setPostLoading(true);
    try {
      const response = await axios.get('/posts/my', {
        headers: { Authorization: `Bearer ${actoken}` },
        headers: { Auth: retoken }
      })
      setMyPost(response.data.result.data);
      setPostLoading(false);
    }
    catch (e) {
      console.log(e.response.data.result);
    }
  }
  const fetchMyRend = async () => {
    setRendLoading(true);
    try {
      const response = await axios.get('/trades/rend-item?true,', {
        headers: { Authorization: `Bearer ${actoken}` },
        headers: { Auth: retoken }
      })
      console.log(response);
      setMyRent(response.data.result.data);
      setRendLoading(false);
    }
    catch (e) {
      console.log(e.response.data.result);
    }
  }
  const fetchMYBorrow = async () => {
    setBorrowLoading(true);
    try {
      const response = await axios.get('/trades/borrow-item?true', {
        headers: { Authorization: `Bearer ${actoken}` },
        headers: { Auth: retoken }
      })
      console.log(response);
      setMyBorrow(response.data.result.data);
      setBorrowLoading(false);
    }
    catch (e) {
      console.log(e.response.data.result);
    }
  }

  useEffect(() => {
    //본인작성게시글
    fetchMyPosts();
    fetchMyRend();
    fetchMYBorrow();
  }, [])

  if (postloading || rendloading || borrowloading) return <div>로딩중..</div>

  return (
    <div>
      {/* 마이페이지 상단 */}
      {mypost && myrent && myborrow ? <> <MyPageTop mypost={mypost.totalElements}
        myrent={myrent.totalElements} myborrow={myborrow.totalElements} /></> : null}
      
      <div className="mypagebottom">
        {/* 마이페이지 왼쪽 nav */}
        <div className="bottom-leftnav"><Sidebar /></div>
        {/* https://leejams.github.io/useOutletContext/ , sidebar클릭했을때 보이는 컴포넌트들(mypost,mylike...*/}
        <div className='bottom-right'><Outlet context={{ mypost, setMyPost }} /></div>
      </div>
      <WriteBtn />
    </div>
  )
}


// sidebar 참고 :  https://www.daleseo.com/react-side-navigation/
function isActive(path) {
  return window.location.pathname.startsWith(path);
}

function Sidebar() {
  return (
    <Nav>
      <Nav.List>
        <Nav.Item>
          <Nav.Link to="/my-page/post" active={isActive("/my-page/post")}>
            내 게시물 조회
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to="/my-page/like" active={isActive("/my-page/like")}>
            좋아요
          </Nav.Link>
        </Nav.Item>
        <Nav.Separator />

        <Nav.Item>
          <Nav.Link to="/my-page/rent" active={isActive("/my-page/rent")}>
            대여해주는 상품
          </Nav.Link>
        </Nav.Item>
        <Nav.Separator />

        <Nav.Item>
          <Nav.Link to="/my-page/borrow" active={isActive("/my-page/borrow")}>
            대여받는 상품
          </Nav.Link>
        </Nav.Item>
      </Nav.List>
    </Nav>
  );
}
