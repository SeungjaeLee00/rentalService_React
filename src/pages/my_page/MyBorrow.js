import { useState } from "react";
import { useOutletContext } from "react-router-dom"
import RentModal from "./RentModal";


export default function MyBorrow()
{
    const {myborrow, setMyBorrow}=useOutletContext();
    console.log(myborrow);
    const {mypost, setMyPost}=useOutletContext();
    console.log(myborrow);
    
    const [rentmodalopen,setRentModalOpen]= useState(false);
    const [tradeid, setTradeId]= useState();
    const [tradetitle,setTradeTitle]=useState();
    const [postid, setPostId]=useState();
    return(
        <div className="MyRent-wrap">
            <div className="rent-top">
                <p style={{ padding: "30px", fontSize: "25px", fontWeight: "bold" }}>대여받는 상품조회</p>
                {rentmodalopen&&<RentModal tradeid={tradeid} tradetitle={tradetitle} postid={postid} closeModal={()=>setRentModalOpen(!rentmodalopen)}/>}
            </div>
            {/* 대여상품생성 컴포넌트 */}
            {myborrow&&mypost? <> <div className="rent-bottom">
                <table>
                    <thead>
                        <tr>
                            <th>게시글 제목</th>
                            <th>대여받는사람</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myborrow.data.tradeList.map(a => (
                            <tr key={a.tradeId} onClick={()=>{
                            setRentModalOpen(!rentmodalopen);
                            setTradeId(a.tradeId);
                            setTradeTitle(a.postTitle);
                            setPostId(a.postId);
                        }}>
                                <td>{a.postTitle}</td>
                                <td>{a.borrowerMember}</td>
                            </tr>
                            
                        ))}
                    </tbody>
                </table>
            </div></> : null}

        </div>
    )
}