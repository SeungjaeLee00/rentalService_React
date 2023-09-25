import { useState } from 'react'
import '../../style/Comment.css'
import axios from 'axios';
import { useEffect } from 'react';
import { useRef } from 'react';
import styled, { css } from "styled-components";
import SetKST from '../../utils/SetKST';

export default function Comment(props) {
    //nickname = 상품 글쓴이의 nickname
    const nickname = props.nickname;
    //usernickname = 로그인한 유저의 nickname
    const usernickname = window.sessionStorage.getItem("nickname");
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

    //해당댓글의 답글달기 클릭시 선택된듯한 효과주기 위한 state
    const [selectreply, setSelectReply] = useState([]);
    //해당댓글의 대댓글보기 위한 state 
    const [openreply, setOpenReply] = useState([]);
    //그냥 댓글인지, 댓글에대한 댓글(대댓글)인지 구분하기 위한 state 
    const [checkreply, setCheckReply] = useState(false);
    //api를 사용할때 보내는 댓글의 id
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
            //댓글개수만큼 대댓글상태(댓글이 5개면 selectreply에 5개의 false가 들어감) -> 어떤댓글에대한
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
                headers: { 'Authorization' : `Bearer ${actoken}`,
                'Auth' : retoken }
            }).then(response => {
                console.log(response);
                //댓글생성완료후 페이지 새로고침
                window.location.replace('/itemmain/detail/' + props.postid)
            })
                .catch(error => {
                    if (error.response.data.code == '511') {
                        alert('로그인이 만료되어 로그인 페이지로 이동합니다');
                        window.location.replace('/loginpage');
                    }
                    console.log(error.response.data.result);
                })
        }
        //그냥댓글임
        else {
            const data = {
                content: content
            }

            axios.post(`/posts/${props.postid}/comments`, data, {
                headers: { 'Authorization' : `Bearer ${actoken}`,
                'Auth' : retoken }
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

    const CreateCommentBtn = (commentId, index) => {
        //대댓글인지 확인하기 위한 state
        setCheckReply(true);
        //댓글 id 
        setReplyId(commentId);
        //selectreply를 false로 초기화를 시켜줘야한다.(한개만선택되어야하기때문)
        let temp = [...selectreply];
        temp.map((a, index) => {
            temp[index] = false;
        })
        setSelectReply(temp);
        //focus를 input으로 
        inputRef.current.focus();
        //클릭한 div만 반대로되게.
        let copy = [...temp];
        copy[index] = !selectreply[index];
        setSelectReply(copy);
    }
    //댓글삭제 api 
    const DeleteComment = (id) => {
        axios.delete('/comments/' + id, {
            headers: { 'Authorization' : `Bearer ${actoken}`,
                'Auth' : retoken }
        }).then(response => {
            console.log(response);
            window.location.replace('/itemmain/detail/' + props.postid);
        }).catch(error => {
            console.log(error.response.data.result);
        })
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
               background:rgb(250, 246, 241);
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
                        <Div key={index} active={selectreply[index]} className="one-comment">
                            <div className="onecomment-info">
                                <div className='onecomment-nametime'>
                                    <div className={`comment-${nickname == a.nickname ? "writername" : "name"}`}>{a.nickname}</div>
                                    <div className="comment-time">{SetKST(a.createdTime)}</div>
                                </div>
                                <div className='onecomment-btn'>
                                    <button onClick={() => { CreateCommentBtn(a.commentId, index) }}>답글 달기</button>
                                    {/* 현재 접속한 유저가 쓴 댓글이면 */}
                                    {usernickname == a.nickname ? <button className='btn-delete' onClick={() => { DeleteComment(a.commentId) }}>삭제</button> : null}
                                </div>

                            </div>
                            <div className="onecomment-content">{a.content}</div>
                            <div className="onecomment-bottom">
                                {a.children.length > 0 ?
                                    <button onClick={() => {
                                        //해당댓글에 대댓글 보여주기 위해
                                        let copy = [...openreply];
                                        copy[index] = !openreply[index];
                                        setOpenReply(copy);
                                    }}>+{a.children.length}개의 답글</button>
                                    : <button onClick={() => {
                                        let id = a.commentId;
                                        CreateCommentBtn(id, index);
                                    }}>답글 달기</button>}

                            </div>
                            {/* 대댓글 */}
                            <div className='reply'>{openreply[index] ? a.children.map((reply, replyindex) => {
                                return (
                                    <div className='reply-one-wrap'>
                                        <div className='reply-info'>
                                            <div>
                                                <div className={`comment-${nickname == reply.nickname ? "writername" : "name"}`}>{reply.nickname}</div>
                                                <div className='comment-time'>{SetKST(reply.createdTime)}</div>
                                            </div>
                                            {/* 현재 접속한 유저가 쓴 댓글이면 */}
                                            {usernickname == reply.nickname ? <button className='btn-delete' onClick={() => { DeleteComment(reply.commentId) }}>삭제</button> : null}

                                        </div>
                                        <div className='comment-comment' >{reply.content}</div>

                                    </div>
                                )
                            }) : null}</div>
                        </Div>
                    )
                })}

            </div>
        </div>
    )
}