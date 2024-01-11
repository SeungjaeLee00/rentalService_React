
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
  ${(props) => props.$isSelected && "color:blue; "}
`;

const PagiWrapDiv = styled.div`
    margin-top:18px;
    text-align:center;
`
const PagiButton = styled.button`
background-color:white;
border:none;
&:hover{
    background-color:black;
    color:white;
}`

export default function MessagePagination({ length, pagenumbers,HandlePageNumbers }) {
    const Numbers = [];

    //현재 페이지네이션의 첫번째 숫자 ex.1, 10, 20 ...
    const [firstNum,setFirstNum] = useState(pagenumbers);
  
    for (let i = firstNum; i <=firstNum+9; i++) {
        if(i>length/10)break;
        Numbers.push(i);
    
    }
    console.log(length); //87 
    
    return (
        <PagiWrapDiv>
            <PagiButton onClick={()=>{
                if(pagenumbers>0){
                    HandlePageNumbers(pagenumbers-1);
                }
                
            }}>{"<"}</PagiButton>
            {Numbers.map((a, index) => {
                return (
                    <PagiSpan key={index} $isSelected={pagenumbers === a} onClick={() => {
                        HandlePageNumbers(a);
                    }}>{a+1}</PagiSpan>
                )
            })}
            <PagiButton onClick={()=>{
                if(pagenumbers<Math.floor(length/10)){
                    HandlePageNumbers(pagenumbers+1);
                }
            }}>{">"}</PagiButton>
        </PagiWrapDiv>
    )
}