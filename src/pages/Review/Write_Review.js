import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import '../../style/WriteReview.css';

// 거래에 대한 리뷰 작성
function Write_Review() {
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
    const { state } = useLocation();
    console.log(state);
    const [post, setPost] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [review, setReview] = useState();

    const fetchPost = async () => {
        try {
            setPost(null);
            setError(null);

            setLoading(true);
            const response = await axios.get('/api/posts/' + state.postid);
            setPost(response.data);
            console.log(response);
        } catch (e) {
            setError(e);
            console.log(e);
        }
        setLoading(false);
    }
    useEffect(() => {
        fetchPost();
    }, [])

    //리뷰작성
    const CreateReview = () => {
        const data = {
            content: review
        }
        axios.post('/api/reviews/' + state.tradeid, data, {
            headers: { 'Authorization' : `Bearer ${actoken}`,
                'Auth' : retoken }
        }).then(response => {
            console.log(response);
        }).catch(e => {
            if (e.response.data.code == '511') {
                alert('로그인이 만료되어 로그인 페이지로 이동합니다');
                window.location.replace('/loginpage');
              }
            if(e.response.data.code=='409'){
                alert('이미 해당거래에 대한 리뷰가 존재합니다');
            }
            console.log(e);
        })
    }

    if (loading) <div>로딩중...</div>
    if (error) <div>에러발생..</div>
    if (!post) return null;

    //리뷰작성 api 
    return (
        <div className="Review-wrap">
            <div className="Review-top">
                <div className="top-left">
                    <img src={'https://sharingplatformbucket.s3.ap-northeast-2.amazonaws.com/post/' + post.imageName}
                        style={{ width: "250px", height: "250px" }} />
                </div>
                <div className="top-content">
                    <div className="title">제목 : {post.title}</div>
                    <div className="price">가격 : {post.item.price}원</div>
                    <div className="right-bottom"> {post.content} </div>
                </div>
            </div>
            <div className="Review-bottom">
                <div className="bottom-top">
                    <h3>내용</h3>
                </div>
                <div className="bottom-content">
                    <textarea value={review} onChange={(e) => { setReview(e.target.value) }} placeholder="리뷰를 작성해주세요"></textarea>
                </div>
                <button onClick={() => { CreateReview() }}>등록</button>
            </div>
        </div>
    )
}

export default Write_Review;