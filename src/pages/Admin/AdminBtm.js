import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

export default function AdminBtm({ data,type }) {
    const [trade, setTrade] = useState();
    const [report, setReport] = useState();
    const [review, setReview] = useState();
    useEffect(() => {
        if (data) {
            console.log(type);
            if (type === "trade")
            {
                setTrade(data);
                setReport(null);
                setReview(null);
            }
            else if (type == "report")
            {
                setReport(data);
                setTrade(null);
                setReview(null);
            }
            else if (type == "review")
            {
                setReview(data);
                setTrade(null);
                setReport(null);
            }
        }
    }, [data])
    console.log(data);

    return (
        <TableDiv>
            {/* 거래인경우, 신고인경우, 리뷰인경우, 카테고리 생성 삭제 */}
            {trade?<Trade trade={trade} /> : null}
            {report? <Report report={report}/>: null}
            {review?<Review review={review}/> : null}
        </TableDiv>
    )
}

function Trade({ trade }) {
    console.log(trade);
    return (
        <Table>
            <Thead>
                <tr>
                    <Th>거래 제목</Th>
                    <th>빌리는 사람</th>
                    <th>빌려주는 사람</th>
                </tr>
            </Thead>
            <tbody>
                {trade.map(a => (
                    <tr>
                        <Td>{a.postTitle}</Td>
                        <td>{a.renderMember}</td>
                        <td>{a.borrowerMember}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

function Report({report}){
   return(
    <Table>
            <Thead>
                <tr>
                    <Th>신고 종류</Th>
                    <th>신고 내용</th>
                    <th>신고자</th>
                    <th>신고받는사람</th>
                </tr>
            </Thead>
            <tbody>
                {report.map(a => (
                    <tr>
                        <td>{a.reportType}</td>
                        <td>{a.content}</td>
                        <td>{a.reporter_nickname}</td>
                        <td>{a.reported_nickname}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
   )
}

function Review({review}){
    return (
        <Table>
            <Thead>
                <tr>
                    <Th>작성자</Th>
                    <th>대여자</th>
                    <th>리뷰내용</th>
                </tr>
            </Thead>
            <tbody>
                {review.map(a => (
                    <tr>
                        <td>{a.writer}</td>
                        <td>{a.receiver}</td>
                        <td>{a.content}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

const TableDiv= styled.div`
margin-top:2vh;
`

const Table = styled.table`
margin-left:auto;
margin-right:auto;
width:1000px;
text-align:center;
`
const Thead = styled.thead`
border-bottom:1px solid black;
font-weight:bold;
font-size:25px;
background-color:rgb(248, 248, 248);

`
const Th = styled.th`
padding:20px 0px;
t
`
const Td= styled.td`
`