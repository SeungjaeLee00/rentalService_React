import { useState } from 'react'
import '../../style/Comment.css'
import axios from 'axios';
import { useEffect } from 'react';
import Reply from './Reply';
import { useRef } from 'react';
import styled, { css } from "styled-components";

export default function Comment(props) {
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
    //사용자가 댓글에 입력하는곳
    const [content, setContent] = useState();
    const inputRef = useRef();
    const [temp, setTemp] = useState("white");
    //게시물에 대한 댓글들
    const [comment, setComment] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [openreply, setOpenReply] = useState([false, false, false, false]);

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

    const CommentToggle = () => {
        inputRef.current.focus();

    }

    useEffect(() => {
        FetchComment();
    }, [])

    if (loading) <div>로딩중..</div>
    if (error) <div>에러가 발생했습니다..</div>
    if (!comment) return null;

    const Div = styled.div`
    color:black;
    ${(p) =>
            p.active &&
            css`
        color:#ff8906;
        `}
    `;

    return (
        <div className="comment-wrap">
            <div className="comment-top">
                <h4>{comment.length}개의댓글</h4>
                <textarea
                    placeholder='댓글을 작성하세요'
                    ref={inputRef}
                    value={content}

                    onChange={(e) => { setContent(e.target.value) }}></textarea>
                <button onClick={CreateComment}>댓글작성</button>
            </div>
            <div className="comment-bottom">
                {comment.map((a, index) => {
                    return (
                        <Div active={openreply[index]} className="one-comment">
                            <div className="comment-info">
                                <div className="comment-name">{a.nickname}</div>
                                <div className="comment-time">{a.createdtime}</div>
                            </div>
                            <div className="comment-content">{a.content}</div>
                            <div className="comment-comment">
                                <span onClick={() => {
                                    //openreply를 false로 초기화를 시켜줘야한다.
                                    let temp=[...openreply];

                                    CommentToggle();
                                    let copy=[...openreply];
                                    copy[index]=!openreply[index];
                                    setOpenReply(copy);
                                    console.log(openreply);
                                }}>댓글달기</span>
                            </div>
                        </Div>
                    )
                })}

            </div>
        </div>
    )
}