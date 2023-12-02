import '../../style/MyPage.css'
import { Outlet } from 'react-router-dom';
import Nav from "../SideNav/Index";
import MyPageTop from '../../components/MyPageTop';
import WriteBtn from '../../components/WriteBtn';
import useGet from '../../hooks/useGet';

export default function MyPage() {

  const nickname = window.sessionStorage.getItem("nickname");
  const mypost = useGet('/api/posts/my');
  const myrent = useGet('/api/trades/rend-item?true');
  const myborrow = useGet('/api/trades/borrow-item?true');
  const myreview = useGet('/api/reviews/my');
  const mywriterw = useGet('/api/reviews?nickname='+nickname);
  
  if(mypost.error||myrent.error||myborrow.error||myreview.error||mywriterw.error) return <div>에러발생</div>;
  if(mypost.loading||myrent.loading||myborrow.loading||myreview.loading||mywriterw.loading) return <div>로딩중</div>;
  if(!mypost.data||!myrent.data||!myborrow.data||!myreview.data||!mywriterw.data) return null;
  
  
  return (
    <div>
      {/* 마이페이지 상단 */}
       <MyPageTop mypost={mypost.data.totalElements}   myrent={myrent.data.totalElements} 
       myborrow={myborrow.data.totalElements} myreview={myreview.data.totalElements}  mywriterw={mywriterw.data.totalElements} />
      
      <div className="mypagebottom">
        {/* 마이페이지 왼쪽 nav */}
        <div className="bottom-leftnav"><Sidebar /></div>
        {/* https://leejams.github.io/useOutletContext/ , sidebar클릭했을때 보이는 컴포넌트들(mypost,mylike...*/}
        <div className='bottom-right'><Outlet context={{ mypost,  myrent,  myborrow, myreview, mywriterw}} /></div>
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
          <Nav.Link to="/my-page/post" $active={isActive("/my-page/post")}>
            내 게시물 조회
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link to="/my-page/like" $active={isActive("/my-page/like")}>
            좋아요
          </Nav.Link>
        </Nav.Item>
        <Nav.Separator />

        <Nav.Item>
          <Nav.Link to="/my-page/rent" $active={isActive("/my-page/rent")}>
           대여해주는 상품
          </Nav.Link>
        </Nav.Item>
        <Nav.Separator />

        <Nav.Item>
          <Nav.Link to="/my-page/borrow" $active={isActive("/my-page/borrow")}>
          대여받는 상품
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link to="/my-page/my-write-review" $active={isActive("/my-page/my-write-review")}>
          작성한 리뷰
          </Nav.Link>
        </Nav.Item>
        
        <Nav.Item>
          <Nav.Link to="/my-page/my-review" $active={isActive("/my-page/my-review")}>
          받은 리뷰
          </Nav.Link>
        </Nav.Item>

      </Nav.List>
    </Nav>
  );
}
