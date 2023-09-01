import React, { useState } from "react";
import Gadigun from "../../assets/img/가디건1.jpg";
import NikeAir from "../../assets/img/에어포스1.jpg";
import LeeCap from "../../assets/img/lee볼캡모자1.jpg";
import { useNavigate } from "react-router";

import { useSelector } from 'react-redux';


const Posts = (props) => {

  let a = useSelector((state)=>{return state});
  let a_img = [Gadigun, NikeAir, LeeCap]

  const navigate = useNavigate();
  const items = a.item.filter((data)=>{
    if(props.search==null) return data;
    else if(data.title.toLowerCase().includes(props.search.toLowerCase()) || data.title.toLowerCase().includes(props.search.toLowerCase())){
      return data
  }
})
console.log(items);
  return ( a.item.slice(0, props.ItemIndex).map((a, i) => {
     
      return (  <div className="Item" onClick={() => {
          navigate('/itemmain/detail/'+i);
        }}>

          <div className='Item-Img'>
            <img src={a_img[i]} style={{ width: 200, height: 200 }} />
          </div>
          <div className='Item-Information-Wrap'>
            <div className='Item-Name-Price-Date-Wrap'>
              <div style={{color:"red"}}>상품번호 : {a.id} </div>
              <div className='Item-Name'>{a.title}</div>
              <div className='Item-Price'>가격 : {a.price}</div>
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