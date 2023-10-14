import React from "react";
import { useState } from "react";
import styled, { css } from "styled-components";

const PageUl = styled.ul`
  float: left;
  list-style: none;
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  width: 30px;
  margin:0px 5px;
  // &:hover {
  //   cursor: pointer;
  //   color: white;
  //   background-color: #263a6c;
  // }
  // &:focus::after {
  //   color: white;
  //   background-color: #263a6c;
  // }
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

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const [paginumber,setPagiNumber]=useState([true]);
  const pageNumbers = [];
  const temp=[...paginumber];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
    temp[i]=false;
  }
  
  useState(()=>{
    setPagiNumber(temp);
  },[])

  //pagination 기호 클릭할때 실행되는 함수 
  const click=(number,index)=>{
    console.log(pageNumbers);
    console.log(number);
    console.log(index);
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