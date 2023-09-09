import { Link } from 'react-router-dom'
import '../style/Navbar.css'
import { useAuth } from './AuthContext';
import { useState } from 'react';
import Category from './Category';
import { useEffect } from 'react';
import axios from 'axios';


export default function ReNavBar()
{
    const { isAuthenticated, logout } = useAuth();
    const [isLogin, setIsLogin] = useState(false);
    console.log(isAuthenticated);  
    const handleLogout = () => {
        logout()
        window.location.replace("/");
        setIsLogin(prevState => !prevState)
      };
      
      const handleLogin = () => {
        window.location.replace("/loginpage")
        setIsLogin(prevState => !prevState)
      };
      

    return(
        <div className="header">
            <div className="header-top">
                <div className="top-left">
                    <Link style={{textDecoration:"none", fontSize:"50px", color:"black"}} to="/">뭐든빌리개</Link>
                </div>
                <div className="top-right">
                    {isAuthenticated ? <Link style={{textDecoration:"none"}} onClick={handleLogout}>로그아웃</Link> : 
                                       <Link style={{textDecoration:"none"}} onClick={handleLogin}>로그인/회원가입</Link>}
                    
                    <div className="mypage">마이페이지</div>
                </div>
            </div>
            <div className="header-bottom">
                <div className="category"><Category/></div>
                <div className="searchbar">검색바</div>
            </div>
        </div>
    )
}