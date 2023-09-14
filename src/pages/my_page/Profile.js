import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import HorizonLine from '../../components/HorizonLine';
import '../../style/Profile.css'
import { useAuth } from '../../components/AuthContext';
import Do_Report from '../Report/Do_Report';
import Posts from '../about_Item/Posts';

function Profile() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [userReview, setUserReview] = useState(null);
    const [showPosts, setShowPosts] = useState(true);
    const [showReviews, setShowReviews] = useState(false);
    const [isActive1, setIsActive1] = useState(true);
    const [isActive2, setIsActive2] = useState(false);
    const [showReportPopup, setshowReportPopup] = useState(false);


    const { isAuthenticated } = useAuth();
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;

    const openReportModal = () => {
        setshowReportPopup(true);
    };
    const closeReportnModal = () => {
        setshowReportPopup(false);
    };

    const handleShowPosts = () => {
        setShowPosts(true);
        setShowReviews(false);
        setIsActive1(!isActive1);
        setIsActive2(false);
    };

    const handleShowReviews = () => {
        setShowPosts(false);
        setShowReviews(true);
        setIsActive2(!isActive2);
        setIsActive1(false);
    };


    const handlePostClick = (selectedPost) => {
        <Posts selectedPost={selectedPost} />
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/loginpage');
            return;
        }
        if (isAuthenticated) {
        const apiUrl = "http://13.125.98.26:8080/members/" + state;
        axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${actoken}`,
                Auth: retoken
            },
        })
            .then(response => {
                console.log('회원 정보 불러오기 성공:', response.data);
                setUserData(response.data.result.data);
            })
            .catch(error => {
                console.error('API 요청 오류:', error);
            });
        viewReview(state);
        }
    }, [state]);

    const viewReview = async (state) => {
        try {
            const response = await axios.get("http://13.125.98.26:8080/reviews?nickname=" + state, {
                headers: {
                    Authorization: `Bearer ${actoken}`,
                    Auth: retoken
                },
            })
            if (response.data.success) {
                console.log('리뷰 불러오기 성공:', response.data);
                setUserReview(response.data.result.data.reviewList);
            } else {
                console.error('서버 응답 오류:', response.data.error);
            }
        } catch (error) {
            console.error('API 요청 오류:', error);
        }
    };

    return (
        <div className='AboutProfile'>
            {userData ? (
                <div>
                    <div className='Profile-detail'>
                        <div className='Name-intro'>
                            {/* 사진 넣을 거면 여기에 넣으면 됨. */}
                            <p className="nickname" >{userData.nickname}</p>
                            <p className="intro">{userData.introduce}</p>
                            <div className='report'>
                                <a className="report-detail" onClick={openReportModal}> ⚠️신고하기 </a>
                            </div>
                            <Do_Report open={showReportPopup} close={closeReportnModal} ></Do_Report>



                        </div>
                        <div className='Post-Review'>
                            <div className='Category'>
                                <div className='Category-detail'>
                                    <a className={isActive1 ? 'LookPost' : 'default1'}
                                        onClick={handleShowPosts}>게시물 보기</a>
                                    <a className={isActive2 ? 'LookReview' : 'default2'}
                                        onClick={handleShowReviews}>거래 후기 보기</a>
                                </div>
                            </div>
                            <div className='Looks'>
                                <div className={isActive1 ? 'LookPosts' : 'nodisplay'}>
                                    <div className='Post'>게시물</div>
                                    {showPosts ? (
                                        userData.posts.length > 0 ? (
                                            <div className="PostDetail">
                                                <ul className='PostList'>
                                                    {userData.posts.map((post, index) => (
                                                        <li key={index} className='single-post'>
                                                            <a className='product'
                                                                onClick={() => handlePostClick(post)}>
                                                                <img className="productImg" width="194" height="194"
                                                                    src={`https://sharingplatformbucket.s3.ap-northeast-2.amazonaws.com/post/${post.link}`} />
                                                                <div className='productdetail'>
                                                                    <div className='productName'>{post.title}</div>
                                                                    <div className="productPrice">
                                                                        <div className="productPrice-detail">{post.itemPrice}</div>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <p className='noPost'>등록된 상품이 없습니다.</p>
                                        )
                                    ) : null}
                                </div>

                                <div className={isActive2 ? 'LookReviews' : 'nodisplay'}>
                                    <div className="Review">상품 후기</div>
                                    {showReviews ? (
                                        userReview && userReview.reviewList && userReview.reviewList.length > 0 ? (
                                            <div className="ReivewDetail">
                                                <ul>
                                                    {userReview.reviewList.map((review, index) => (
                                                        <li key={index}>
                                                            <p>작성자: {review.writer}</p>
                                                            <p>내용: {review.content}</p>
                                                            <HorizonLine />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : (
                                            <p className='noReview'>후기가 없습니다.</p>
                                        )
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>로딩 중...</p>
            )}

        </div>
    );
}

export default Profile;
