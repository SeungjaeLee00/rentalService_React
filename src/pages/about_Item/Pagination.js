import React from "react";
import { useState } from "react";
import styled, { css } from "styled-components";


const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const [paginumber,setPagiNumber]=useState([true]);
  const pageNumbers = [];
  const temp=[...paginumber];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    //메인의 등록된상품 Pagination 8개까지만 보여주기(50/6 = 8)
    if(i<=8)
    {
      pageNumbers.push(i);
      temp[i]=false;
    }
  }
  
  useState(()=>{
    setPagiNumber(temp);
  },[])

  //pagination 기호 클릭할때 실행되는 함수 
  const click=(number,index)=>{
    paginate(number);
    //어떤 기호를 클릭했는지 표시(css)처리하기 위한 로직 
    let temp=[...paginumber];
    temp.map((a,index)=>{
      temp[index]=false;
    })
    setPagiNumber(temp);
    
    let copy = [...temp];
    copy[index]=!paginumber[index];
    setPagiNumber(copy);
  }
  return (
    <div>
      <nav>
        <PageUl className="pagination">
          {pageNumbers.map((number,index) => (
            <PageLi key={number} className="page-item">
              <PageSpan $active={paginumber[index]} onClick={() => click(number,index)} className="page-link">
              </PageSpan>
            </PageLi>
          ))}
        </PageUl>
      </nav>
    </div>
  );
};

export default Pagination;


const PageUl = styled.ul`
  float: left;
  list-style: none;
  transition : all 1s;
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  width: 30px;
  margin:0px 5px;
  transition : all 1s;
`;

const PageSpan = styled.span`
  border:none;
  width:16px;
  height:16px;
  box-shadow:0 3px 6px rgba(0,0,0,.30);
  border-radius:8px;
  transition: all 0.5s ease-in-out;
  ${(p)=>
        p.$active&&css`
        background:black;
        width:30px;
        `}
`;