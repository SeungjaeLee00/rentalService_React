
import { useState } from "react";
import styled from "styled-components";


const PagiSpan = styled.span`
  width:100px;
  height:50px;
  font-size:18px;
  padding:5px;
  margin-left:10px;
  font-weight:bold;
  &:hover{
    cursor:pointer;
  }
  ${(props) => props.$isSelected && "color:blue; border:1px solid blue;"}
`;

const PagiWrapDiv = styled.div`
    margin-top:18px;
    text-align:center;
`

export default function MessagePagination({ length, HandlePageNumbers }) {
    //페이지 선택여부 효과주기위한 state
    const [selectedPage, setSelectedPage] = useState(0);
    const Numbers = [];
    
    //현재 페이지네이션의 첫번째 숫자 ex.1, 10, 20 ...
    const [firstNum,setFirstNum] = useState(0);
    //현재 페이지네이션의 마지막 숫자 
    const [lastNum,setLastNum]=useState(firstNum+10);
    let cnt = 0;
    for (let i = firstNum; i <= length / 6; i++) {
        Numbers.push(i);
        cnt++;
        if(cnt==10)
        {
            cnt=0;
            break;
        }
    }
    console.log(length); //87 
    
    return (
        <PagiWrapDiv>
            <button onClick={()=>{
                setFirstNum(lastNum-10);
            }}>{"<"}</button>
            {Numbers.map((a, index) => {
                return (
                    <PagiSpan key={index} $isSelected={selectedPage === a} onClick={() => {
                        setSelectedPage(a);
                        HandlePageNumbers(a+1);
                    }}>{a+1}</PagiSpan>
                )
            })}
            <button onClick={()=>{
                setFirstNum(lastNum);
            }}>{">"}</button>
        </PagiWrapDiv>
    )
}