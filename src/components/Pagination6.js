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

export default function Pagination6({length,setPageNum,pageNum}){
    //페이지네이션 숫자목록배열 ex. (1,2,3,4,5,6,7,8,9,10) , (11,12..20), ...
    const Numbers = [];
    
    //현재 페이지네이션의 숫자줄의 첫번째 숫자 ex.1, 11, 21 ... (pageNum = 현재페이지네이션 숫자)
    const [firstNum,setFirstNum] = useState(Math.floor(pageNum/10)*10);
   
    //firstNum에 값에 따른 배열값 생성 즉 ,pageNum에 의해 페이지네이션 숫자목록생성
    for (let i = firstNum; i <= firstNum+9; i++) {
        //최대생성
        if(i>length/6) break;
        Numbers.push(i);
    }
     
    return (
        <PagiWrapDiv>
            <button onClick={()=>{
                setPageNum(pageNum-1);
            }}>{"<"}</button>
            {Numbers.map((a, index) => {
                return (
                    <PagiSpan key={index} $isSelected={pageNum === a} onClick={() => {
                        
                        setPageNum(a);
                    }}>{a+1}</PagiSpan>
                )
            })}
            <button onClick={()=>{
                setPageNum(pageNum+1);
            }}>{">"}</button>
        </PagiWrapDiv>
    )
} 