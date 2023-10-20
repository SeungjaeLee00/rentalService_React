import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom";
import SetKST from "../../utils/SetKST";
import styled, { css } from "styled-components";
import useDetectClose from "../../hooks/useDetectClose";
import MessageListBody from "./MessageListBody";
import Pagination from "../about_Item/Pagination";
import MessagePagination from "../../components/Pagination";

export default function MessageList(props) {
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;

    //originmsg -> 보낸쪽지, 받은쪽지 클릭시 저장되는 원본 메시지리스트
    const [originmsg, setOriginMsg] = useState();
    //message -> 화면에 보여주는 메시지리스트 (배열이 삭제, 삽입됨 -> 필터(최신순, 읽지않은순) 클릭시 )
    const [message, setMessage] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

    const navigate = useNavigate();

    //받은쪽지 클릭 -> received, 보낸쪽지 -> sent 
    const [who, setWho] = useState("received");

    //받은쪽지 ,보낸쪽지 클릭 표시하기위한 state
    const [isActive1, setIsActive1] = useState(true);
    const [isActive2, setIsActive2] = useState(false);


    //필터 : 최신순,오래된순 클릭시 state, 오래된순 true, 최신순 =false 
    const [sortcheck, setSortCheck] = useState(false);
    //읽지않은쪽지 클릭시 true. 
    const [readcheck, setReadCheck] = useState(false);

    const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);

    //FetchMessage의 get에 같이 보내는 메시지페이지네이션 변수. 0,1,2..의 값을 가진다
    const [pagenumbers, setPageNumbers] = useState(0);
    //메시지의 총개수.
    const [messagelength, setMessageLength] = useState('');

    //pagenumbers state 변경함수. 아래 페이지네이션 번호 클릭할때 해당 번호의 값이 들어온다. 
    const HandlePageNumbers = (x)=>{
        console.log(x);
        if(x==0||x==1) x=0;
        setPageNumbers(x);
    }
    //페이지네이션에 해당하는 메시지들을 불러오는 함수 ex) 0~9, 10~19 
    const FetchMessage = async () => {
        try {
            setLoading(true);
            //쪽지는 페이지네이션이 0부터시작. 따라서 -1. 
            const response = await axios.get(`/api/messages/${who}?page=${pagenumbers}`, {
                headers: {
                    'Authorization': `Bearer ${actoken}`,
                    'Auth': retoken
                }
            })
            setMessageLength(response.data.totalElements);
            setMessage(response.data.messageList);
            setOriginMsg(response.data.messageList);
            console.log(response.data);
        }
        catch (e) {
            console.log(e);
            setError(e);
        }

    }

    useEffect(() => {
        //처음 메시지 받아올때(받은메시지)
        FetchMessage();
    }, [pagenumbers])


    //받은쪽지 클릭 실행되는 함수 
    const receiveHandle = async () => {
        setWho("received");
        setIsActive1(true);
        setIsActive2(false);
        try {
            setError(null);
            setMessage(null);
            setLoading(true);
            const response = await axios.get('/api/messages/received', {
                headers: {
                    'Authorization': `Bearer ${actoken}`,
                    'Auth': retoken
                }
            })
            console.log("메시지조회성공");
            setMessageLength(response.data.totalElements);
            setMessage(response.data.messageList);
            setOriginMsg(response.data.messageList);
        } catch (e) {
            setError(e);
            console.log(e);

        }
        setLoading(false);
    }
    //보낸쪽지 클릭 실행되는 함수 
    const sendHandle = async () => {
        setWho("sent");
        setIsActive1(false);
        setIsActive2(true);
        try {
            setError(null);
            setMessage(null);
            setLoading(true);
            const response = await axios.get(`/api/messages/sent?page=${pagenumbers}`, {
                headers: {
                    'Authorization': `Bearer ${actoken}`,
                    'Auth': retoken
                }
            })
            setMessageLength(response.data.totalElements);
            setMessage(response.data.messageList);
            setOriginMsg(response.data.messageList);
            console.log(response.data.messageList);
        } catch (e) {
            setError(e);
            console.log(e);
        }
        setLoading(false);
    }

    //읽은쪽지 삭제함수
    function readMsgDelete() {
        message.map(a => {
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
                        console.log(error);
                    })
            }
        })
    }

    //필터함수. 최신순, 오래된순 클릭시 실행되는 함수 
    function SortTime() {
        //필터에서 읽은쪽지 클릭한경우 message을 origin으로 초기화.
        if (readcheck == true) {
            let temp = [...originmsg];
            temp.reverse();
            console.log(temp);
            setMessage(temp);
            setReadCheck(!readcheck);
        }
        else {
            let temp = [...message];
            temp.reverse();
            console.log(temp);
            setMessage(temp);

        }

    }
    //필터(읽지않은쪽지) 클릭시 실행되는 함수
    function NoRead() {
        const NoReadMsg = [];
        message.map(a => {
            if (a.checked == false) {
                NoReadMsg.push(a);
            }
        })
        console.log(NoReadMsg);
        setMessage(NoReadMsg);
    }

    if (loading) <div>메시지로딩중...</div>
    if (error) <div>메시지에러...</div>
    if (!message) return null;

    return (
        <div>
            <div className="message-nav">
                <button className={isActive1 ? "receivebtn" : "inactiveBtn"}
                    onClick={() => { receiveHandle() }}>받은쪽지 </button>
                <button className={isActive2 ? null : "inactiveBtn"}
                    onClick={() => { sendHandle() }}>보낸쪽지</button>
            </div>
            <div className="message-mid">
                <button onClick={readMsgDelete}>읽은쪽지 삭제</button>
                <div className="message-dropbox">
                    <Wrapper>
                        <DropdownContainer>
                            <DropdownButton onClick={myPageHandler} ref={myPageRef}>
                                필터
                            </DropdownButton>
                            <Menu isDropped={myPageIsOpen}>
                                <Ul >
                                    <Li>
                                        <LinkWrapper onClick={() => { setMessage(originmsg);}}>전체</LinkWrapper>
                                    </Li>
                                    <Li>
                                        {sortcheck == true ? <LinkWrapper onClick={() => { SortTime(); setSortCheck(!sortcheck)}}>오래된순</LinkWrapper> :
                                            <LinkWrapper onClick={() => {SortTime(); setSortCheck(!sortcheck);}}>최신순</LinkWrapper>}
                                    </Li>
                                    <Li>
                                        <LinkWrapper onClick={() => { setReadCheck(true); NoRead(); }}>읽지않은쪽지</LinkWrapper>
                                    </Li>
                                </Ul>
                            </Menu>
                        </DropdownContainer>
                    </Wrapper>
                </div>
            </div>
            {/* 메시지 내용 */}
            {message ? < MessageListBody message={message} who={who}/> : null}
            {/* 하단 페이지네이션 */}
            <MessagePagination  length={messagelength}  HandlePageNumbers={HandlePageNumbers}/>
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
  font-weight:bold;
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