import HorizonLine from './HorizonLine'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function MyPageTop(props) {
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;


    const [myinfo, setMyInfo] = useState();
    const [myrent, setMyRent] = useState();
    const [myborrow, setMyBorrow] = useState();

    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const fetchMyInfo = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/members/my-profile', {
                headers: { Authorization: `Bearer ${actoken}` },
                headers: { Auth: retoken }
            })
            console.log(response);
            setMyInfo(response.data.result.data);
            setLoading(false);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        //본인정보 조회 api
        fetchMyInfo();
    }, [])

    if (loading) <div>로딩중..</div>

    return (
        <div style={{ borderBottom: "1px solid black", paddingBottom: "45px" }} className="content">

            {myinfo ? <>
                <div className="mypagetop">
                    <div className="toptitle">
                        <h1>My Page</h1>
                        {/* Link태그에 props로 내가작성한 게시물 전송 */}
                        <Link to="/my-page/chats" state={{ post: props.mypost }} style={{ textDecoration: "none", fontSize: "30px" }}>✉</Link>
                    </div>
                    <div className="topinfo">
                        <div className="infoleft">
                            <div className="name">{myinfo.nickname}</div>
                            <Link to="my-change" style={{ textDecoration: "none", color: "gray", marginTop: "15px" }}>회원정보수정</Link>
                        </div>
                        <div className="inforight">
                            <div className="userpost">
                                <div style={{ fontSize: "30px" }} className="title">게시물</div>
                                <div style={{ marginTop: "15px" }} className="quantity">{props.mypost}개</div>
                            </div>
                            <div className="userrent">
                                <div style={{ fontSize: "30px" }} className="title">대여해주는 상품</div>
                                <div style={{ marginTop: "15px" }} className="quantity">{props.myrent}</div>
                            </div>
                            <div className="userborrow">
                                <div style={{ fontSize: "30px" }} className="title">대여받는 상품</div>
                                <div style={{ marginTop: "15px" }} className="quantity">{props.myborrow}</div>
                            </div>

                        </div>
                    </div>
                </div></> : null}

        </div>
    )
}