import React from "react";
import styled, { css } from "styled-components";
import useDetectClose from "../hooks/useDetectClose";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function Category() {
    const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);
    const [boardIsOpen, boardRef, boardHandler] = useDetectClose(false);
    const navigate = useNavigate();
    
    const [category, setCategory] = useState();
    useEffect(()=>{
        axios.get('/category')
         .then(response=>{
            // console.log("메인 카테고리 axios성공");
            console.log(response.data.result.data[1].children);
            setCategory(response.data.result.data[1].children);
         })
         .catch(error=>{
            console.log("카테고리 axios실패")
            console.log(error.response.data.result);
         })

    }, [])
  
    
    return (
        <Wrapper>
        <DropdownContainer>
          <DropdownButton onClick={myPageHandler} ref={myPageRef}>
            카테고리
          </DropdownButton>
          
          
          <Menu isDropped={myPageIsOpen}>
            <Ul >
            {category ? category.map(data=>(
                <Li key={"li"+data.id}> <LinkWrapper key={"w"+data.id} onClick={()=>{navigate("category/"+data.id, {state:data.name})}}>{data.name}</LinkWrapper></Li>
            )) : null}
            </Ul>
          </Menu>
        </DropdownContainer>
      </Wrapper>
    )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
  font-size: 14px;
  background: black;
  width: 120px;
  height: 40px;
  border-radius:7px;
  margin:20px 0px;
  transition: all 0.5s;
  &:hover{
    font-weight:bold;
    background-color: rgb(66, 66, 253);
  }
`;

const DropdownContainer = styled.div`
  position: relative;
  text-align: center;
  
`;

const DropdownButton = styled.div`
  cursor: pointer;
  font-size:20px;
  
  
`;

const Menu = styled.div`
  background: white;
  position: absolute;
  top: 52px;
  left: 50%;
  width: 150px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;
  
  &:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    top: -3px;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: gray;
  }

  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;

const Ul = styled.ul`
  & > li {
    margin-bottom: 5px;
  }

  & > li:first-of-type {
    margin-top: 10px;
  }

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  
`;

const Li = styled.li`
  width:200px;
  margin-top:10px;
`;

const LinkWrapper = styled.a`
  font-size: 18px;
  text-decoration: none;
  color: gray;

  &:hover{
    color:blue;
    cursor:pointer;
  }
`;

