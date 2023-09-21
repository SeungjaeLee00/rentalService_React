import '../../style/Comment.css'

export default function Comment() {
    return (
        <div className="comment-wrap">
            <div className="comment-top">
                <h4>2개의댓글</h4>
                <textarea></textarea>
                <button>댓글작성</button>
            </div>
            <div className="comment-bottom">
                <div className="one-comment">
                    <div className="comment-info">
                        <div className="comment-name">최명수</div>
                        <div className="comment-time">2023.09.21 오후05:07</div>
                    </div>
                    <div className="comment-content">상품 다른 사진좀 볼 수 있을까요?</div>
                </div>
            </div>
        </div>
    )
}