import '../../style/MyPage.css'
import HorizonLine from '../../components/HorizonLine'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Nav from "../SideNav/Index";
import MyPageTop from '../../components/MyPageTop';


// sidebar 참고 :  https://www.daleseo.com/react-side-navigation/
function isActive(path) {
  return window.location.pathname.startsWith(path);
}
function Sidebar()
{
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

export default function MyPage() {
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
    //본인작성게시글 api
    const [mypost, setMyPost] = useState();

    useEffect(()=>{
        axios.get('/posts/my', {
            headers: { Authorization: `Bearer ${actoken}` },
            headers: { Auth: retoken }
        })
            .then(response => {
                // console.log("본인작성게시글조회성공");
                setMyPost(response.data.result.data);
            })
            .catch(error => {
                console.log(error.response.data.result);
            })
    },[])
    return (
        <div> 
            
            <MyPageTop mypost={mypost}/>
            <div className="mypagebottom">
                <div className="bottom-leftnav"><Sidebar/></div>
                {/* https://leejams.github.io/useOutletContext/ */}
                <div className='bottom-right'><Outlet context={{
                    mypost,
                    setMyPost,
                }}/></div>
            </div>
            
        </div>
    )
}


