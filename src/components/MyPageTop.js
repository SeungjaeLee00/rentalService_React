import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';

import { Link, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function MyPageTop(props) {
    const navigate = useNavigate();
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
    const [myinfo, setMyInfo] = useState();

    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const fetchMyInfo = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/members/my-profile', {
                headers: {
                    'Authorization': `Bearer ${actoken}`,
                    'Auth': retoken
                }
            })
            setMyInfo(response.data);
            setLoading(false);
        }
        catch (e) {
            if (e.response.data.code == '511') {
                alert('로그인이 만료되어 로그인 페이지로 이동합니다');
                window.location.replace('/loginpage');
            }
            console.log(e);
            setError(e);
        }
    }

    useEffect(() => {
        //본인정보 조회 api
        fetchMyInfo();
    }, [])

    if (loading) <div>로딩중..</div>
    if (error) <div>에러가 발생했습니다</div>
    if (!myinfo) return null;

    return (
        <div style={{ borderBottom: "1px solid black", paddingBottom: "45px" }} className="content">
            <div className="mypagetop">
                <div className="toptitle">
                    <h1 onClick={()=>{navigate("/my-page")}}>My Page</h1>
                    {/* Link태그에 props로 내가작성한 게시물 전송 */}

                    <div className='top-smallicon'>
                        <Link to="/my-page/chats" state={{ post: props.mypost }}
                            style={{ marginRight: "5px" }}>✉</Link>
                        <Link to="/my-page/reports"
                            style={{ borderLeft: "1px solid black", paddingLeft: "5px" }}>⚒︎</Link>
                    </div>
                </div>
                <div className="topinfo">
                    <div className="infoleft">
                        <div className="name">{myinfo.nickname}</div>

                        <Link to="/my-page/edit-membership" style={{ textDecoration: "none", color: "gray", marginTop: "15px" }}>회원정보수정</Link>

                    </div>
                    <div className="inforight">
                        <div className="userpost">
                            <UserDiv>게시물</UserDiv>
                            <QuantityDiv >{props.mypost}개</QuantityDiv>
                        </div>
                        <div className="userrent">
                            <UserDiv >대여해주는 상품</UserDiv>
                            <QuantityDiv >{props.myrent}개</QuantityDiv>
                        </div>
                        <div className="userborrow">
                            <UserDiv >대여받는 상품</UserDiv>
                            <QuantityDiv >{props.myborrow}개</QuantityDiv>
                        </div>
                        <div className="userreview">
                            <UserDiv>작성한 리뷰</UserDiv>
                            <QuantityDiv>{props.mywriterw}개</QuantityDiv>
                        </div>
                        <div className="userreview">
                            <UserDiv>받은 리뷰</UserDiv>
                            <QuantityDiv>{props.myreview}개</QuantityDiv>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
let QuantityDiv = styled.div`
font-size:1vw;
margin-top:15px;
margin-left:0.1vw;
`

let UserDiv = styled.div`
font-size:1.5vw;
font-weight:bold;
margin-left:0.1vw;
  `