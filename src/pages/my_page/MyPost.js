import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";


export default function MyPost(props) {
    const { mypost, setMyPost } = useOutletContext();
    const navigate = useNavigate();
    console.log(mypost);

    return (
        <div className="MyPost-wrap">
            {mypost ? <> <div className="post-top">
                <p style={{ padding: "10px", fontSize: "25px" }}>게시물내역 조회</p>
            </div>

                <div className="post-bottom">
                    <table style={{ width: "1500px", marginTop: "20px" }}>
                        <thead>
                            <tr>
                                <th >게시물 정보</th>
                                <th >게시물 작성일자</th>
                                <th >게시물 대여상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mypost.postList.map(a => (
                                <tr onClick={() => navigate("/itemmain/detail/" + a.id)}>
                                    <td className="first-td">
                                        <div>
                                            <img style={{ width: "100px", height: "100px" }} src={'https://sharingplatformbucket.s3.ap-northeast-2.amazonaws.com/post/' + a.link}></img>
                                        </div>
                                        <div className="first-td-info">
                                            <div style={{ fontSize: "20px", fontWeight: "bold", marginTop:"30px" }}>{a.title}</div>
                                        </div>

                                    </td>
                                    <td>{a.createdTime.replace("T", " ")}</td>
                                    <td>{"대여가능"}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                </div> </> : null}


        </div>
    )
}