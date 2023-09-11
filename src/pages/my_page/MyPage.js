import '../../style/MyPage.css'
import HorizonLine from '../../components/HorizonLine'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Nav from "../SideNav/Index";
import MyPageTop from '../../components/MyPageTop';

function isActive(path) {
  return window.location.pathname.startsWith(path);
}
function Sidebar()
{
    return (
        <Nav>
          <Nav.List>
            <Nav.Item>
              <Nav.Link to="post" active={isActive("post")}>
                 내 게시물 조회 
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link to="like" active={isActive("like")}>
                좋아요
              </Nav.Link>
            </Nav.Item>
            <Nav.Separator />
    
            <Nav.Item>
              <Nav.Link to="/back/python" active={isActive("/back")}>
                대여해주는 상품 
              </Nav.Link>
            </Nav.Item>
            <Nav.Separator />
    
            <Nav.Item>
              <Nav.Link to="/help" active={isActive("/help")}>
                대여받는 상품
              </Nav.Link>
            </Nav.Item>
          </Nav.List>
        </Nav>
      );
    }

export default function MyPage() {
    return (
        <div>
            <MyPageTop/>
            <div className="mypagebottom">
                <div className="bottom-leftnav"><Sidebar/></div>
                <div className='bottom-right'><Outlet/></div>
            </div>
            
        </div>
    )
}



