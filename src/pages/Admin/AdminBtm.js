import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import useGet from "../../hooks/useGet";
import axios from "axios";

export default function AdminBtm({ data, type }) {
    const [trade, setTrade] = useState(null);
    const [report, setReport] = useState(null);
    const [review, setReview] = useState(null);
    useEffect(() => {
        if (data) {
            console.log(type);
            if (type === "trade") setTrade(data);
            else if (type == "report") setReport(data);
            else if (type == "review") setReview(data);
        }
        return () => {
            setTrade(null);
            setReport(null);
            setReview(null);
        }
    }, [type])

    return (
        <TableDiv>
            {/* 거래인경우, 신고인경우, 리뷰인경우, 카테고리 생성 삭제 */}
            {trade ? <Trade trade={trade} /> : null}
            {report ? <Report report={report} /> : null}
            {review ? <Review review={review} /> : null}
            {type == "categorymake" ? <CategoryMake /> : null}
            {type == "categorydelete" ? <CategoryDelete /> : null}

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
                        <td>{a.postTitle}</td>
                        <td>{a.renderMember}</td>
                        <td>{a.borrowerMember}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}
function Report({ report }) {
    return (
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
function Review({ review }) {
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
function CategoryMake() {
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
    const category = useGet('/api/category');
    const [text, setText] = useState(null);
    const [parentcategory, setParentCategory] = useState(null);
    const CreateCategory = () => {
        const data = {
            name: text,
            parentCategoryName: parentcategory
        }
        console.log(data);
        if (data.name == null) {
            alert('상위 카테고리를 선택하세요');
        }
        else {
            axios.post("/api/category", data, {
                headers: {
                    'Authorization': `Bearer ${actoken}`,
                    'Auth': retoken
                }
            }).then(response => {
                console.log(response);
                if (response.status == 201) {
                    alert('생성이 완료되었습니다');
                    window.location.replace('/');
                }
            }).catch(error => {
                console.log(error);
                alert('에러가 발생했습니다');
            })

        }

    }
    console.log(category);
    if (category.error) return <div>에러발생...</div>
    if (category.loading == true) return <div>로딩중...</div>
    if (!category.data) return null;

    return (
        <>
            <Table>
                <Thead>
                    <tr>
                        <Th>상위카테고리 목록(필수)</Th>
                        <Th>생성할 카테고리이름</Th>
                    </tr>
                </Thead>
                <tbody>
                    <tr>
                        <td>
                            <select onChange={(e) => { setParentCategory(e.target.value); }}>
                                <>
                                    <option>선택</option>
                                    {category.data[1].children.map(item => (
                                        <option>{item.name}</option>
                                    ))}
                                </>
                            </select>
                        </td>
                        <td><input type="text" value={text} onChange={(e) => { setText(e.target.value) }} /></td>
                    </tr>
                </tbody>
            </Table>
            <Btn onClick={() => { CreateCategory() }}>생성</Btn>
        </>
    )
}
function CategoryDelete() {
    const actoken = localStorage.accessToken;
    const retoken = localStorage.refreshToken;
    const category = useGet('/api/category');
    const [deletename, setDeletename] = useState();
    const DeleteCategory = () => {
        console.log(deletename);
        axios.delete('/api/category/' + deletename, {
            headers: {
                'Authorization': `Bearer ${actoken}`,
                'Auth': retoken
            }
        }).then(response => {
            console.log(response);
            if (response.status == 200) {
                alert('삭제가 완료되었습니다');
                window.location.replace('/');
            }
        }).catch(error => {
            console.log(error);
        })
    }
    if (category.error) return <div>에러발생...</div>
    if (category.loading == true) return <div>로딩중...</div>
    if (!category.data) return null;
    console.log(category);
    return (
        <>
            <Table>
                <Thead>
                    <tr>
                        <Th>상위 카테고리</Th>
                    </tr>
                </Thead>
                <tbody>
                    <tr>
                        <td>
                            <select onChange={(e) => { setDeletename(e.target.value); }}>
                                {category.data[1].children.map(item => (
                                    <>
                                        <option style={{ fontWeight: "bold" }}>{item.name}</option>
                                        {item.children.map(a => (
                                            <option>{a.name}</option>
                                        ))}
                                    </>
                                ))}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Btn onClick={() => { DeleteCategory() }}>삭제</Btn>
        </>
    )
}

const TableDiv = styled.div`
margin-top:2vh;
text-align:center;
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
`

const Btn = styled.button`
    margin-top: 10px;
    height:35px;
    border-radius: 5px;
    color:black;
    background-color:white;
    transition: all 0.5s;
    &:hover{
        background-color: rgb(66, 66, 253);
    }`
