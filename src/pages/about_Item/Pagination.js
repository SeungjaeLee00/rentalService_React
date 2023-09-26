import React from "react";
import styled from "styled-components";

const PageUl = styled.ul`
  float: left;
  list-style: none;
  border-radius: 3px;
  color: white;
  border-top: 3px solid #186ead;
  border-bottom: 3px solid #186ead;
  background-color: white;
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  border-radius: 5px;
  width: 30px;
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #263a6c;
  }
  &:focus::after {
    color: white;
    background-color: #263a6c;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }
  &:hover{
    background-color: rgb(66, 66, 253);
    color:white;
    font-weight:bold;
  }
`;

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <nav>
        <PageUl className="pagination">
          {pageNumbers.map((number) => (
            <PageLi key={number} className="page-item">
              <PageSpan onClick={() => paginate(number)} className="page-link">
                {number}
              </PageSpan>
            </PageLi>
          ))}
        </PageUl>
      </nav>
    </div>
  );
};

export default Pagination;