import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import HorizonLine from '../../components/HorizonLine';
import '../../style/Profile.css'

function Profile() {
    const { state } = useLocation();
    const [userData, setUserData] = useState(null);
    const [userReview, setUserReview] = useState(null);
    const [showPosts, setShowPosts] = useState(true);
    const [showReviews, setShowReviews] = useState(false);
    const [isActive1, setIsActive1] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;

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

    useEffect(() => {
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
                                            <div className = "PostDetail">
                                                <ul>
                                                    {userData.posts.map((post, index) => (
                                                        <li key={index} >
                                                            {post.title}
                                                            {post.createdTime}
                                                            <HorizonLine />
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
                                            <div className = "ReivewDetail">
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
