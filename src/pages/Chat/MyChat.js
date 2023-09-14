import { useEffect, useState } from "react"
import "../../style/MessageList.css"
import axios from "axios"
import MessageList from "./MessageList";
import { Link, useLocation } from "react-router-dom";

export default function MyChat() {
    
    //state -> 내가 작성한 게시물 목록
    const {state} = useLocation();
    
    
    
    

    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;

    return (
        <div className="message-wrap">
            <div className="message-title">
                <Link to="/my-page/chats" style={{textDecoration:"none", fontSize:"30px", color:"black"}}>쪽지함</Link>
            </div>
            {/* MessageList 컴포넌트에 Link props로 받아온 데이터 전달(postList만) */}
            {state ? < MessageList mypost={state.post.postList}/> : null}
            
            
            
        </div>
    )
}