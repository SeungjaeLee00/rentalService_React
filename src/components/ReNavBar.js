import { Link, useNavigate } from 'react-router-dom'
import '../style/Navbar.css'
import { useAuth } from './AuthContext';
import { useState } from 'react';
import Category from './Category';
import styled from 'styled-components';
import { useEffect } from 'react';
import axios from 'axios';

export default function ReNavBar() {

    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
    const [nickname, setNickname] = useState(sessionStorage.getItem('nickname'));
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const [isLogin, setIsLogin] = useState(false);
    const [view, setView] = useState(false);
    const [searchfilter, setSearchFilter] = useState('제목');

    const fetchMyInfo = async () => {
        try {
            const response = await axios.get('/api/members/my-profile', {
                headers: {
                    'Authorization': `Bearer ${actoken}`,
                    'Auth': retoken
                }
            })
            //sessionstorage에 저장
            window.sessionStorage.setItem("nickname", response.data.nickname);
            setNickname(response.data.nickname);
        } catch (e) {
            if (e.response.data.code == '511') {
                console.log(e);
                alert('로그인이 만료되어 로그인 페이지로 이동합니다');
                window.location.replace('/loginpage');
            }
        }
    }

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
        fetchMyInfo();

    }, [])


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
                        <UlDiv>
                            <Ul onClick={() => { setView(!view) }}>{searchfilter}</Ul>
                            {view && <SearchDropdown  setSearchFilter={setSearchFilter} view={view} setView={setView} />}
                        </UlDiv>
                        <input type="text"
                            value={search}
                            className='search'
                            placeholder='어떤 상품을 찾으시나요?'
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}></input>
                        <button className='searchbarbtn'>🔍</button>
                    </form>
                </div>
                <div>
                    <ul className='linkwrap'>
                        <li>
                        {isAuthenticated ? <Link to="my-page">마이빌림</Link> : <Link to="/loginpage">마이빌림</Link>}
                        </li>
                        <li>
                        {isAuthenticated ? <Link to="/my-page/like">나의 찜</Link> : <Link to="/loginpage">나의 찜</Link>}
                        </li>
                        <li>
                        {isAuthenticated ? <Link to="/my-page/chats">쪽지함</Link> : <Link to="/loginpage">쪽지함</Link>}
                        </li>
                        </ul> 
                </div>
                {nickname == "admin" ? <div className='admin-link'><Link to="/admin">관리자 페이지</Link></div> : null}

            </div>
        </div>
    )
}

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




const UlDiv = styled.div`
display:flex;
flex-direction:column;
width:5vw;
font-size:0.9vw;
position:fixed;
`


const Ul = styled.ul`
border: 2px solid black;
border-right:none;
height:6vh;
padding-top:0.6vw;
padding-left:0.8vw;
margin-bottom:0px;
background-color: rgb(250, 250, 250);
cursor:pointer;
border-top-left-radius:1vw;
border-bottom-left-radius:1vw;
`

const Li = styled.li`
list-style-type:none;
margin-top:0.4vh;
padding-left:0.8vw;
cursor:pointer;

 &:hover{
    color:blue;
 }

`
const LiWrapper = styled.div`
border:1px solid black;
background-color: rgb(250, 250, 250);

`