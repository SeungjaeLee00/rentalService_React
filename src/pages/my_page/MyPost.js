import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";


export default function MyPost(props) {
    const { mypost, setMyPost } = useOutletContext();
    const navigate = useNavigate();
    console.log(mypost);
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;

    //UTC -> 한국시간으로 바꿔주는 함수.
    function time(itemtime) {
        const kor = new Date(itemtime);
        kor.setHours(kor.getHours() + 9);
        return kor.toLocaleString();
    }

    function DeleteItem(id) {
        axios.post("/posts/" + id, {
            headers: { Authorization: `Bearer ${actoken}` },
            headers: { Auth: retoken }
        })
            .then(response => {
                console.log("삭제성공")
            })
            .catch(error => {
                console.log(error.response.data.result);
            })
    }

    return (
        <div className="MyPost-wrap">
            {mypost ? <>

             <div className="post-top">
                <p style={{ padding: "30px", fontSize: "25px", fontWeight: "bold" }}>게시물내역 조회</p>
            </div>

            {/* 게시물 생성 컴포넌트 */}
            <ItemTable mypost={mypost} time={time} navigate={navigate} DeleteItem={DeleteItem} />
            
            </> : null}
        </div>
    )
}



function ItemTable({ mypost, time, navigate, DeleteItem }) {
    return (
        <div className="post-bottom">
            <table style={{ width: "1200px" }}>
                <thead>
                    <tr>
                        <th >게시물 제목</th>
                        <th >작성일자</th>
                        <th >대여상태</th>
                        <th> 수정,삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {mypost.postList.map(a => (
                        <tr onClick={() => navigate("/itemmain/detail/" + a.id, { state: a.createdTime })}>
                            <td className="first-td">
                                <div>
                                    <img style={{ width: "100px", height: "100px" }} src={'https://sharingplatformbucket.s3.ap-northeast-2.amazonaws.com/post/' + a.link}></img>
                                </div>
                                <div className="first-td-info">
                                    <div style={{ fontSize: "20px", fontWeight: "bold", marginTop: "30px" }}>{a.title}</div>
                                </div>

                            </td>
                            <td>{time(a.createdTime)}</td>
                            <td>{"대여가능"}</td>
                            <td>
                                <button onClick={(e) => {
                                    //이벤트버블링 예방 stopProgration()함수사용
                                    e.stopPropagation();

                                    navigate('/itemmain/upload-item', { state: a.id });
                                    console.log("수정");
                                }}>수정</button>
                                <button style={{ color: "red" }} onClick={(e) => {
                                    //이벤트버블링 예방 stopProgration()함수사용
                                    e.stopPropagation();
                                    DeleteItem(a.id);
                                    console.log("삭제")
                                }}>삭제</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    )
}
