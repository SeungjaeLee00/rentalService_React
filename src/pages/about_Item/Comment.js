import { useState } from 'react'
import '../../style/Comment.css'
import axios from 'axios';
import { useEffect } from 'react';
import Reply from './Reply';
import { useRef } from 'react';
import styled, { css } from "styled-components";
import SetKST from '../../utils/SetKST';

export default function Comment(props) {
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
    //사용자가 댓글에 입력하는곳
    const [content, setContent] = useState();
    const inputRef = useRef();
    const [temp, setTemp] = useState();
    //게시물에 대한 댓글들
    const [comment, setComment] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const [selectreply, setSelectReply] = useState([]);
    const [openreply, setOpenReply] = useState([]);
    const [checkreply, setCheckReply] = useState(false);
    const [replyid, setReplyId] = useState();



    //댓글 불러오는 api 함수
    const FetchComment = async () => {
        try {
            setComment(null);
            setError(null);
            setLoading(true);
            const response = await axios.get(`/posts/${props.postid}/comments`);
            setComment(response.data.result.data);
            console.log(response.data.result.data);
            //댓글개수만큼 대댓글상태(댓글이 5개면 openreply에 5개의 false가 들어감) -> 어떤댓글에대한
            //대댓글인지 확인하기 위해
            let copy = [];
            response.data.result.data.map((a, index) => {
                copy.push(false);
            })
            setSelectReply(copy);
            setCheckReply(copy);
        }
        catch (e) {
            console.log(e);
            setError(e);
        }
    }
    //댓글생성 api 함수.
    const CreateComment = () => {
        console.log(checkreply);
        // 대댓글임
        if (checkreply == true) {
            const data = {
                content: content,
                parentCommentId: replyid
            }
            console.log(data);
            axios.post(`/posts/${props.postid}/comments`, data, {
                headers: { Authorization: `Bearer ${actoken}` },
                headers: { Auth: retoken }
            }).then(response => {
                console.log(response);
            })
                .catch(error => {
                    console.log(error);
                })
        }
        //그냥댓글임
        else {
            const data = {
                content: content
            }

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
                    console.log(error.response.data.result);
                })

        }
        setCheckReply(false);
    }


    const CommentToggle = () => {
        inputRef.current.focus();
    }
    const CreateCommentBtn=(commentId, index)=>{
         //대댓글인지 확인하기 위한 state
         setCheckReply(true);
         //대댓글 id 
         setReplyId(commentId);
         //selectreply를 false로 초기화를 시켜줘야한다.(한개만선택되어야하기때문)
         let temp = [...selectreply];
         temp.map((a, index) => {
             temp[index] = false;
         })
         setSelectReply(temp);
         //focus를 input으로 
         CommentToggle();
         //클릭한 div만 반대로되게.
         let copy = [...temp];
         copy[index] = !selectreply[index];
         setSelectReply(copy);
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
               background:rgb(230, 230, 230);
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
                        <Div active={selectreply[index]} className="one-comment">
                            <div className="comment-info">
                                <div className="comment-name">{a.nickname}</div>
                                <div className="comment-time">{SetKST(a.createdTime)}</div>
                            </div>
                            <div className="comment-content">{a.content}</div>
                            <div className="comment-comment">
                                {a.children.length > 0 ?
                                    <button onClick={() => {
                                        let copy = [...checkreply];
                                        copy[index] = !checkreply[index];
                                        setCheckReply(copy);
                                    }}>{a.children.length}개의 답글</button>
                                    : <button onClick={() => {
                                        let id= a.commentId;
                                        CreateCommentBtn(id,index);
                                    }}>답글 달기</button>}
                               
                            </div>
                            <div className='reply'>{checkreply[index] ? a.children.map((reply, replyindex) => {
                                return (
                                    <div className='reply-one-wrap'>
                                        <div className='reply-info'>
                                            <div className='comment-name'>{reply.nickname}</div>
                                            <div className='comment-time'>{SetKST(reply.createdTime)}</div>
                                            <div className='comment-comment' >{reply.content}</div>
                                            <button>답글 달기</button>
                                        </div>
                                        <button className='reply-comment-btn' onClick={()=>{
                                            let id = a.commentId;
                                            CreateCommentBtn(id,index)
                                        }}>답글 작성하기</button>
                                        
                                    </div>


                                )
                            })

                                : null}</div>
                        </Div>
                    )
                })}

            </div>
        </div>
    )
}