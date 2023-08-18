import React from "react";
import ExImg from "../../assets/img/상품예시.jpg"
import { red } from "@mui/material/colors";

const Posts = (props) => {
  return (
    props.TempData.slice(0, props.ItemIndex).map((a, i) => {
      return (
        <div className="Item" onClick={() => {
          this.props.navigate('/itemmain/detail');
        }}>
          <div className='Item-Img'>
            <img src={ExImg} style={{ width: 200, height: 200 }} />
          </div>
          <div className='Item-Information-Wrap'>
            <div className='Item-Name-Price-Date-Wrap'>
              <div style={{color:"red"}}>상품번호 : {props.TempData[i].Id} </div>
              <div className='Item-Name'>{props.TempData[i].title}</div>
              <div className='Item-Price'>가격 : {props.TempData[i].price}</div>
              <div className='Item-Date'>{props.TempData[i].date}</div>
            </div>
            <div className='Item-State'>
              {props.TempData[i].state}
            </div>
          </div>
        </div>
      )
    })
  );
};
export default Posts;