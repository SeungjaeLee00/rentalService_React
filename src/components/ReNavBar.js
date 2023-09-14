import { Link, useNavigate } from 'react-router-dom'
import '../style/Navbar.css'
import { useAuth } from './AuthContext';
import { useState } from 'react';
import Category from './Category';
import { useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";


export default function ReNavBar() {
    const navigate = useNavigate();
    const [content,setContent] = useState();
    const { isAuthenticated, logout } = useAuth();
    const [isLogin, setIsLogin] = useState(false);
    // console.log(isAuthenticated);
    const handleLogout = () => {
        logout()
        window.location.replace("/");
        setIsLogin(prevState => !prevState)
    };

    const handleLogin = () => {
        window.location.replace("/loginpage")
        setIsLogin(prevState => !prevState)
    };


    return (
        <div className="header">
            <div className="header-top">
                <div className="top-left">
                    <Link style={{ textDecoration: "none", fontSize: "50px", color: "black" }} to="/">뭐든빌리개</Link>
                </div>
                <div className="top-right">
                    {isAuthenticated ? <Link style={{ textDecoration: "none" }} onClick={handleLogout}>로그아웃</Link> :
                        <Link style={{ textDecoration: "none" }} onClick={handleLogin}>로그인/회원가입</Link>}

                    {/* <div className="mypage" >마이페이지</div> */}
                    {isAuthenticated? <Link style={{textDecoration:"none", marginRight:"40px"}} to={"my-page"}>마이페이지</Link> : 
                        <Link style={{textDecoration:"none"}} to={"/loginpage"}>마이페이지</Link>}
                    
                </div>
            </div>
            <div className="header-bottom">
                <div className="category"><Category /></div>
                <div className="searchbar">
                    {/* https://mui.com/material-ui/react-text-field/#main-content 에서 가져옴*/}
                    {/* https://iagreebut.tistory.com/271 */}
                    {/* <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '70ch'},
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        
                            <TextField
                                id="standard-search"
                                label="어떤 상품을 찾으시나요?"
                                type="search"
                                variant="standard"
                                style={{backgroundColor: "rgb(248, 248, 248)", borderRadius:"5px"}}
                                value={content}
                                onChange={(e)=>{setContent(e.target.value)}}
                            />
                        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Box> */}



                </div>
            </div>
        </div>
    )
}