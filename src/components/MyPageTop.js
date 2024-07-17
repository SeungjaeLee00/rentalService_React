import { Link,  useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useGet from '../hooks/useGet';


export default function MyPageTop(props) {
    const navigate = useNavigate();
    const myinfo = useGet('/api/members/my-profile');
    if(myinfo.error==true) return <div>에러발생...</div>
    if(myinfo.loading==true) return <div>로딩중...</div>
    if (!myinfo.data) return null;
    console.log(myinfo);
    return (
        <div className="content">
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
                {props.screen>=1000? <PcTopInfo myinfo={myinfo} mypost={props.mypost} myrent={props.myrent}
                myborrow={props.myborrow}  mywriterw={props.mywriterw}  myreview={props.myreview} />
            :<MobileTopInfo screen={props.screen} myinfo={myinfo} mypost={props.mypost} myrent={props.myrent}
            myborrow={props.myborrow}  mywriterw={props.mywriterw}  myreview={props.myreview}/>}
            </div>
        </div>
    )
}
function MobileTopInfo({screen,myinfo,mypost,myrent,myborrow,mywriterw,myreview})
{
    return(
        <div className="topinfo">
        <div className="infoleft">
            <div className="name">{myinfo.data.nickname}</div>
            <Link to="/my-page/edit-membership" state={{screen:screen}}>내정보</Link>
        </div>
        <div className="inforight">
            <div className="userpost">
                <MUserDiv to="/my-page/post">게시물</MUserDiv>
                <QuantityDiv >{mypost}개</QuantityDiv>
            </div>
            <div className="userrent">
                <MUserDiv to="/my-page/rent" >대여상품</MUserDiv>
                <QuantityDiv >{myrent}개</QuantityDiv>
            </div>
            <div className="userborrow">
                <MUserDiv to="/my-page/borrow" >빌린상품</MUserDiv>
                <QuantityDiv >{myborrow}개</QuantityDiv>
            </div>
            <div className="userreview">
                <MUserDiv to="/my-page/my-write-review">작성리뷰</MUserDiv>
                <QuantityDiv>{mywriterw}개</QuantityDiv>
            </div>
            <div className="userreview">
                <MUserDiv to="/my-page/my-review">받은리뷰</MUserDiv>
                <QuantityDiv>{myreview}개</QuantityDiv>
            </div>
        </div> 
    </div>
    )
}

function PcTopInfo({myinfo,mypost,myrent,myborrow,mywriterw,myreview}){
    return(
        <div className="topinfo">
        <div className="infoleft">
            <div className="name">{myinfo.data.nickname}</div>
            <Link to="/my-page/edit-membership">회원정보수정</Link>
            <Link to="/find-pw">비밀번호변경</Link>
        </div>
        <div className="inforight">
            <div className="userpost">
                <UserDiv>게시물</UserDiv>
                <QuantityDiv >{mypost}개</QuantityDiv>
            </div>
            <div className="userrent">
                <UserDiv >대여상품</UserDiv>
                <QuantityDiv >{myrent}개</QuantityDiv>
            </div>
            <div className="userborrow">
                <UserDiv >대여받는상품</UserDiv>
                <QuantityDiv >{myborrow}개</QuantityDiv>
            </div>
            <div className="userreview">
                <UserDiv>작성리뷰</UserDiv>
                <QuantityDiv>{mywriterw}개</QuantityDiv>
            </div>
            <div className="userreview">
                <UserDiv>받은리뷰</UserDiv>
                <QuantityDiv>{myreview}개</QuantityDiv>
            </div>
        </div> 
    </div>

    )
}
let QuantityDiv = styled.p`
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
 @media all and (max-width:1000px){
    margin:0px;
 }
`

let UserDiv = styled.div`
font-weight:bold;
margin-left:0.1vw;
  `

let MUserDiv=styled(Link)`
font-size:12px;
font-weight:bold;`
