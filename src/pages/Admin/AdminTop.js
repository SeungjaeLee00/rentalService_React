import { Link } from "react-router-dom";
import styled from "styled-components";

export default function AdminTop({trade, report, review, setData,setType}) {

    return (
        <div>
            <TopDiv>
                <Link onClick={()=>{setData(trade.data.tradeList); setType("trade")}}>
                    <Title>전체거래</Title>
                    <Cnt>{trade.data.totalElements}개</Cnt>
                </Link>
                <Link onClick={()=>{setData(report.data.reportList); setType("report")}}>
                    <Title>전체신고</Title>
                    <Cnt>{report.data.totalElements}개</Cnt>
                </Link>
                <Link onClick={()=>{setData(review.data.reviewList); setType("review")}}>
                    <Title>전체리뷰</Title>
                    <Cnt>{review.data.totalElements}개</Cnt>
                </Link>
                <div>
                    <Title>카테고리관리</Title>
                    <div style={{display:"flex", justifyContent:"space-evenly"}}>
                        <Link>생성</Link>
                        <Link>삭제</Link>
                    </div>
                </div>
            </TopDiv>
        </div>
    )
}

const TopDiv = styled.div`
display:flex;
justify-content:space-evenly;
border-bottom: 1px solid black;
padding-bottom:80px;
`
const Title = styled.h3`
font-weight:bold;`

const Cnt = styled.p`
text-align:center;
transition: all 2s;
overflow:hidden;
font-weight:bold;
font-size:25px;
color:blue;
animation:fadein 0.5s ease-in-out;
 @keyframes fadein{
    0%{
        opacity:0;
    }
    100%{
        opacity:1;
    }
 }
`