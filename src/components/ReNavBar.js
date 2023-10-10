import { Link, useNavigate } from 'react-router-dom'
import '../style/Navbar.css'
import { useAuth } from './AuthContext';
import { useState } from 'react';
import Category from './Category';



export default function ReNavBar() {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const [isLogin, setIsLogin] = useState(false);
    const handleLogout = () => {
        logout();
        window.location.replace("/");
        setIsLogin(prevState => !prevState)
    };

    const handleLogin = () => {
        window.location.replace("/loginpage")
        setIsLogin(prevState => !prevState)
    };

    const [search,setSearch] = useState();
 
    function handleSubmit(){
        // navigate("/search/"+search);
        navigate("/category/"+search);
    }
    
    return (
        <div className="header">
            <div className="header-top">
                <div className="top-left">
                    <a style={{ textDecoration: "none", fontSize: "45px", color: "black" }} href="/">Billim</a>
                </div>
                <div className="top-right">
                    {isAuthenticated ? <Link  onClick={handleLogout}>로그아웃</Link> :
                        <Link  onClick={handleLogin}>로그인/회원가입</Link>}

                    {/* <div className="mypage" >마이페이지</div> */}
                    {isAuthenticated? <Link to={"my-page"}>마이페이지</Link> : 
                        <Link  to={"/loginpage"}>마이페이지</Link>}
                    
                </div>
            </div>
            <div className="header-bottom">
                <div className="category"><Category /></div>
                <div className="searchbar">
                    <form  className='searchform' onSubmit={(e)=>{handleSubmit(e)}}>
                        <input type="text"
                         value={search}
                         className='search'
                         placeholder='어떤 상품을 찾으시나요?'
                          onChange={(e)=>{
                            setSearch(e.target.value);
                        }}></input>
                        <button className='searchbarbtn'>🔍</button>
                    </form>
                </div>
            </div>
        </div>
    )
}