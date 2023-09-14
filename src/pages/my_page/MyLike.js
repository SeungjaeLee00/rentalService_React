import axios from "axios";
import { useState } from "react";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function MyLike() {
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
    const [likepost, setLikePost] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('/posts/likes', {
            headers: { Authorization: `Bearer ${actoken}` },
            headers: { Auth: retoken }
        })
            .then(response => {
                console.log("본인찜조회성공");
                console.log(response.data.result.data);
                setLikePost(response.data.result.data);
            })
            .catch(error => {
                console.log(error.response.data.result);
            })
    }, [])

    return (
        <div className="MyLike-wrap">
            <div style={{ padding: "10px", borderBottom: "3px solid black", width: "1720px" }} className="Like-top">
                <p style={{ fontSize: "30px" , padding:"20px"}}>찜</p>
            </div>
            <div className="Like-bottom">
                {likepost ? likepost.postList.map(a => (
                    <div className="Like-item" onClick={()=>{navigate("/itemmain/detail/"+a.id)}}>
                        <div className="item-img">
                            <img src={'https://sharingplatformbucket.s3.ap-northeast-2.amazonaws.com/post/' + a.link} style={{ width: "200px", height: "200px" }}></img>
                        </div>
                        <div className="item-info">
                            <div style={{ fontSize: "20px", fontWeight: "bold", }}>{a.title}</div>
                            <div style={{ marginTop: "10px" }}>{a.createdTime.replace("T", " ")}</div>
                        </div>


                    </div>

                )) : null}
            </div>
        </div>
    )
}