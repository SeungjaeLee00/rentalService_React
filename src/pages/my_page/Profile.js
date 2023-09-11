import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import HorizonLine from '../../components/HorizonLine';
// import '../../style/'

function Profile() {
    const { state } = useLocation();
    const [userData, setUserData] = useState(null);
    const [userReview, setUserReview] = useState(null);
    const [showPosts, setShowPosts] = useState(true);
    const [showReviews, setShowReviews] = useState(false);
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;

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

    const handleShowPosts = () => {
        setShowPosts(true);
        setShowReviews(false);
    };

    const handleShowReviews = () => {
        setShowPosts(false);
        setShowReviews(true);
    };

    return (
        <>
            {userData ? (
                <div className='AboutProfile'>
                    <h1>프로필 페이지</h1>
                    <div className='Profile-detail'>
                        <div className='Name-intro'>
                            <p>닉네임: {userData.nickname}</p>
                            <p>소개: {userData.introduce}</p>
                        </div>
                        <div className='Post-Review'>
                            <button className="" onClick={handleShowPosts}>게시물 보기</button>
                            <button onClick={handleShowReviews}>거래 후기 보기</button>
                            <div className='LookPosts'>

                                {showPosts ? (
                                    userData.posts.length > 0 ? (
                                        <div>
                                            {/* <h2>게시물</h2> */}
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
                                        <p>게시물이 없습니다.</p>
                                    )
                                ) : null}
                            </div>
                            <div className='LookReviews'>
                                {showReviews ? (
                                    userReview && userReview.reviewList && userReview.reviewList.length > 0 ? (
                                        <div>

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
                                        <p>리뷰가 없습니다.</p>
                                    )
                                ) : null}
                            </div>
                        </div>
                    </div>

                </div>
            ) : (
                <p>로딩 중...</p>
            )}

        </>
    );
}

export default Profile;
