import { Link,  useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useGet from '../hooks/useGet';

export default function MyPageTop(props) {
    const navigate = useNavigate();
    const myinfo = useGet('/api/members/my-profile');

    if(myinfo.error==true) return <div>에러발생...</div>
    if(myinfo.loading==true) return <div>로딩중...</div>
    if (!myinfo.data) return null;

    return (
        <div style={{ borderBottom: "1px solid black", paddingBottom: "45px" }} className="content">
            <div className="mypagetop">
                <div className="toptitle">
                    <h1 onClick={()=>{navigate("/my-page")}}>My Page</h1>
                    {/* Link태그에 props로 내가작성한 게시물 전송 */}

                    <div className='top-smallicon'>
                        <Link to="/my-page/chats" state={{ post: props.mypost }}
                            style={{ marginRight: "5px" }}>✉</Link>
                        <Link to="/my-page/reports"
                            style={{ borderLeft: "1px solid black", paddingLeft: "5px" }}>⚒︎</Link>
                    </div>
                </div>
                <div className="topinfo">
                    <div className="infoleft">
                        <div className="name">{myinfo.nickname}</div>

                        <Link to="/my-page/edit-membership" style={{ textDecoration: "none", color: "gray", marginTop: "15px" }}>회원정보수정</Link>

                    </div>
                    <div className="inforight">
                        <div className="userpost">
                            <UserDiv>게시물</UserDiv>
                            <QuantityDiv >{props.mypost}개</QuantityDiv>
                        </div>
                        <div className="userrent">
                            <UserDiv >대여해주는 상품</UserDiv>
                            <QuantityDiv >{props.myrent}개</QuantityDiv>
                        </div>
                        <div className="userborrow">
                            <UserDiv >대여받는 상품</UserDiv>
                            <QuantityDiv >{props.myborrow}개</QuantityDiv>
                        </div>
                        <div className="userreview">
                            <UserDiv>작성한 리뷰</UserDiv>
                            <QuantityDiv>{props.mywriterw}개</QuantityDiv>
                        </div>
                        <div className="userreview">
                            <UserDiv>받은 리뷰</UserDiv>
                            <QuantityDiv>{props.myreview}개</QuantityDiv>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
let QuantityDiv = styled.p`
font-size:2vw;
color:blue;
font-weight:bold;
margin-top:25px;
margin-left:0.1vw;
transition: all 1s;
animation:fadein 0.7s ease-in-out;
 @keyframes fadein{
    0%{
        opacity:0;
    }
    100%{
        opacity:1;
    }
 }
`

let UserDiv = styled.div`
font-size:1.5vw;
font-weight:bold;
margin-left:0.1vw;
  `