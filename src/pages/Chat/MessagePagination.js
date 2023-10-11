
import { useState } from "react";
import styled from "styled-components";

export default function MessagePagination({ length, HandlePageNumbers }) {
    //페이지 선택여부 효과주기위한 state
    const [selectedPage, setSelectedPage] = useState(0);

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
  ${(props) => props.isSelected && "color:blue; border:1px solid blue;"}
`;

    const PagiWrapDiv = styled.div`
       margin-top:18px;
       text-align:center;
    `
    const Numbers = [];


    for (let i = 0; i <= length / 10; i++) {
        Numbers.push(i);
    }

    return (
        <PagiWrapDiv>
            {Numbers.map((a, index) => {
                return (
                    <PagiSpan key={index} isSelected={selectedPage === a} onClick={() => {
                        setSelectedPage(a);
                        HandlePageNumbers(a);
                    }}>{a}</PagiSpan>
                )
            })}
        </PagiWrapDiv>
    )
}