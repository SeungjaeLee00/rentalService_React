import React, { useState } from "react";
import Gadigun from "../../assets/img/Gadigun1.jpg";
import NikeAir from "../../assets/img/에어포스1.jpg";
import LeeCap from "../../assets/img/lee볼캡모자1.jpg";
import AirClear from "../../assets/img/공기청정기.jpg";
import StarBux from "../../assets/img/스타벅스.jpg";
import Pencil from "../../assets/img/만년필.jpg";

import { useNavigate } from "react-router";
import { useSelector } from 'react-redux';


const Posts = (props) => {
  
  let a_img = [Gadigun, NikeAir, LeeCap, AirClear, StarBux, Pencil];
  const navigate = useNavigate();
   
  const items = props.currentPosts;
  
  //items라는 곳에 store.js에 저장된 데이터 저장
  /*
  const items = props.currentPosts.filter((data) => {
    if (props.search == null) return data;
    else if (data.title.toLowerCase().includes(props.search.toLowerCase())) {
      return data
    }
  })*/

  return (
    items.slice(0, props.ItemIndex).map((a, i) => {
          
      return (
      
        <div className="Item" key={a.id} onClick={() => {
          navigate('/itemmain/detail/' + a.id);
        }}>

          <div className='Item-Img'>
            <img src={a_img[a.id]} style={{ width: 200, height: 200 }} />
          </div>
          <div className='Item-Information-Wrap'>
            <div className='Item-Name-Price-Date-Wrap'>
              <div style={{ color: "red" }}>상품번호 : {a.id} </div>
              <div className='Item-Name'>{a.title}</div>
              <div className='Item-Price'>{a.price}</div>
              <div className='Item-Date'>{a.date}</div>
            </div>
            <div className='Item-State'>
              {a.state}
            </div>
          </div>
        </div>
      )
    })

  );
};
export default Posts;