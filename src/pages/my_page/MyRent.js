import { useState } from "react";
import { useOutletContext } from "react-router-dom"
import RentModal from "./RentModal";

export default function MyRent() {
    const { mypost, setMyPost } = useOutletContext();
    const { myrent, setMyRent } = useOutletContext();
    console.log(myrent);
    
    const [rentmodalopen,setRentModalOpen]= useState(false);
    const [tradeid, setTradeId]= useState();
    const [tradetitle,setTradeTitle]=useState();
    return (
        <div className="MyRent-wrap">
            <div className="rent-top">
                <p style={{ padding: "30px", fontSize: "25px", fontWeight: "bold" }}>대여해주는 상품조회</p>
                {rentmodalopen&&<RentModal tradeid={tradeid} tradetitle={tradetitle} closeModal={()=>setRentModalOpen(!rentmodalopen)}/>}
            </div>
            {/* 대여상품생성 컴포넌트 */}
            {myrent&&mypost? <> <div className="rent-bottom">
                <table>
                    <thead>
                        <tr>
                            <th>게시글 제목</th>
                            <th>대여받는사람</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myrent.tradeList.map(a => (
                            <tr onClick={()=>{
                            setRentModalOpen(!rentmodalopen);
                            setTradeId(a.tradeId);
                            setTradeTitle(a.postTitle);
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

