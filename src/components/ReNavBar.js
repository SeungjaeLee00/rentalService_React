import { Link, useLocation, useNavigate } from 'react-router-dom'
import '../style/Navbar.css'
import { useAuth } from './AuthContext';
import { useState } from 'react';
import Category from './Category';
import styled from 'styled-components';
import { useEffect } from 'react';
import useReactQueryHeader from '../hooks/useReactQueryHeader';
import {  AiOutlineSearch } from "react-icons/ai";

export default function ReNavBar() {

   
    const [nickname, setNickname] = useState(sessionStorage.getItem('nickname'));
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const [isLogin, setIsLogin] = useState(false);
    const [view, setView] = useState(false);
    const [searchfilter, setSearchFilter] = useState('제목');
    const location = useLocation();
    

    const myinfo2 = useReactQueryHeader('/api/members/my-profile');
    //console.log(myinfo2);
    
    
    const handleLogout = () => {
        logout();
        sessionStorage.setItem('nickname', null);
        window.location.replace("/");
        setIsLogin(prevState => !prevState)
    };

    const handleLogin = () => {
        window.location.replace("/loginpage")
        setIsLogin(prevState => !prevState)
    };

    const [search, setSearch] = useState();

    function handleSubmit() {
        let temp = search;
        if (searchfilter == '제목') temp = 'title' + ' ' + temp;
        else temp = 'categoryName' + ' ' + temp;
        navigate("/category/" + temp);
    }

    useEffect(() => {
        if(myinfo2.data){
            setNickname(myinfo2.data.nickname);
            window.sessionStorage.setItem("nickname", myinfo2.data.nickname);
        }
        if(myinfo2.error){
            if(myinfo2.error.response.data.code==511)
             {
                 if(location.pathname!="/loginpage")
                 {
                     alert('로그인이 만료되어 로그인 페이지로 이동합니다');
                  }
                 window.location.replace('/loginpage');
        }
        }
    }, [myinfo2])
    

    return (
        <div className="header">
            <div className="header-top">
                <div className="top-left">
                    <Link to="/">Billim</Link>
                </div>
                <div className="top-right">
                    {isAuthenticated ? <Link onClick={handleLogout}>로그아웃</Link> :
                        <Link onClick={handleLogin}>로그인</Link>}
                    <Link to="/signup">회원가입</Link>
                </div>
            </div>
            <div className="header-bottom">
                <div className="category"><Category /></div>
                <div className="searchbar">
                    <form className='searchform' onSubmit={(e) => { handleSubmit(e) }}>
                        <input type="text"
                            value={search}
                            className='search'
                            placeholder='어떤 상품을 찾으시나요?'
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}></input>
                        <button className='searchbarbtn'>< AiOutlineSearch/></button>
                    </form>
                </div>
                <div className='ul-wrap'>
                    {nickname!="admin"?<ul className='linkwrap'>
                        <li>
                        {isAuthenticated ? <Link to="my-page">마이빌림</Link> : <Link to="/loginpage">마이빌림</Link>}
                        </li>
                        <li>
                        {isAuthenticated ? <Link to="/my-page/like">나의 찜</Link> : <Link to="/loginpage">나의 찜</Link>}
                        </li>
                        <li>
                        {isAuthenticated ? <Link to="/my-page/chats">쪽지함</Link> : <Link to="/loginpage">쪽지함</Link>}
                        </li>
                        </ul> :  <div className='admin-link'><Link to="/admin">관리자 페이지</Link></div>}
                </div>
            </div>
            <div className='mobile-searchbar'>
            <form className='searchform' onSubmit={(e) => { handleSubmit(e) }}>
                     <input type="text"
                        className='mobile-search'
                        value={search}
                        placeholder='어떤 상품을 찾으시나요?'
                        onChange={(e) => {
                        setSearch(e.target.value);
                    }}></input>
                    <button className='mobile-searchbtn'>< AiOutlineSearch/></button>
            </form>
                </div>
        </div>
    )
}
/*
function SearchDropdown({ setSearchFilter, view, setView }) {
    return (
        <>
            <LiWrapper>
                <Li onClick={() => { setSearchFilter('제목'); setView(!view) }}>제목</Li>
                <Li onClick={() => { setSearchFilter('카테고리'); setView(!view) }}>카테고리</Li>
            </LiWrapper>

        </>
    )
}
*/
