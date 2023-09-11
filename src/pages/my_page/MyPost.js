import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";


export default function MyPost(props)
{
    const {mypost, setMyPost} = useOutletContext();
    console.log(mypost);    
    return(
        <div className="MyPost-wrap">
            { mypost ? <div> <div className="post-top">
                <p style={{fontSize:"25px"}}>게시물내역 조회</p>
            </div>
            <hr></hr>
            <div className="post-bottom">  
                <table>
                  <thead>
                    <tr>
                        <th >게시물 정보</th>
                        <th >게시물 작성일자</th>
                        <th >게시물 대여상태</th>
                    </tr>
                  </thead>
                  <tbody>
                  {mypost.postList.map(a=>(
                            <tr>
                                <td>{a.title}</td>
                                <td>{a.createdTime}</td>
                                <td>{"대여가능"}</td>
                            </tr>
                        ))}
                    
                  </tbody>
                </table> 
                
            </div> </div>: null}
            
            
        </div>
    )
}