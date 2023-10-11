  import axios from "axios";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import SetKST from "../../utils/SetKST";

export default function MyPost(props) {
    const { mypost, setMyPost } = useOutletContext();
    const navigate = useNavigate();
    //console.log(mypost);
    
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;

    function DeleteItem(id) {
        console.log(id);
        axios.delete("/api/posts/" + id, {
            headers: { 'Authorization' : `Bearer ${actoken}`,
                'Auth' : retoken }
        })
            .then(response => {
                console.log("삭제성공")
                if(window.confirm("정말 삭제 하시겠습니까?"))
                {
                    window.location.replace('/my-page/post');
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="MyPost-wrap">
            {mypost ? <>
             <div className="post-top">
                <p style={{ padding: "30px", fontSize: "25px", fontWeight: "bold" }}>게시물내역 조회</p>
            </div>

            {/* 게시물 생성 컴포넌트 */}
            <ItemTable mypost={mypost}  navigate={navigate} DeleteItem={DeleteItem} />
            </> : null}
        </div>
    )
}

function ItemTable({ mypost, navigate, DeleteItem }) {
    return (
        <div className="post-bottom">
            <table style={{ width:"100%",borderRight:"1px solid black"}}>
                <thead>
                    <tr>
                        <th >게시물 제목</th>
                        <th >작성일자</th>
                        <th> 수정,  삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {mypost.map(a => (
                        <tr  key={a.id} onClick={() => navigate("/itemmain/detail/" + a.id, { state: a.createdTime })}>
                            <td className="first-td">
                                <div>
                                    <img style={{ width: "100px", height: "100px" }} src={'https://sharingplatformbucket.s3.ap-northeast-2.amazonaws.com/post/' + a.link}></img>
                                </div>
                                <div className="first-td-info">
                                    <div style={{ fontSize: "20px", fontWeight: "bold", marginTop: "30px" }}>{a.title}</div>
                                </div>

                            </td>
                            <td>{SetKST(a.createdTime)}</td>                            
                            <td>
                                <button onClick={(e) => {
                                    //이벤트버블링 예방 stopProgration()함수사용
                                    e.stopPropagation();
                                    navigate('/itemmain/upload-item', { state: a.id });
                                    
                                }}>수정</button>
                                <button  onClick={(e) => {
                                    //이벤트버블링 예방 stopProgration()함수사용
                                    e.stopPropagation();
                                    DeleteItem(a.id);
                                    
                                }}>삭제</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    )
}
