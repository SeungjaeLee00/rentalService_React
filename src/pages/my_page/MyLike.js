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
        axios.get('/api/posts/likes', {
            headers: { 'Authorization' : `Bearer ${actoken}`,
                'Auth' : retoken }
        })
            .then(response => {
                console.log("본인찜조회성공");
                console.log(response.data);
                setLikePost(response.data);
            })
            .catch(error => {
                if (error.response.data.code == '511') {
                    alert('로그인이 만료되어 로그인 페이지로 이동합니다');
                    window.location.replace('/loginpage');
                  }
                console.log(error);
            })
    }, [])


    if(!likepost) return null;

    return (
        <div className="MyLike-wrap">
            <div style={{ padding: "10px", borderBottom: "3px solid black" }} className="Like-top">
                <p style={{ fontSize: "30px" , padding:"20px"}}>찜</p>
            </div>
            <div className="Like-bottom">
                {likepost ? likepost.postList.map(a => (
                    <div key={a.id} className="Like-item" onClick={()=>{navigate("/itemmain/detail/"+a.id)}}>
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