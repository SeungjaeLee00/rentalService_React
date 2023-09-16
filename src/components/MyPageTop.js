import HorizonLine from './HorizonLine'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function MyPageTop(props)
{
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;

    const [myinfo, setMyInfo] = useState();


    useEffect(() => {
        //본인정보 조회 api
        axios.get('http://13.125.98.26:8080/members/my-profile', {
            headers: { Authorization: `Bearer ${actoken}` },
            headers: { Auth: retoken }
        })
            .then(response => {
                // console.log("본인정보조회성공");
                // console.log(response.data.result.data);
                setMyInfo(response.data.result.data);
            })
            .catch(error => {
                console.log(error.response.data.result);
            })
            

            // //내가 대여해주는(빌려주는) 거래 내역 조회 
            // axios.get('/trades/rend-item', {
            //     headers: { Authorization: `Bearer ${actoken}` },
            //     headers: { Auth: retoken }
            // })
            //     .then(response => {
            //         console.log("내가대여해주는거래조회성공");
            //         console.log(response.data.result.data);
            //         // setMyPost(response.data.result.data);
            //     })
            //     .catch(error => {
            //         console.log(error.response.data.result);
            //     })

            // //내가 대여하는(빌리는) 거래 내역 조회
            // axios.get('/trades/borrow-item', {
            //     headers: { Authorization: `Bearer ${actoken}` },
            //     headers: { Auth: retoken }
            // })
            //     .then(response => {
            //         console.log("내가대여하는거래조회성공");
            //         console.log(response.data.result.data);
            //         // setMyPost(response.data.result.data);
            //     })
            //     .catch(error => {
            //         console.log(error.response.data.result);
            //     })

        
    }, [])
    return (
        <div style={{borderBottom:"1px solid black", paddingBottom:"45px"}} className="content">
            {myinfo && props.mypost ? <div className="mypagetop">

                <div className="toptitle">
                    <h1>My Page</h1>
                    {/* Link태그에 props로 내가작성한 게시물 전송 */}
                    <Link to="/my-page/chats" state={{post:props.mypost}} style={{textDecoration:"none", fontSize:"30px"}}>✉</Link>
                </div>
                <div className="topinfo">
                    <div className="infoleft">
                        <div className="name">{myinfo.nickname}</div>
                        <Link to="my-change" style={{ textDecoration:"none", color:"gray", marginTop: "15px" }}>회원정보수정</Link>
                    </div>
                    <div className="inforight">
                        <div className="userpost">
                            <div style={{ fontSize: "30px" }} className="title">게시물</div>
                            <div style={{marginTop:"15px"}} className="quantity">{props.mypost.totalElements}개</div>
                        </div>
                        <div className="userrent">
                            <div style={{ fontSize: "30px" }} className="title">대여해주는 상품</div>
                            <div  style={{marginTop:"15px"}} className="quantity">5개</div>
                        </div>
                        <div className="userborrow">
                            <div style={{ fontSize: "30px" }} className="title">대여받는 상품</div>
                            <div style={{marginTop:"15px"}} className="quantity">5개</div>
                        </div>

                    </div>
                </div>
            </div> : null}

            
            
        </div>
    )
}