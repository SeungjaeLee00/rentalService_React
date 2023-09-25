import { useEffect, useHistory } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Edit_membership from '../pages/my_page/Edit_membership';

export default function MyPageTop(props) {
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
    const [myinfo, setMyInfo] = useState();

    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const fetchMyInfo = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/members/my-profile', {
                headers: { 'Authorization' : `Bearer ${actoken}`,
                'Auth' : retoken }
            })
            console.log("내정보조회성공");
            console.log(response);
            // localStorage.setItem('accessToken', response.headers.authorization);
            setMyInfo(response.data.result.data);
            setLoading(false);
        }
        catch (e) {
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
                    <h1>My Page</h1>
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
                            <div style={{ fontSize: "30px" }} className="title">게시물</div>

                            <div style={{ marginTop: "15px", fontSize: "20px" }} className="quantity">{props.mypost}개</div>
                        </div>
                        <div className="userrent">
                            <div style={{ fontSize: "30px" }} className="title">대여해주는 상품</div>
                            <div style={{ marginTop: "15px", fontSize: "20px" }} className="quantity">{props.myrent}개</div>
                        </div>
                        <div className="userborrow">
                            <div style={{ fontSize: "30px" }} className="title">대여받는 상품</div>
                            <div style={{ marginTop: "15px", fontSize: "20px" }} className="quantity">{props.myborrow}개</div>
                        </div>
                        <div className="userreview">
                            <div style={{ fontSize: "30px" }} className="title">리뷰</div>
                            <div style={{ marginTop: "15px", fontSize: "20px" }} className="quantity">{props.myreview}개</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}