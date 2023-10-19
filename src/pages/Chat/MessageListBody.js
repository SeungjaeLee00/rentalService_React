import { useNavigate } from "react-router-dom";
import SetKST from "../../utils/SetKST";

export default function MessageListBody({message, who})
{
    const navigate = useNavigate();
    if(!message) return null;
    console.log(message);
    
    return(
        <div className="message-content">
                <table>
                    <thead>
                        <tr >
                            <th key={2}>보낸사람</th>
                            <th key={3}>게시물제목</th>
                            <th key={4} className="th3">내용</th>
                            <th key={5}>날짜</th>
                            <th key={6}>읽음상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {message.map(a => (
                            <tr key={`tbodytr${a.id}`} onClick={() => {
                                //copy에 쪽지id랑 받은쪽지인지 보낸쪽지인지 나타내는 who가 담김.
                                let copy = [a.id, who];                                
                                //navigate로 이동할때 state로 전달 
                                navigate('/my-page/chats/message/' + a.id, { state: { copy } });
                            }}>
                                <td >{a.senderNickname}</td>
                                <td> {a.postTitle}</td>
                                <td >{a.content.length > 20 ? a.content.substr(0, 15) + "..." : a.content}</td>
                                <td >{SetKST(a.createdDate)}</td>
                                <td >{a.checked ? <div style={{ color: "gray" }}>읽음</div> : <div style={{ fontWeight: "bold" }}>읽지않음</div>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
    )
}