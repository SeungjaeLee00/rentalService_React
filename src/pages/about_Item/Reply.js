export default function Reply() {
    return (
        <div className="Reply-wrap">
            <textarea placeholder="댓글을 입력하세요"></textarea>
            <div className="Reply-btn">
                <button className="Reply-cancle">취소</button>
                <button className="Reply-Create">댓글작성</button>
            </div>
        </div>
    )
}