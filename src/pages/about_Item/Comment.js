import { useState } from 'react'
import '../../style/Comment.css'
import axios from 'axios';
import { useEffect } from 'react';

export default function Comment(props) {
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
    const [content, setContent] = useState();
    const [comment, setComment] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const data = {
        content: content
    }

    const FetchComment = async () => {
        try {
            setComment(null);
            setError(null);
            setLoading(true);
            const response = await axios.get(`/posts/${props.postid}/comments`);
            setComment(response.data.result.data);
            console.log(response);
        }
        catch (e) {
            console.log(e);
            setError(e);
        }
    }

    const CreateComment = () => {
        axios.post(`/posts/${props.postid}/comments`, data, {
            headers: { Authorization: `Bearer ${actoken}` },
            headers: { Auth: retoken }
        })
            .then(response => {
                console.log(response);
                //댓글생성완료후 페이지 새로고침
                window.location.replace('/itemmain/detail/' + props.postid)
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        FetchComment();
    }, [])

    if (loading) <div>로딩중..</div>
    if (error) <div>에러가 발생했습니다..</div>
    if (!comment) return null;

    return (
        <div className="comment-wrap">
            <div className="comment-top">
                <h4>{comment.length}개의댓글</h4>
                <textarea
                    placeholder='댓글을 작성하세요'
                    value={content}
                    onChange={(e) => { setContent(e.target.value) }}></textarea>
                <button onClick={CreateComment}>댓글작성</button>
            </div>
            <div className="comment-bottom">
                {comment.map(a => (
                    <div className="one-comment">
                        <div className="comment-info">
                            <div className="comment-name">{a.nickname}</div>
                            <div className="comment-time">{a.createdtime}</div>
                        </div>
                        <div className="comment-content">{a.content}</div>
                        <div className="comment-comment">
                            <span>+ 댓글달기</span>
                        </div>
                    </div>

                ))}

            </div>
        </div>
    )
}