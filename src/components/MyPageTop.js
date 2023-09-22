import HorizonLine from './HorizonLine'
import { useEffect, useHistory } from 'react'
import axios from 'axios'
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Edit_membership from '../pages/my_page/Edit_membership';

export default function MyPageTop(props) {
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
    const [myinfo, setMyInfo] = useState();
    // const [password, setPassword] = useState('');
    // const history = useHistory();

    // const handleConfirmPassword = async () => {
    //     try {
    //         const actoken = localStorage.accessToken;
    //         const retoken = localStorage.refreshToken;
    //         const response = await axios.post('http://13.125.98.26:8080/auth/verify-password', {
    //             password,
    //         }, {
    //             headers: { Authorization: `Bearer ${actoken}`, Auth: retoken },
    //         });

    //         if (response.data.success) {
    //             history.push('/my-page/edit-membership');
    //         } else {
    //             alert('비밀번호가 일치하지 않습니다.');
    //         }
    //     } catch (error) {
    //         console.error('비밀번호 확인 오류:', error);

    //         if (error.response && error.response.status === 401) {
    //             alert('로그인 세션이 만료되었습니다. 다시 로그인해 주세요.');
    //             history.push('/login');
    //         } else {
    //             alert('서버 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    //         }
    //     }
    // };



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
        <div style={{ borderBottom: "1px solid black", paddingBottom: "45px" }} className="content">
            {myinfo && props.mypost ? <div className="mypagetop">

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
                            <div style={{ marginTop: "15px" }} className="quantity">{props.mypost.totalElements}개</div>
                        </div>
                        <div className="userrent">
                            <div style={{ fontSize: "30px" }} className="title">대여해주는 상품</div>
                            <div style={{ marginTop: "15px" }} className="quantity">5개</div>
                        </div>
                        <div className="userborrow">
                            <div style={{ fontSize: "30px" }} className="title">대여받는 상품</div>
                            <div style={{ marginTop: "15px" }} className="quantity">5개</div>
                        </div>

                    </div>
                </div>
            </div> : null}



        </div>
    )
}