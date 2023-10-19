import { useOutletContext } from 'react-router-dom';
import '../../style/MyReview.css'

function My_Review() {
    const { myreview } = useOutletContext();
    console.log(myreview);
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
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default My_Review;