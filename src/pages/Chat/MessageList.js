import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import SetKST from "../../utils/SetKST";
import styled, { css } from "styled-components";
import useDetectClose from "../../hooks/useDetectClose";

export default function MessageList(props) {
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;

    const [message, setMessage] = useState();
    const [loading, setLoading]=useState();
    const [error, setError] = useState();
    const [msgid, setMsgId] = useState();
    const navigate = useNavigate();
    const [who, setWho] = useState("received");
    const [isActive1, setIsActive1] = useState(true);
    const [isActive2, setIsActive2] = useState(false);
    const [filter, setFilter] = useState(false);
    const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);

    const FetchMessage = async () =>{
        try {
            setLoading(true);
            const response = await axios.get('/messages/received', {
                headers: {
                    'Authorization': `Bearer ${actoken}`,
                    'Auth': retoken
                }
            })
            console.log("received메시지조회성공");
            setMessage(response.data.result.data.messageList);
            console.log(response.data.result.data);
        }
        catch (e) {
            console.log(e);
            setError(e);
        }

    }

    useEffect(() => {
        console.log(props.mypost);
        FetchMessage();
    }, [])


    //받은쪽지 클릭 실행되는 함수 
    function receiveHandle() {
        setWho("received");
        setIsActive1(true);
        setIsActive2(false);
        axios.get("/messages/received", {

            headers: {
                'Authorization': `Bearer ${actoken}`,
                'Auth': retoken
            }
        })
            .then(response => {
                console.log("메시지조회성공");
                setMessage(response.data.result.data.messageList);
                console.log(response.data.result.data);
            })
            .catch(error => {
                console.log(error.response.data.result);
            })
    }
    //보낸쪽지 클릭 실행되는 함수 
    function sendHandle() {
        setWho("sent");
        setIsActive1(false);
        setIsActive2(true);
        axios.get("/messages/sent", {

            headers: {
                'Authorization': `Bearer ${actoken}`,
                'Auth': retoken
            }
        })
            .then(response => {
                console.log("메시지조회성공");
                setMessage(response.data.result.data);
                console.log(response.data.result.data);
            })
            .catch(error => {
                console.log(error.response.data.result);
            })

    }

    //읽은쪽지 삭제함수
    function readMsgDelete() {
        message.messageList.map(a => {
            if (a.checked) {
                axios.delete(`/messages/${a.id}/${who}`, {
                    headers: {
                        'Authorization': `Bearer ${actoken}`,
                        'Auth': retoken
                    }
                })
                    .then(response => {
                        console.log("메시지삭제성공");
                        receiveHandle();
                    })
                    .catch(error => {
                        console.log(error.response.data.result);
                    })
            }
        })
    }
    function SortTime()
    {
        let temp = [...message];
        console.log(temp);
        temp.reverse();
        console.log(temp);
        setMessage(temp);
    }

    if(loading) <div>메시지로딩중...</div>
    if(error) <div>메시지에러...</div>
    if(!message) return null;

    return (
        <div>
            <div className="message-nav">
                <button className={isActive1 ? "receivebtn" : "inactiveBtn"}
                    onClick={receiveHandle}>받은쪽지</button>
                <button className={isActive2 ? null : "inactiveBtn"}
                    onClick={sendHandle}>보낸쪽지</button>
            </div>
            <div className="message-mid">
                <button onClick={readMsgDelete}>읽은 쪽지 삭제</button>
                <div className="message-dropbox">
                    <Wrapper>
                        <DropdownContainer>
                            <DropdownButton onClick={myPageHandler} ref={myPageRef}>
                                전체
                            </DropdownButton>
                            <Menu isDropped={myPageIsOpen}>
                                <Ul >
                                    <Li>
                                        <LinkWrapper onClick={()=>{SortTime()}}>최신순</LinkWrapper>
                                    </Li>
                                    <Li>
                                        <LinkWrapper>읽지않은순</LinkWrapper>
                                    </Li>
                                </Ul>
                            </Menu>
                        </DropdownContainer>
                    </Wrapper>
                </div>
            </div>
            <div className="message-content">
                <table>
                    <thead>
                        <tr key={`theadtr${msgid}`}>

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
                                console.log(copy);
                                //navigate로 이동할때 state로 전달 
                                navigate('/my-page/chats/message/' + a.id, { state: { copy } });
                            }}>
                                <td >{a.senderNickname}</td>
                                <td> {a.postTitle}</td>
                                <td >{a.content.length > 20 ? a.content.substr(0, 15) + "..." : a.content}</td>
                                <td >{SetKST(a.createdDate)}</td>
                                <td >{a.checked ? <div>읽음</div> : <div>읽지않음</div>}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div style={{ marginTop: "20px" }} className="message-bottom">

                </div>
            </div>
        </div>
    )
}




const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: black;
  border:1px solid gray;
  font-size: 14px;
  background: white;
  width: 100px;
  height: 28px;
  border-radius:7px;
  margin-top:20px;
  margin-left:790px;
  transition: all 0.5s;
`;

const DropdownContainer = styled.div`
  position: relative;
  text-align: center;
  
`;

const DropdownButton = styled.div`
  cursor: pointer;
  font-size:15px;
`;

const Menu = styled.div`
  background: white;
  position: absolute;
  top: 52px;
  left: 50%;
  width: 100px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;
  
  &:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: gray;
  }

  ${({ isDropped }) =>
        isDropped &&
        css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;

const Ul = styled.ul`
  & > li {
    margin-bottom: 5px;
  }

  & > li:first-of-type {
    margin-top: 10px;
  }

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
`;

const Li = styled.li`
  width:150px;
`;

const LinkWrapper = styled.a`
  font-size: 15px;
  text-decoration: none;
  color: gray;

  &:hover{
    font-weight:bold;
    color:blue;
    cursor:pointer;
  }
`;