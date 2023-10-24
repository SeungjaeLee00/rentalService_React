import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import '../../style/MyReview.css'

function My_Review() {
    const { myreview } = useOutletContext();
    console.log(myreview);

    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;

    // 리뷰 삭제
    const Delete_Review = (reviewId) => {
        try {
            const response = axios.delete(`/api/reviews/${reviewId}`, {
                headers: { 'Authorization' : `Bearer ${actoken}`,
                            'Auth' : retoken }
            });
            if (response.status == 200) {
                console.log('리뷰 삭제 성공:', response);
                alert('리뷰가 삭제되었습니다');
            } else {
                console.error('리뷰 응답 오류:', response.error);
            }
        } catch (error) {
            console.error('API 요청 오류:', error);
        }
    }
    
    return (
        <div className="review-wrap">
            <div className="review-top">
                <h2>받은 리뷰</h2>
            </div>
            <div className="review-btm">
                {myreview.map((item, index) => {
                    return (
                        <div className="onereview">
                            <div className="reviewtitle">{item.writer}</div>
                            <div className="reviewcontent">{item.content}</div>
                            <button className='delete-review'
                                onClick={() => Delete_Review(item.reviewId)}>삭제하기</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default My_Review;