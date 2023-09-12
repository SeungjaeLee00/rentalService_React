import React, { useState } from "react";
import Gadigun from "../../assets/img/Gadigun1.jpg";
import NikeAir from "../../assets/img/에어포스1.jpg";
import LeeCap from "../../assets/img/lee볼캡모자1.jpg";
import AirClear from "../../assets/img/공기청정기.jpg";
import StarBux from "../../assets/img/스타벅스.jpg";
import Pencil from "../../assets/img/만년필.jpg";

import { useNavigate } from "react-router";


const Posts = (props) => {

  let a_img = [Gadigun, NikeAir, LeeCap, AirClear, StarBux, Pencil];
  const navigate = useNavigate();

  const items = props.currentPosts;
  /*
  const items = props.currentPosts.filter((data) => {
    if (props.search == null) return data;
    else if (data.title.toLowerCase().includes(props.search.toLowerCase())) {
      return data
    }
  })*/
  const imgheadurl="https://sharingplatformbucket.s3.ap-northeast-2.amazonaws.com/post";
  return (
    
    items?  items.slice(0, props.ItemIndex).map(a => (
      <div className="Item" key={a.id} onClick={() => {
        navigate('/itemmain/detail/' + a.id, { state: a });
      }}>
        <div className='Item-Img'>
          <img src={"https://sharingplatformbucket.s3.ap-northeast-2.amazonaws.com/post/logo.png"} style={{ width: 200, height: 200 }} />
        </div>
        <div className='Item-Information-Wrap'>
          <div className='Item-Name-Price-Date-Wrap'>
            <div className='Item-Name'>{a.title}</div>
            <div className='Item-Price'>{a.nickname}</div>
            <div className='Item-Date'>{a.createdTime}</div>
          </div>
          <div className='Item-State'>
            {a.state}
          </div>
        </div>
      </div>

    )) : <div>로딩중</div>


  );
};
export default Posts;