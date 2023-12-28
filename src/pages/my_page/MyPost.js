  import axios from "axios";
import { Navigate, useNavigate, useOutletContext } from "react-router-dom";
import SetKST from "../../utils/SetKST";
import MessagePagination from "../../components/Pagination";
import { useState } from "react";

export default function MyPost() {
    const { mypost, setMyPost } = useOutletContext();
    const {screen, setSize} =useOutletContext();
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
    const [currentPage,setCurrentPage] = useState(1);
    const postsPerPage = 10;
    const ItemIndex = 10;
    const indexOfLast = currentPage * postsPerPage; 
    const indexOfFirst = indexOfLast - postsPerPage;    

    //pagenumbers state 변경함수. 아래 페이지네이션 번호 클릭할때 해당 번호의 값이 들어온다. 
    const HandlePageNumbers = (x)=>{
        setCurrentPage(x);
    }

    const currentPosts=()=>{
        let currentPosts = 0;
        currentPosts=mypost.data.postList.slice(indexOfFirst,indexOfLast);
        return currentPosts;
    }

    return (
        <div className="MyPost-wrap">
             <div className="post-top">
                <p>게시물내역 조회</p>
            </div>
            {/* 게시물 컴포넌트 */}
            {mypost? <ItemTable screen={screen} mypost={currentPosts()}  navigate={navigate} DeleteItem={DeleteItem} /> : null}
            
            
            <MessagePagination length={mypost.length} HandlePageNumbers={HandlePageNumbers}/>
        </div>
    )
}

function ItemTable({ screen, mypost, navigate, DeleteItem }) {
    console.log(mypost);
    return (
        <div className="post-bottom">
            <table>
                <thead>
                    <tr>
                        <th >게시물 제목</th>
                        <th >작성일자</th>
                        {screen>=750? <th> 수정,  삭제</th>: null}
                        
                    </tr>
                </thead>
                <tbody>
                    {mypost.map(a => (
                        <tr  key={a.id} onClick={() => navigate("/itemmain/detail/" + a.id, { state: a.createdTime })}>
                            <td className="first-td">
                                <span>
                                    {screen>=750?<img style={{ width: "100px", height: "100px" }} src={'https://sharingplatformbucket.s3.ap-northeast-2.amazonaws.com/post/' + a.link}></img>
                                    :null}
                                </span>
                                <span className="first-td-info">
                                    <p>{a.title}</p>
                                </span>

                            </td>
                            <td className="second-td">{SetKST(a.createdTime)}</td>          
                            {screen>=750?<td>
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
                            </td> :null}                  
                            
                        </tr>
                    ))}

                </tbody>
            </table>

        </div>
    )
}
